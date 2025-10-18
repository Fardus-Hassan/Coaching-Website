"use client";

import { useGetCommitteesQuery } from "@/redux/features/api/committee/committeeApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface Committee {
  id: number;
  name: string;
  img: string;
  designation: string;
  status: string;
}

export default function Committees() {
  const { data = [], isLoading, error } = useGetCommitteesQuery();

  const activeCommittees: Committee[] = data
    .filter((item) => item.status === "ACTIVE")
    .map((item) => ({
      id: item.id,
      name: item.name,
      img: item.img,
      designation: item.degination,
      status: item.status,
    }));


    if (data.length === 0) {
      return null;
    }
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
            আমাদের <span className="text-indigo-600">কমিটির সদস্যবৃন্দ</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600">
            আমাদের প্রতিষ্ঠানের নেতৃত্ব ও পরিচালনায় গুরুত্বপূর্ণ ভূমিকা পালনকারী সদস্যগণ
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Committees Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 p-6"
              >
                <Skeleton circle height={160} width={160} className="mx-auto mb-4" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
                <Skeleton height={24} width="60%" className="mx-auto mb-2" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
                <Skeleton height={16} width="80%" className="mx-auto" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
              </div>
            ))}
          </div>
        ) : error ? (
          null
        ) : activeCommittees.length === 0 ? (
          null
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {activeCommittees.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col items-center text-center p-6"
              >
                <div className="relative mb-4">
                  <Image
                    src={member.img || "https://via.placeholder.com/160"}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover w-40 h-40 border-4 border-indigo-100 shadow-md hover:shadow-lg transition-shadow duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  />
                  <div className="absolute inset-0 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors duration-300"></div>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm lg:text-base text-gray-600">{member.designation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}