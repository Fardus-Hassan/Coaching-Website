"use client";


import React, { useState, useEffect } from 'react';

const images = [
  'https://uccgroup.com.bd/uploads/gallery/s2.jpg',
  'https://uccgroup.com.bd/uploads/gallery/s6.jpg',
  'https://uccgroup.com.bd/uploads/gallery/s7.jpg',
];

const content = [
  {
    title: "ভবিষ্যৎ গড়ার সেরা ঠিকানা", 
    description: "আপনার প্রস্তুতিকে আরও মজবুত করতে আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী সব সময় প্রস্তুত। নিয়মিত পরীক্ষা ও বিশেষ ক্লাস দিয়ে আমরা আপনার সফলতার পথকে সুগম করি।",
    badge: "ভর্তি চলছে! আজই যোগাযোগ করুন।",
  },
  {
    title: "সেরা ফলাফলের নিশ্চয়তা", 
    description: "প্রতিটি শিক্ষার্থীকে ব্যক্তিগত যত্ন ও প্রয়োজনীয় দিকনির্দেশনা প্রদান করা হয়। আমাদের বিশেষ মডিউলগুলো আপনার দুর্বলতা কাটিয়ে উঠতে সাহায্য করবে।", 
    badge: "নতুন ব্যাচ শুরু হচ্ছে!", 
  },
  {
    title: "চাকরি পরীক্ষার সম্পূর্ণ প্রস্তুতি",
    description: "বিসিএস, ব্যাংক ও অন্যান্য সরকারি চাকরির পরীক্ষার জন্য আমাদের বিশেষ কোর্সগুলো। সঠিক কৌশল ও নিয়মিত অনুশীলনের মাধ্যমে নিজেকে প্রস্তুত করুন।",
    badge: "সফলতার গল্পগুলো দেখুন", 
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(images.length - 1);
  const [isContentChanging, setIsContentChanging] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsContentChanging(true);
      
      setTimeout(() => {
        setCurrentIndex((prevCurrentIndex) => {
          setPreviousIndex(prevCurrentIndex);
          return (prevCurrentIndex + 1) % images.length;
        });
        
        setTimeout(() => {
          setIsContentChanging(false);
        }, 300);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

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
          .animate-kenburns {
            animation: kenburns-zoom 5s ease-out forwards;
          }
          .hold-scale {
            transform: scale(1.1);
          }
          
          .content-transition {
            transition: opacity 500ms ease-in-out;
          }
        `}
      </style>

      <div className="relative h-[95vh] w-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
              ${index === currentIndex ? 'opacity-100 animate-kenburns z-10' : 'opacity-0'}
              ${index === previousIndex ? 'hold-scale z-0' : ''}
            `}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black opacity-80 z-20" />

        <div className="relative isolate flex h-full z-20 items-center justify-center px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className={`content-transition ${isContentChanging ? 'opacity-0' : 'opacity-100'} relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20`}>
                {content[currentIndex].badge}{" "}
                <a href="#" className="font-semibold text-indigo-400">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            
            <div className={`content-transition ${isContentChanging ? 'opacity-0' : 'opacity-100'}`}>
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
                {content[currentIndex].title}
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                {content[currentIndex].description}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}