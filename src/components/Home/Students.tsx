"use client";

import { useGetIconicStudentsQuery } from "@/redux/features/api/iconic_student/iconicStudentsApi";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Student {
  name: string;
  section: string;
  college: string;
  image: string;
}

export default function Students() {
  const { data = [], isLoading, error } = useGetIconicStudentsQuery();

  const students: Student[] = data.map((item) => ({
    name: item.student_name,
    section: item.title,
    college: item.description,
    image: item.image,
  }));

  if (data.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 lg:py-14 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative mx-auto">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 bg-clip-text mb-4">
            আমাদের <span className="text-indigo-600">সাফল্য</span> গাঁথা
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden max-w-7xl mx-auto">
          {isLoading ? (
            <Marquee
              speed={100}
              direction="left"
              pauseOnHover={true}
              className=""
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 last:mr-4"
                >
                  <div className="bg-white/10 w-[250px] h-[300px] mx-auto backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
                    <Skeleton
                      height="100%"
                      className="aspect-[4/5]"
                      baseColor="#e0e7ff"
                      highlightColor="#f3f4f6"
                    />
                    <div className="p-5">
                      <Skeleton height={20} width="80%" className="mb-1" />
                      <Skeleton height={20} width="60%" className="mb-1" />
                      <Skeleton height={16} width="70%" />
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          ) : error ? (
            null
          ) : students.length === 0 ? (
            null
          ) : (
            <Marquee
              speed={80}
              direction="left"
              pauseOnHover={true}
              className=""
            >
              {students.map((student, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 last:mr-4"
                >
                  {/* Glassmorphism Card Style */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden transition-all duration-300 transform-gpu">
                    {/* Image Container */}
                    <div className="relative w-[250px] h-[300px] mx-auto overflow-hidden">
                      <Image
                        src={student.image}
                        alt={student.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-5 text-center text-gray-900">
                      <h3 className="text-xl font-bold mb-1 tracking-wide">
                        {student.name}
                      </h3>
                      <p className="text-indigo-700 font-bold mb-1">
                        {student.section}
                      </p>
                      <p className="text-sm text-gray-900">{student.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </section>
  );
}