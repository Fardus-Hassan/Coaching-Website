"use client";

import { useGetInfoBlocksQuery } from "@/redux/features/api/infoBlock/infoBlockApi";
import { useGetCoachingHistoriesQuery } from "@/redux/features/api/about/coachingHistoryApi";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";

export default function SecBanner() {
  const {
    data: infoBlocks = [],
    isLoading: isInfoLoading,
    error: infoError,
  } = useGetInfoBlocksQuery();

  const {
    data: coachingHistories = [],
    isLoading: isHistoryLoading,
    error: historyError,
  } = useGetCoachingHistoriesQuery();

  const highlighter = infoBlocks[0]?.highlighter ?? "";
  const backgroundImage =
    coachingHistories[0]?.img ||
    "https://uccgroup.com.bd/assets/images/cover-x.jpg";

  // যদি দুইটাই না থাকে তাহলে কিছুই render না করো
  if (infoBlocks.length === 0 && coachingHistories.length === 0) {
    return null;
  }

  return (
    <section className="relative h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {isHistoryLoading ? (
          <Skeleton
            height="100%"
            width="100%"
            baseColor="#4a5568"
            highlightColor="#a0aec0"
          />
        ) : historyError ? (
          <Image
            src="https://uccgroup.com.bd/assets/images/cover-x.jpg"
            alt="Fallback UCC Campus"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : (
          <Image
            src={backgroundImage}
            alt="UCC Campus"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Loading state */}
            {isInfoLoading ? (
              <div className="space-y-2">
                <Skeleton
                  height={20}
                  width={200}
                  baseColor="#e2e8f0"
                  highlightColor="#ffffff"
                />
                <Skeleton
                  height={40}
                  width={300}
                  baseColor="#e2e8f0"
                  highlightColor="#ffffff"
                />
                <Skeleton
                  height={16}
                  width="100%"
                  baseColor="#e2e8f0"
                  highlightColor="#ffffff"
                  count={2}
                />
              </div>
            ) : infoError ? (
              <p className="text-white text-base md:text-lg font-semibold">
                তথ্য লোড করতে ব্যর্থ।
              </p>
            ) : highlighter && typeof highlighter === "string" ? (
              <div className="text-white space-y-1 md:space-y-2">
                {parse(highlighter, {
                  replace: (domNode) => {
                    if (
                      domNode.type === "tag" &&
                      (domNode as any).attribs?.style
                    ) {
                      (domNode as any).attribs.className =
                        ((domNode as any).attribs.className || "") +
                        " text-white";
                      return domNode;
                    }
                  },
                })}
              </div>
            ) : (
              <p className="text-white text-base font-semibold">
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent"></div>
    </section>
  );
}
