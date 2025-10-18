"use client";

import { useGetNoticesQuery } from "@/redux/features/api/notice/noticeApi";
import Marquee from "react-fast-marquee";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function NoticeSlide() {
  const { data = [], isLoading, error } = useGetNoticesQuery();

  if (isLoading) {
    return (
      <section className="h-[5vh] bg-indigo-500 flex items-center overflow-hidden px-6">
        <Skeleton
          count={1}
          height={20}
          baseColor="#4f46e5"
          highlightColor="#818cf8"
          width="100%"
        />
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <section className="h-[5vh] bg-indigo-500 flex items-center overflow-hidden">
      <div className="w-full">
        <Marquee speed={50} gradient={false} pauseOnHover>
          {data.map((notice) => (
            <div
              key={notice.id}
              className="mx-6 text-white font-semibold text-sm lg:text-base flex items-center"
            >
              <span className="w-3 h-3 mr-2 rounded-full inline-block bg-white"></span>
              {notice.notice_title}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}