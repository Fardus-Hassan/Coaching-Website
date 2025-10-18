"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CalendarDays, Download, AlertCircle } from "lucide-react";
import { useGetNoticesQuery } from "@/redux/features/api/notice/noticeApi";

interface Alert {
  type: "success" | "error";
  message: string;
}

export default function Notices() {
  const { data = [], isLoading, error } = useGetNoticesQuery();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [alert, setAlert] = useState<Alert | null>(null);

  const handleDownload = async (url: string, fileName: string, noticeId: number) => {
    try {
      setDownloadingId(noticeId);
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, fileName);
      setAlert({ type: "success", message: "ফাইল সফলভাবে ডাউনলোড হয়েছে!" });
      setTimeout(() => setAlert(null), 5000);
    } catch (error) {
      console.error("Download failed:", error);
      setAlert({ type: "error", message: "ডাউনলোড ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।" });
      setTimeout(() => setAlert(null), 5000);
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md animate-pulse"
            >
              <Skeleton height={24} width="60%" />
              <Skeleton height={16} width="40%" className="my-2" />
              <Skeleton count={3} />
              <Skeleton height={35} width="50%" className="mt-4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        ⚠️ নোটিশ লোড করতে সমস্যা হয়েছে।
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alert */}
        {alert && (
          <div
            className={`fixed top-1 right-1 z-50 p-4 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
              alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {alert.type === "success" ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            নোটিশ <span className="text-indigo-600">বোর্ড</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((notice) => {
            const isExpired =
              new Date(notice.expire_date) < new Date() ? true : false;
            const isDownloading = downloadingId === notice.id;

            return (
              <div
                key={notice.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
              >
                {/* Expiry Badge */}
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isExpired
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isExpired ? "মেয়াদোত্তীর্ণ" : `শেষ তারিখ: ${notice.expire_date}`}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <CalendarDays size={14} />
                    {notice.date}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {notice.notice_title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {notice.notice_description}
                </p>

                {notice.file_attached ? (
                  <button
                    onClick={() =>
                      handleDownload(
                        notice.file_attached,
                        `${notice.notice_title}.${notice.file_attached.endsWith(".pdf") ? "pdf" : "jpg"}`,
                        notice.id
                      )
                    }
                    disabled={isDownloading}
                    className={`${
                      isDownloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1"
                    } text-white font-bold px-5 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto`}
                  >
                    <Download size={16} /> {isDownloading ? "ডাউনলোড হচ্ছে..." : "ডাউনলোড করুন"}
                  </button>
                ) : (
                  <div className="text-gray-400 text-sm italic flex items-center gap-1 mt-auto">
                    <AlertCircle size={14} /> সংযুক্তি নেই
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}