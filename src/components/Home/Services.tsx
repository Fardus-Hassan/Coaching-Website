"use client";

import Image from "next/image";
import { useGetServicesQuery } from "@/redux/features/api/service/serviceApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Services() {
  const { data = [], isLoading, error } = useGetServicesQuery();

  if (isLoading) {
    return (
      <section className="py-10 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-lg">
              <Skeleton height={120} />
              <Skeleton height={20} width={150} className="mt-4 mx-auto" />
            </div>
          ))}
        </div>
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
    <section className="py-10 lg:py-16 bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="https://uccgroup.com.bd/assets/images/shebabg.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-3">
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              সেবা প্রকারসমূহ
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 text-xs lg:text-base max-w-2xl mx-auto">
            আধুনিক প্রযুক্তি ও মানসম্পন্ন সেবা নিয়ে আমরা আপনার পাশে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="relative w-20 h-20 mb-5">
                <Image
                  src={service.image}
                  alt={service.service_name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <p className="relative z-10 text-gray-800 text-base lg:text-lg font-bold leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {service.service_name}
              </p>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
