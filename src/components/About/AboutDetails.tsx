"use client";

import { useState } from "react";
import { useGetCoachingHistoriesQuery } from "@/redux/features/api/about/coachingHistoryApi";
import { useGetSpecialQualitiesQuery } from "@/redux/features/api/about/specialQualitiesApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function AboutDetails() {
  const { data: historyData = [], isLoading: isHistoryLoading, error: historyError } = useGetCoachingHistoriesQuery();
  const { data: qualitiesData = [], isLoading: isQualitiesLoading, error: qualitiesError } = useGetSpecialQualitiesQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  // Assume one history item
  const coachingHistory = historyData[0] || {
    heading: "",
    description: "",
    img: "",
    video_link: "",
    tag: "",
  };

  const description = coachingHistory.description || "";
  const characterLimit = 700;
  const isLong = description.length > characterLimit;
  const displayText = isExpanded ? description : description.slice(0, characterLimit);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main>
        {/* About Section */}
        <section className="pt-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]">
            প্রতিষ্ঠানের <span className="text-[var(--color-primary)]">সম্পর্কে</span>
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-2"></div>
          </h2>

          <div className="max-w-6xl mx-auto">
            {isHistoryLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Skeleton for image */}
                <div>
                  <Skeleton height={400} className="rounded-xl" />
                </div>
                {/* Skeleton for text */}
                <div className="space-y-4">
                  <Skeleton count={5} height={20} />
                  <Skeleton count={3} height={20} />
                </div>
              </div>
            ) : historyError ? (
              null
            ) : !coachingHistory.description ? (
              null
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image Section */}
                {coachingHistory.img && (
                  <div className="order-2 lg:order-1">
                    <Image
                      src={coachingHistory.img}
                      alt="প্রতিষ্ঠানের ছবি"
                      width={600}
                      height={400}
                      className="w-full rounded-xl shadow-lg object-cover h-auto"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    />
                  </div>
                )}

                {/* Text Section */}
                <div className="order-1 lg:order-2">
                  <div className="text-justify text-base md:text-lg text-gray-700 leading-relaxed">
                    {displayText}
                    {isLong && !isExpanded && "..."}
                  </div>

                  {/* See More / See Less Button */}
                  {isLong && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary)]/90 transition-all duration-300 group"
                    >
                      <span>{isExpanded ? "দেখান কম" : "দেখান আরও"}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Special Qualities Section */}
        <section className="py-20 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]">
            প্রতিষ্ঠানের <span className="text-[var(--color-primary)]">বৈশিষ্ট্য</span> সমূহ
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-2"></div>
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {isQualitiesLoading ? (
              <>
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <Skeleton width={20} height={20} className="mt-1" />
                      <Skeleton width="80%" height={20} />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <Skeleton width={20} height={20} className="mt-1" />
                      <Skeleton width="80%" height={20} />
                    </div>
                  ))}
                </div>
              </>
            ) : qualitiesError ? (
              null
            ) : qualitiesData.length === 0 ? (
              null
            ) : (
              <>
                {/* Left Column */}
                <div className="space-y-4">
                  {qualitiesData.slice(0, Math.ceil(qualitiesData.length / 2)).map((quality) => (
                    <div key={quality.id} className="flex gap-3 items-start p-3 rounded-lg hover:bg-white transition-colors duration-200">
                      <span className="text-[var(--color-primary)] text-xl mt-0.5 flex-shrink-0">●</span>
                      <p className="text-gray-700 text-base">{quality.point}</p>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {qualitiesData.slice(Math.ceil(qualitiesData.length / 2)).map((quality) => (
                    <div key={quality.id} className="flex gap-3 items-start p-3 rounded-lg hover:bg-white transition-colors duration-200">
                      <span className="text-[var(--color-primary)] text-xl mt-0.5 flex-shrink-0">●</span>
                      <p className="text-gray-700 text-base">{quality.point}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}