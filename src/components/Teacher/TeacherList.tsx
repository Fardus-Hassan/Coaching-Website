"use client";

import { useGetTeachersQuery } from "@/redux/features/api/teacher/teacherApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface Teacher {
  id: number;
  phone_number: string;
  name: string;
  avatar: string | null;
  designation: string | null;
}

export default function TeacherList() {
  const { data = [], isLoading, error } = useGetTeachersQuery();

  const activeTeachers: Teacher[] = data.map((item) => ({
    id: item.id,
    phone_number: item.phone_number,
    name: item.name,
    avatar: item.avatar,
    designation: item.designation,
  }));

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
            আমাদের <span className="text-indigo-600">শিক্ষকবৃন্দ</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600">
            আমাদের প্রতিষ্ঠানের শিক্ষার মান উন্নয়নে নিবেদিত শিক্ষকগণ
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3"></div>
        </div>

        {/* Teachers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 p-6"
              >
                <Skeleton
                  circle
                  height={160}
                  width={160}
                  baseColor="#e2e8f0"
                  highlightColor="#ffffff"
                  className="mx-auto mb-4"
                />
                <Skeleton height={20} width={150} baseColor="#e2e8f0" highlightColor="#ffffff" className="mx-auto mb-2" />
                <Skeleton height={16} width={100} baseColor="#e2e8f0" highlightColor="#ffffff" className="mx-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            Error loading teachers. Please try again later.
          </div>
        ) : activeTeachers.length === 0 ? (
          <div className="text-center text-gray-600">
            No active teachers found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {activeTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col items-center text-center p-6"
              >
                <div className="relative mb-4">
                  <Image
                    src={teacher.avatar || "https://via.placeholder.com/160"}
                    alt={teacher.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover w-40 h-40 border-4 border-indigo-100 shadow-md hover:shadow-lg transition-shadow duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    unoptimized
                  />
                  <div className="absolute inset-0 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors duration-300"></div>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-sm lg:text-base text-gray-600 mt-2 mb-1">{teacher.designation || "শিক্ষক"}</p>
                <p className="text-sm lg:text-base text-gray-600">{teacher.phone_number || ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
