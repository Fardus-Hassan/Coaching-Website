import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative group">
            <div className="relative overflow-hidden">
              <Image
                src="https://uccgroup.com.bd/uploads/about/about.png"
                alt="UCC সম্পর্কে"
                width={600}
                height={400}
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform rotate-3">
              ৪০+ বছরের ঐতিহ্য
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                ৩৯ বছরের ঈর্ষান্বিত সফলতাকে সঙ্গে নিয়ে ৪০ এর কোটায় পা রেখেছে UCC পরিবার ! ! !
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
              <p className="text-base lg:text-lg">
                শিক্ষার মূল উদ্দেশ্য হলো একজন শিক্ষার্থীর সুপ্ত মেধা ও প্রতিভাকে বিকশিত করা, তার চিন্তা শক্তিকে ত্বরান্বিত করা এবং তাকে ধৈর্যশীল, আত্মবিশ্বাসী, নীতিবান ও দায়িত্ববান মানুষ হিসাবে গড়ে তোলা, এই নীতিকে সামনে নিয়ে শুরু থেকেই ইউসিসি পরিবারের পথচলা। সততা, নিষ্ঠতা, সেবা ও পরিবর্তনের মন মানসিকতা নিয়ে হাটি হাটি পায়ে ৪০ বছর অতিক্রম করেছে এই ঐতিহ্যবাহী প্রতিষ্ঠানটি। এগিয়ে চলেছে পরিবর্তনের প্রত্যয় নিয়ে, এগিয়ে চলেছে একটি সুন্দর বাংলাদেশের স্বপ্ন নিয়ে।
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/about"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                আরও পড়ুন
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}