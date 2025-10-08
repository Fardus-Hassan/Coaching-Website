"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryVideo {
  id: number;
  thumbnail: string;
  src: string;
  category: string;
}

// Removed TabType as tabs are removed

export default function Video() {
  // Removed activeTab state
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Removed tabs array

  const galleryVideos: GalleryVideo[] = [
    {
      id: 1,
      thumbnail: "https://uccgroup.com.bd/uploads/video/Sajit%20Mia.jpg",
      src: "https://videos.examplecdn.com/media/v1-students.mp4",
      category: "Students",
    },
    {
      id: 2,
      thumbnail: "https://uccgroup.com.bd/uploads/video/Nobha.png",
      src: "https://videos.examplecdn.com/media/v2-campus.mp4",
      category: "Campus",
    },
    {
      id: 3,
      thumbnail: "https://uccgroup.com.bd/uploads/video/Tithi.png",
      src: "https://videos.examplecdn.com/media/v3-students.mp4",
      category: "Students",
    },
  ];

  // The filteredVideos logic is now just the full galleryVideos array
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

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Removed Filter Tabs section */}

        {/* Video Grid */}
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
                  alt={`Video ${video.id}`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">
                    {video.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Video Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg">
              <p className="font-semibold">{selectedVideo.category}</p>
              <p className="text-sm text-gray-300">
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