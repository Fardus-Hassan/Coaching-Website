
import Image from 'next/image';

export default function SecBanner() {
  return (
    <section className="relative h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://uccgroup.com.bd/assets/images/cover-x.jpg"
          alt="UCC Campus"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Red Overlay */}
        <div className="absolute inset-0 bg-indigo-500/70"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Top Text */}
            <p className="text-white text-base md:text-lg font-semibold mb-2 md:mb-3">
              ভর্তি যুদ্ধ জয়ী হতে
            </p>

            {/* Main Heading */}
            <h1 className="text-white mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                UCC
              </span>
              <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold ml-2">
                Best Choice
              </span>
            </h1>

            {/* Description */}
            <div className="space-y-1 md:space-y-2">
              <p className="text-white text-sm md:text-base font-medium">
                আমাদের আছে দেশ সেরা একঝুক বিশেষজ্ঞ শিক্ষক মন্ডলী।
              </p>
              <p className="text-white text-sm md:text-base font-medium">
                আমাদের এর অন্তরের অনিভাজয় শেষী বীজিত কাজের তো অ্যাক্ষুইড
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent"></div>
    </section>
  );
}