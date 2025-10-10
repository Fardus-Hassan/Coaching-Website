"use client";

import { useGetCoachingHistoriesQuery } from "@/redux/features/api/about/coachingHistoryApi";
import { useGetSpecialQualitiesQuery } from "@/redux/features/api/about/specialQualitiesApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

export default function AboutDetails() {
  const { data: historyData = [], isLoading: isHistoryLoading, error: historyError } = useGetCoachingHistoriesQuery();
  const { data: qualitiesData = [], isLoading: isQualitiesLoading, error: qualitiesError } = useGetSpecialQualitiesQuery();

  // Assume one history item
  const coachingHistory = historyData[0] || {
    heading: "",
    description: "",
    img: "",
    video_link: "",
    tag: "",
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main>
        {/* About Section */}
        <section className="pt-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            প্রতিষ্ঠানের <span className="text-indigo-600">সম্পর্কে</span>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>
          </h2>

          <div className="max-w-7xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            {isHistoryLoading ? (
              <>
                <Skeleton count={5} height={20} />
                <Skeleton count={4} height={20} />
              </>
            ) : historyError ? (
              <p className="text-center text-red-600">Error loading history. Please try again later.</p>
            ) : (
              <p className="text-justify text-base md:text-lg">{coachingHistory.description}</p>
            )}
          </div>

          {coachingHistory.img && !isHistoryLoading && !historyError && (
            <div className="max-w-7xl mx-auto mt-8">
              <Image
                src={coachingHistory.img}
                alt="প্রতিষ্ঠানের ছবি"
                width={1200}
                height={600}
                className="w-full rounded-xl shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
              />
            </div>
          )}
        </section>

        {/* Special Qualities Section */}
        <section className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            প্রতিষ্ঠানের <span className="text-indigo-600">বৈশিষ্ট্য</span> সমূহ
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2"></div>
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <p className="text-center text-red-600 col-span-2">Error loading special qualities. Please try again later.</p>
            ) : (
              <>
                {/* Left Column */}
                <div className="space-y-4">
                  {qualitiesData.slice(0, Math.ceil(qualitiesData.length / 2)).map((quality, index) => (
                    <div key={quality.id} className="flex gap-3">
                      <span className="text-indigo-600 mt-1">■</span>
                      <p className="text-gray-700">{quality.point}</p>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {qualitiesData.slice(Math.ceil(qualitiesData.length / 2)).map((quality, index) => (
                    <div key={quality.id} className="flex gap-3">
                      <span className="text-indigo-600 mt-1">■</span>
                      <p className="text-gray-700">{quality.point}</p>
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