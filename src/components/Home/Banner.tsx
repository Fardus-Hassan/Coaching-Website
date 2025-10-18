"use client";

import { useGetBannersQuery } from '@/redux/features/api/banner/bannerApi';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Banner {
  id: number;
  heading: string | null;
  description: string | null;
  banner_image: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousIndex, setPreviousIndex] = useState<number>(0);
  const [isContentChanging, setIsContentChanging] = useState<boolean>(false);
  
  const { data = [], isLoading, error } = useGetBannersQuery();
  const banners: Banner[] = data as Banner[];

  const activeBanners: Banner[] = banners.filter((banner: Banner) => banner?.status === "ACTIVE");

  useEffect(() => {
    if (activeBanners.length > 0) {
      setPreviousIndex(activeBanners.length - 1);
    }
  }, [activeBanners]);

  useEffect(() => {
    if (activeBanners.length === 0) return;

    const intervalId = setInterval(() => {
      setIsContentChanging(true);
      
      setTimeout(() => {
        setCurrentIndex((prevCurrentIndex: number) => {
          setPreviousIndex(prevCurrentIndex);
          return (prevCurrentIndex + 1) % activeBanners.length;
        });
        
        setTimeout(() => {
          setIsContentChanging(false);
        }, 300);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [activeBanners]);



  if (isLoading) {
    return (
      <div className="relative h-[calc(95vh-64px)] w-full overflow-hidden bg-gray-100">
        <Skeleton 
          className="absolute inset-0 h-full w-full" 
          baseColor="#f3f4f6" 
          highlightColor="#e5e7eb"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-30" />
        
        <div className="relative h-full flex items-end justify-start px-6 lg:px-12 pb-12 lg:pb-16 z-20">
          <div className="max-w-2xl space-y-4 w-full">
            <Skeleton 
              height={64} 
              width="75%" 
              baseColor="#d1d5db" 
              highlightColor="#e5e7eb"
              borderRadius={8}
            />
            <div className="space-y-2">
              <Skeleton 
                height={24} 
                width="100%" 
                baseColor="#d1d5db" 
                highlightColor="#e5e7eb"
                borderRadius={4}
              />
              <Skeleton 
                height={24} 
                width="85%" 
                baseColor="#d1d5db" 
                highlightColor="#e5e7eb"
                borderRadius={4}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return null;
  if (activeBanners.length === 0) return null;

  const currentBanner: Banner = activeBanners[currentIndex];

  return (
    <>
      <style>
        {`
          @keyframes kenburns-zoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }
          
          .banner-image {
            animation: kenburns-zoom 5s ease-out forwards;
          }
          
          .content-transition {
            transition: opacity 500ms ease-in-out;
          }
        `}
      </style>

      <div className="relative h-[calc(95vh-64px)] w-full overflow-hidden">
        {activeBanners.map((banner: Banner, index: number) => (
          <div
            key={banner?.id}
            className={`
              absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
              ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
            style={{ backgroundImage: `url(${banner?.banner_image})` }}
          >
            {index === currentIndex && (
              <div className="banner-image absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner?.banner_image})` }}
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-20" />

        <div className="relative h-full flex items-end justify-start px-6 lg:px-12 pb-12 lg:pb-16 z-30">
          <div className="">
            {(currentBanner?.heading || currentBanner?.description) && (
              <div className={`content-transition ${isContentChanging ? 'opacity-0' : 'opacity-100'}`}>
                {currentBanner?.heading ? (
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4 lg:mb-6">
                    {currentBanner?.heading}
                  </h1>
                ) : (
                  <Skeleton 
                    height={64} 
                    width="75%" 
                    baseColor="#d1d5db" 
                    highlightColor="#e5e7eb"
                    borderRadius={8}
                    className="mb-4 lg:mb-6"
                  />
                )}
                {currentBanner?.description ? (
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-200 leading-relaxed max-w-2xl">
                    {currentBanner?.description}
                  </p>
                ) : (
                  <div className="space-y-2 max-w-2xl">
                    <Skeleton 
                      height={24} 
                      width="100%" 
                      baseColor="#d1d5db" 
                      highlightColor="#e5e7eb"
                      borderRadius={4}
                    />
                    <Skeleton 
                      height={24} 
                      width="85%" 
                      baseColor="#d1d5db" 
                      highlightColor="#e5e7eb"
                      borderRadius={4}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}