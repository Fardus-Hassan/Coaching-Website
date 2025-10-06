import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop',
];

const content = [
  {
    title: "Data to enrich your online business",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.",
    badge: "Announcing our next round of funding.",
  },
  {
    title: "Innovate with the latest technology",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    badge: "New features just launched!",
  },
  {
    title: "Scale your business effortlessly",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    badge: "See our success stories",
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

      <div className="relative h-[100vh] w-full overflow-hidden">
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
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
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