"use client";

import { saveAs } from "file-saver";

interface Notice {
  id: number;
  title: string;
  date: string;
  description: string;
  fileUrl: string;
  fileType: "image" | "pdf";
}

export default function Notices() {
  const notices: Notice[] = [
    {
      id: 1,
      title: "বার্ষিক ক্রীড়া দিবস ২০২৫",
      date: "১৫ নভেম্বর, ২০২৫",
      description: "আমাদের বার্ষিক ক্রীড়া দিবসে অংশগ্রহণের জন্য প্রস্তুত হোন! বিস্তারিত সময়সূচি এবং নিয়মাবলী ডাউনলোড করুন।",
      fileUrl: "https://uccgroup.com.bd/uploads/notices/sports_day_2025.pdf",
      fileType: "pdf",
    },
    {
      id: 2,
      title: "অভিভাবক-শিক্ষক সভা",
      date: "২০ অক্টোবর, ২০২৫",
      description: "অভিভাবক-শিক্ষক সভায় অংশগ্রহণ করুন এবং আপনার সন্তানের অগ্রগতি নিয়ে আলোচনা করুন। বিস্তারিত ডাউনলোড করুন।",
      fileUrl: "https://uccgroup.com.bd/uploads/notices/parent_teacher_meeting.jpg",
      fileType: "image",
    },
    {
      id: 3,
      title: "বিজ্ঞান মেলা ২০২৫",
      date: "৩০ অক্টোবর, ২০২৫",
      description: "বিজ্ঞান মেলায় অংশগ্রহণের জন্য নিবন্ধন করুন। নিয়ম ও শর্তাবলী ডাউনলোড করুন।",
      fileUrl: "https://uccgroup.com.bd/uploads/notices/science_fair_2025.pdf",
      fileType: "pdf",
    },
    {
      id: 4,
      title: "মধ্যবর্তী পরীক্ষার সময়সূচি",
      date: "১ নভেম্বর, ২০২৫",
      description: "মধ্যবর্তী পরীক্ষার সময়সূচি এবং নির্দেশিকা ডাউনলোড করুন।",
      fileUrl: "https://uccgroup.com.bd/uploads/notices/midterm_schedule.jpg",
      fileType: "image",
    },
    {
      id: 5,
      title: "সাংস্কৃতিক অনুষ্ঠান",
      date: "২৫ অক্টোবর, ২০২৫",
      description: "সাংস্কৃতিক অনুষ্ঠানের অডিশন সম্পর্কিত বিস্তারিত তথ্য ডাউনলোড করুন।",
      fileUrl: "https://uccgroup.com.bd/uploads/notices/cultural_program.pdf",
      fileType: "pdf",
    },
  ];

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            নোটিশ <span className="text-indigo-600">বোর্ড</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {notice.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{notice.date}</p>
              <p className="text-gray-700 text-sm mb-4 flex-grow">
                {notice.description}
              </p>
              <button
                onClick={() =>
                  handleDownload(
                    notice.fileUrl,
                    `${notice.title}.${notice.fileType === "pdf" ? "pdf" : "jpg"}`
                  )
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mt-auto"
              >
                ডাউনলোড করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}