"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryImage {
  id: number;
  src: string;
  category: string;
}

type TabType = "All" | "Success" | "Campus" | "Students" | "Others";

interface PhotoGalleryProps {
  isHomePage?: boolean;
}

export default function PhotoGallery({ isHomePage = true }: PhotoGalleryProps) {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const tabs: TabType[] = ["All", "Success", "Campus", "Students", "Others"];

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://uccgroup.com.bd/uploads/gallery/s1.jpg",
      category: "Students",
    },
    {
      id: 2,
      src: "https://uccgroup.com.bd/uploads/gallery/s2.jpg",
      category: "Campus",
    },
    {
      id: 3,
      src: "https://uccgroup.com.bd/uploads/gallery/s3.jpg",
      category: "Students",
    },
    {
      id: 4,
      src: "https://uccgroup.com.bd/uploads/gallery/s4.jpg",
      category: "Success",
    },
    {
      id: 5,
      src: "https://uccgroup.com.bd/uploads/gallery/s5.jpg",
      category: "Students",
    },
    {
      id: 6,
      src: "https://uccgroup.com.bd/uploads/gallery/s6.jpg",
      category: "Campus",
    },
    {
      id: 7,
      src: "https://uccgroup.com.bd/uploads/gallery/s7.jpg",
      category: "Students",
    },
    {
      id: 8,
      src: "https://uccgroup.com.bd/uploads/gallery/s8.jpg",
      category: "Others",
    },
    {
      id: 9,
      src: "https://uccgroup.com.bd/uploads/gallery/s9.jpg",
      category: "Success",
    },
    {
      id: 10,
      src: "https://uccgroup.com.bd/uploads/gallery/s10.jpg",
      category: "Campus",
    },
    {
      id: 11,
      src: "https://uccgroup.com.bd/uploads/gallery/s11.jpg",
      category: "Students",
    },
    {
      id: 12,
      src: "https://uccgroup.com.bd/uploads/gallery/s12.jpg",
      category: "Others",
    },
  ];

  const filteredImages =
    activeTab === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  // Limit to 6 images for homepage
  const displayedImages = isHomePage ? filteredImages.slice(0, 8) : filteredImages;

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            ফটো <span className="text-indigo-600">গ্যালারি</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
          {displayedImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openModal(image, index)}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 relative">
                <Image
                  src={image.src}
                  alt={`Gallery ${image.id}`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">
                    {image.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button (only for homepage) */}
        {isHomePage && (
          <div className="text-right mt-12">
            <Link href="/gallery">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                আরোও দেখুন
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 cursor-pointer text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={`Gallery ${selectedImage.id}`}
                width={1200}
                height={800}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg">
              <p className="font-semibold">{selectedImage.category}</p>
              <p className="text-sm text-gray-300">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 cursor-pointer text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}