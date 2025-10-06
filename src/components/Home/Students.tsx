"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const students = [
  {
    name: "মো. আরিফুল ইসলাম",
    section: "খ ৭ম (বিজ্ঞান)",
    college: "পাবনা ক্যাডেট কলেজ",
    image: "https://uccgroup.com.bd/uploads/succ_student/22.jpg",
  },
  {
    name: "মো. আবু রহমান গালিব",
    section: "ক ৪৪ (মানবিক)",
    college: "নিউ গভঃ ডিগ্রি কলেজ, রাজশাহী",
    image: "https://uccgroup.com.bd/uploads/succ_student/23.jpg",
  },
  {
    name: "ফরিদা জাহান",
    section: "গ ৪১ (মানবিক)",
    college: "সরকারি মাতুর্ভূবন উদয়ন ডিগ্রি কলেজ",
    image: "https://uccgroup.com.bd/uploads/succ_student/24.jpg",
  },
  {
    name: "নাফিজুল হাসান সেতু",
    section: "খ ৬৯ (বিজ্ঞান)",
    college: "বরিশাল ক্যাডেট কলেজ",
    image: "https://uccgroup.com.bd/uploads/succ_student/25.jpg",
  },
];

export default function Students() {
  return (
    <section className="relative py-12 lg:py-14 text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r p-2 from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent mb-4">
            আমাদের সাফল্য গাঁথা
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Marquee Container */}

        <div className="overflow-hidden">
          <Marquee
            speed={70} // Slightly slower for a calmer look
            direction="left"
            pauseOnHover={true}
            className=""
          >
            {students.map((student, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 mx-6 last:mr-6 lg:w-80"
              >
                {/* Glassmorphism Card Style */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl shadow-black/20 transition-all duration-300 transform-gpu ">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={student.image}
                      alt={student.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Content Area - Text in white/light colors */}
                  <div className="p-5 text-center text-white">
                    <h3 className="text-xl font-bold mb-1 tracking-wide">
                      {student.name}
                    </h3>
                    <p className="text-indigo-300 font-medium mb-1">
                      {student.section}
                    </p>
                    <p className="text-sm text-gray-300">{student.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Pause on hover (optional) */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-colors duration-200">
            আরও দেখুন
          </button>
        </div>
      </div>
    </section>
  );
}
