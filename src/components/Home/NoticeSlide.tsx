"use client";

import Marquee from "react-fast-marquee";

interface Notice {
  id: number;
  title: string;
}

export default function NoticeSlide() {
  const notices: Notice[] = [
    { id: 1, title: "বার্ষিক ক্রীড়া দিবস ১৫ নভেম্বর, ২০২৫-এ নির্ধারিত" },
    { id: 2, title: "অভিভাবক-শিক্ষক সভা ২০ অক্টোবর, ২০২৫-এ" },
    { id: 3, title: "বিজ্ঞান মেলার নিবন্ধন ৩০ অক্টোবর, ২০২৫ পর্যন্ত উন্মুক্ত" },
    { id: 4, title: "মধ্যবর্তী পরীক্ষা ১ নভেম্বর, ২০২৫ থেকে শুরু" },
    { id: 5, title: "সাংস্কৃতিক অনুষ্ঠানের অডিশন ২৫ অক্টোবর, ২০২৫-এ" },
    { id: 6, title: "লাইব্রেরি বই ফেরতের সময়সীমা ১৮ অক্টোবর, ২০২৫ পর্যন্ত বাড়ানো হয়েছে" },
    { id: 7, title: "নতুন কম্পিউটার ল্যাবের উদ্বোধন ২২ অক্টোবর, ২০২৫-এ" },
  ];

  return (
    <section className="h-[5vh] bg-indigo-500 flex items-center overflow-hidden">
      <div className="w-full">
        <Marquee speed={50} gradient={false} pauseOnHover>
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="mx-4 text-white font-semibold text-sm lg:text-base"
            >
             <span className="w-3 h-3 mr-[2px] rounded-full inline-block bg-white"></span> {notice.title}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}