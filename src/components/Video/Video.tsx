"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetVideoGalleriesQuery } from "@/redux/features/api/video/videoGalleryApi";

interface GalleryVideo {
  id: number;
  thumbnail: string;
  src: string;
  category: string;
  heading: string;
  sub_heading: string;
}

export default function Video() {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data = [], isLoading, error } = useGetVideoGalleriesQuery();

  // Map API data to GalleryVideo format
  const galleryVideos: GalleryVideo[] = data
    .filter((item) => item.status === "ACTIVE")
    .map((item) => ({
      id: item.id,
      thumbnail: item.img,
      src: item.link,
      category: item.heading,
      heading: item.heading,
      sub_heading: item.sub_heading,
    }));

  const filteredVideos = galleryVideos;

  const openModal = (video: GalleryVideo, index: number) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    const newIndex = (currentIndex + 1) % filteredVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(filteredVideos[newIndex]);
  };

  const prevVideo = () => {
    const newIndex =
      (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(filteredVideos[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextVideo();
    if (e.key === "ArrowLeft") prevVideo();
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            ভিডিও <span className="text-indigo-600">গ্যালারি</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md"
              >
                <Skeleton height="100%" className="aspect-[4/3]" />
              </div>
            ))}
          </div>
        ) : error ? (
          null
        ) : filteredVideos.length === 0 ? (
          null
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => openModal(video, index)}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-200 relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.heading}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300">
                    <svg
                      className="w-16 h-16 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Overlay with heading and sub_heading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="transform translate-y-0 transition-transform duration-300 text-center">
                    <p className="text-white font-semibold">{video.heading}</p>
                    <p className="text-white text-sm mt-1 line-clamp-2">{video.sub_heading}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Lightbox */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevVideo();
            }}
            className="absolute left-4 cursor-pointer text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Video Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <iframe
                src={selectedVideo.src.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]}
                className="max-w-full max-h-full w-full aspect-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.heading}
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg text-center">
              <p className="font-semibold">{selectedVideo.heading}</p>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{selectedVideo.sub_heading}</p>
              <p className="text-sm text-gray-300 mt-1">
                {currentIndex + 1} / {filteredVideos.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextVideo();
            }}
            className="absolute right-4 cursor-pointer text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}