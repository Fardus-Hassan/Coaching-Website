"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetSpeechesQuery } from "@/redux/features/api/speech/speechApi";

interface Speech {
  name: string;
  designation: string;
  email: string;
  phone: string;
  image: string;
  messageTitle: string;
  paragraphs: string[];
}

export default function ChairmanMessage() {
  const { data = [], isLoading, error } = useGetSpeechesQuery();

  const speeches: Speech[] = data
    .map((item) => ({
      name: item.name,
      designation: item.designation,
      email: item.email,
      phone: item.phone,
      image: item.img,
      messageTitle: item.title,
      paragraphs: item.speech.split("\r\n").filter((p) => p.trim()),
      sl: item.sl,
    }))
    .sort((a, b) => a.sl - b.sl);

    if (data.length === 0) {
      return null;
    }

  return (
    <section className="relative py-12 lg:py-20 bg-gray-50 overflow-hidden">


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-12">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"
              >
                <div className={index % 2 === 0 ? "lg:col-span-1" : "lg:col-span-1 lg:order-2"}>
                  <Skeleton
                    height={400}
                    className="w-full rounded-2xl"
                    baseColor="#e0e7ff"
                    highlightColor="#f3f4f6"
                  />
                </div>
                <div className={index % 2 === 0 ? "lg:col-span-3" : "lg:col-span-3 lg:order-1"}>
                  <Skeleton height={24} width="40%" className="mb-2" />
                  <Skeleton height={16} width="60%" className="mb-4" />
                  <Skeleton height={16} width="80%" count={2} className="mb-2" />
                  <Skeleton height={24} width="50%" className="mt-10 mb-4" />
                  <Skeleton height={16} count={5} className="mb-6" />
                  <div className="text-right">
                    <Skeleton height={24} width="30%" />
                    <Skeleton height={16} width="40%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          null
        ) : speeches.length === 0 ? (
          null
        ) : (
          <div className="space-y-12">
            {speeches.map((speech, index) => (
              <div
                key={speech.name}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"
              >
                {/* Image Section */}
                <div
                  className={`relative group ${index % 2 === 0 ? "lg:col-span-1" : "lg:col-span-1 lg:order-2"}`}
                >
                  <Image
                    src={speech.image || "https://via.placeholder.com/400"}
                    alt={speech.name}
                    width={400}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute -top-12 left-0 text-8xl text-indigo-300 font-serif select-none">
                    “
                  </div>
                </div>

                {/* Text Section */}
                <div
                  className={`relative ${index % 2 === 0 ? "lg:col-span-3" : "lg:col-span-3 lg:order-1"}`}
                >
                  <div className="relative z-10 w-full max-w-sm">
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                      {speech.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{speech.designation}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700">Email :</span>
                        <span className="text-gray-600 text-sm">{speech.email}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700">Phone :</span>
                        <span className="text-gray-600 text-sm">{speech.phone}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 mb-4 mt-10">
                    {speech.messageTitle}
                  </h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {speech.paragraphs.map((paragraph, i) => (
                      <p key={i} className="text-justify text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Signature */}
                  <div className="pt-8">
                    <div className="text-right">
                      <p className="font-bold text-lg text-[var(--color-text)]">{speech.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{speech.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
