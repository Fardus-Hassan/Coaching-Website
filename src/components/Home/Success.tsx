"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetSuccessStoriesQuery } from "@/redux/features/api/success/successStoriesApi";

interface SuccessStory {
  id: number;
  name: string;
  position: string;
  institution: string;
  image: string;
  description: string;
}

export default function Success() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const { data = [], isLoading, error } = useGetSuccessStoriesQuery();

  const successStories: SuccessStory[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    position: item.designation,
    institution: item.institute,
    image: item.image,
    description: item.description,
  }));

  const toggleReadMore = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedCards.includes(id);


  if (data.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            আমাদের <span className="text-indigo-600">সফলতার</span> গল্প
          </h2>
          <p className="text-sm text-gray-900 font-semibold">শিক্ষার্থীদের মতামত</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Swiper Slider */}
        {isLoading ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            loop={true}
            className="pb-12"
          >
            {[...Array(3)].map((_, index) => (
              <SwiperSlide className="pt-20" key={index}>
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl ring-1 ring-indigo-100 space-y-6 relative h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                    <Skeleton width={100} height={20} />
                  </div>
                  <Skeleton
                    circle
                    width={200}
                    height={200}
                    className="mx-auto"
                    baseColor="#e0e7ff"
                    highlightColor="#f3f4f6"
                  />
                  <div className="text-6xl text-indigo-300 font-serif leading-none select-none mt-[-80px]">
                    “
                  </div>
                  <div className="max-h-[150px] pt-10 overflow-auto">
                    <Skeleton count={4} height={16} className="mt-[-30px]" />
                    <Skeleton width={80} height={20} className="mt-2" />
                  </div>
                  <div className="text-6xl text-indigo-300 font-serif leading-none text-right select-none">
                    ”
                  </div>
                  <div className="space-y-1 mt-[-30px]">
                    <Skeleton height={24} width="60%" />
                    <Skeleton height={20} width="50%" />
                    <Skeleton height={16} width="70%" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination mt-8 !relative !bottom-0"></div>
          </Swiper>
        ) : error ? (
          null
        ) : successStories.length === 0 ? (
          null
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            loop={successStories.length > 1}
            className="pb-12"
          >
            {successStories.map((story) => (
              <SwiperSlide className="pt-20" key={story.id}>
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl ring-1 ring-indigo-100 space-y-6 relative h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                    সফলতার গল্প
                  </div>
                  <Image
                    src={story.image || "https://via.placeholder.com/200"}
                    alt={story.name}
                    width={200}
                    height={200}
                    className="object-cover w-[200px] rounded-full mx-auto h-[200px] object-top"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  />
                  <div className="text-6xl text-indigo-300 font-serif leading-none select-none mt-[-80px]">
                    “
                  </div>
                  <div className="max-h-[150px] pt-10 overflow-auto">
                    <p
                      className={`text-gray-700 text-sm lg:text-base leading-relaxed mt-[-30px] ${
                        !isExpanded(story.id) && "line-clamp-4"
                      }`}
                    >
                      {story.description}
                    </p>
                    {story.description.length > 200 && (
                      <button
                        onClick={() => toggleReadMore(story.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2 transition-colors duration-200"
                      >
                        {isExpanded(story.id) ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                  <div className="text-6xl text-indigo-300 font-serif leading-none text-right select-none">
                    ”
                  </div>
                  <div className="space-y-1 mt-[-30px]">
                    <h3 className="text-lg font-bold text-indigo-900">{story.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{story.position}</p>
                    <p className="text-sm text-gray-600">{story.institution}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination mt-8 !relative !bottom-0"></div>
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #c7d2fe;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: #4f46e5;
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }

        .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
      `}</style>
    </section>
  );
}