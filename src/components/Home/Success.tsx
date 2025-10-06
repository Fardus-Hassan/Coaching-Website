"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// JSON data for success stories
const successStories = [
  {
    id: 1,
    name: "নুরুন নাহার প্রিয়াঙ্কা",
    position: "৩ম স্থানীয় (বিজ্ঞান) ২০২৩-২৪",
    institution: "শিক্ষক: ইন্দ্রজিৎ সাহা কলেজ, টাঙ্গাইল",
    image: "https://uccgroup.com.bd/uploads/std_review/2.png",
    description: "আমি নুরুন নাহার প্রিয়াঙ্কা, ২০২৩-২৪ সেশনের একজন শিক্ষার্থী। আল্লাহর অশেষ রহমতে আমি প্রথমকার UCC Lecture Sheet Orientation Class-এ ৩য় স্থান অধিকার করেছি। আমার উচ্চ মাধ্যমিক পর্যায়ে প্রথমকার মাধ্যমিক শিক্ষার্থীদের জন্য UCC Lecture Sheet একটি মূল্যবান সম্পদ। একটি মাধ্যমিক শিক্ষার্থীদের জন্য UCC Lecture Sheet একটি মূল্যবান সম্পদ। একটি মার্কস UCC-এর মাধ্যমিক, একটি মার্কস। UCC-এর মাধ্যমিক, কারণ!"
  },
  {
    id: 2,
    name: "রহমত আলী",
    position: "১ম স্থানীয় (বাণিজ্য) ২০২৩-২৪",
    institution: "শিক্ষক: ঢাকা কলেজ, ঢাকা",
    image: "https://uccgroup.com.bd/uploads/std_review/1.png",
    description: "UCC-এর লেকচার শিট আমার পড়াশোনাকে সম্পূর্ণভাবে বদলে দিয়েছে। সঠিক গাইডলাইন এবং মানসম্মত শিক্ষা উপকরণের মাধ্যমে আমি আমার লক্ষ্য অর্জন করতে পেরেছি। ধন্যবাদ UCC কে এমন একটি প্ল্যাটফর্ম দেওয়ার জন্য যেখানে শিক্ষার্থীরা তাদের স্বপ্ন পূরণ করতে পারে।"
  },
  {
    id: 3,
    name: "সুমাইয়া আক্তার",
    position: "২য় স্থানীয় (মানবিক) ২০২৩-২৪",
    institution: "শিক্ষক: ভিকারুননিসা নূন কলেজ, ঢাকা",
    image: "https://uccgroup.com.bd/uploads/std_review/3.png",
    description: "UCC-এর মাধ্যমে আমি শিখেছি কিভাবে সঠিকভাবে পড়াশোনা করতে হয়। তাদের লেকচার শিট এবং গাইডেন্স আমার জন্য খুবই সহায়ক হয়েছে। বিশেষ করে পরীক্ষার প্রস্তুতির সময় UCC-এর মডেল টেস্ট আমার আত্মবিশ্বাস বাড়িয়ে দিয়েছে।"
  },
  {
    id: 4,
    name: "আরিফ হাসান",
    position: "৪র্থ স্থানীয় (বিজ্ঞান) ২০২৩-২৪",
    institution: "শিক্ষক: রাজউক উত্তরা মডেল কলেজ, ঢাকা",
    image: "https://uccgroup.com.bd/uploads/std_review/4.png",
    description: "UCC-এর শিক্ষকরা খুবই অভিজ্ঞ এবং বন্ধুত্বপূর্ণ। তারা প্রতিটি সমস্যার সমাধান খুব সুন্দরভাবে বুঝিয়ে দেন। তাদের লেকচার শিটে এমন সব টিপস আছে যা বইয়ে খুঁজে পাওয়া যায় না। এই টিপসগুলো পরীক্ষায় খুবই কাজে লাগে।"
  },
  {
    id: 5,
    name: "ফাতেমা বেগম",
    position: "৫ম স্থানীয় (বাণিজ্য) ২০২৩-২৪",
    institution: "শিক্ষক: হলি ক্রস কলেজ, ঢাকা",
    image: "https://uccgroup.com.bd/uploads/std_review/5.png",
    description: "UCC-এর অনলাইন ক্লাস এবং লেকচার শিটের মাধ্যমে আমি আমার পড়াশোনাকে আরও গতিশীল করতে পেরেছি। বিশেষ করে করোনা পরিস্থিতিতে যখন সব শিক্ষাপ্রতিষ্ঠান বন্ধ ছিল, তখন UCC-এর অনলাইন প্ল্যাটফর্ম আমার পড়াশোনা চালিয়ে যেতে সহায়তা করেছে।"
  }
];

export default function Success() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleReadMore = (id: number) => {
    setExpandedCards(prev =>
      prev.includes(id)
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedCards.includes(id);

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
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          loop={true}
          className="pb-12"
        >
          {successStories.map((story) => (
            <SwiperSlide className="pt-20" key={story.id}>
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl ring-1 ring-indigo-100 space-y-6 relative h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                  সফলতার গল্প
                </div>
                <Image
                  src={story.image}
                  alt={story.name}
                  width={200}
                  height={200}
                  className="object-cover w-[200px] rounded-full mx-auto h-[200px] object-top"
                />
                <div className="text-6xl text-indigo-300 font-serif leading-none select-none mt-[-80px]">“</div>
                <div className="max-h-[150px] pt-10 overflow-auto">
                  <p className={`text-gray-700 text-sm lg:text-base leading-relaxed mt-[-30px] ${
                    !isExpanded(story.id) && "line-clamp-4"
                  }`}>
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
                <div className="text-6xl text-indigo-300 font-serif leading-none text-right select-none">”</div>
                <div className="space-y-1 mt-[-30px]">
                  <h3 className="text-lg font-bold text-indigo-900">{story.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{story.position}</p>
                  <p className="text-sm text-gray-600">{story.institution}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Pagination Dots */}
          <div className="swiper-pagination mt-8 !relative !bottom-0"></div>
        </Swiper>
      </div>

      {/* Add custom CSS for line clamp and pagination styling */}
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