"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetCoachingHistoriesQuery } from "@/redux/features/api/about/coachingHistoryApi";

export default function About() {
  const { data = [], isLoading, error } = useGetCoachingHistoriesQuery();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const coachingHistory = data[0] || {
    heading: "",
    description: "",
    img: "",
    video_link: "",
    tag: "",
  };

  const openModal = (videoLink: string) => {
    setSelectedVideo(videoLink);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };


  const truncateDescription = (text : string) => {
  if (!text) return "কোনো বিবরণ পাওয়া যায়নি।";
  if (text.length > 450) {
    return text.substring(0, 450) + '.....';
  }
  return text;
};

if (data.length === 0) {
  return null;
}
  

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Skeleton for Image/Video Section */}
            <div className="relative">
              <Skeleton
                height={320}
                className="w-full lg:h-96 rounded-xl"
                baseColor="#e0e7ff"
                highlightColor="#f3f4f6"
              />
            </div>
            {/* Skeleton for Text Section */}
            <div className="space-y-6 lg:space-y-8">
              <Skeleton height={40} width="80%" className="mb-4" />
              <Skeleton height={8} width={80} className="mb-4" />
              <Skeleton count={5} height={16} />
              <Skeleton height={40} width={120} className="mt-4" />
            </div>
          </div>
        ) : error ? (
          null
        ) : !coachingHistory.heading && !coachingHistory.description ? (
          null
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image/Video Section */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl">
                {coachingHistory.video_link ? (
                  <div
                    className="relative w-full h-80 lg:h-96 cursor-pointer"
                    onClick={() => openModal(coachingHistory.video_link)}
                  >
                    <iframe
                      src={coachingHistory.video_link
                        .replace("youtu.be/", "www.youtube.com/embed/")
                        .split("?")[0]}
                      className="w-full h-full object-cover"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="About Video"
                    ></iframe>
                    <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                      <svg
                        className="w-16 h-16 text-white drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={coachingHistory.img || "https://via.placeholder.com/600x400"}
                    alt="প্রতিষ্ঠানের সম্পর্কে"
                    width={600}
                    height={400}
                    className="w-full h-80 lg:h-96 object-cover rounded-xl"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    unoptimized 
                  />
                )}
              </div>
              {/* Decorative badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform rotate-3">
                {coachingHistory.tag || "৪০+ বছরের ঐতিহ্য"}
              </div>
            </div>

            {/* Text Section */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                  {coachingHistory.heading || "আমাদের সম্পর্কে"}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
              </div>
              <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
                <p className="text-base lg:text-lg">
                   {truncateDescription(coachingHistory.description)}
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  আরও পড়ুন
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
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

          {/* Video Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedVideo.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]}
              className="max-w-full max-h-full w-full aspect-video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="About Video"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}