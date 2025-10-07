"use client";

import { useState, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon, AcademicCapIcon, BanknotesIcon } from "@heroicons/react/24/outline";

// কোর্সের ডেটা অপরিবর্তিত রাখা হলো
const courses = [
  {
    id: 1,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "ক ৭ম (বিজ্ঞান)",
    regularClass: "৪০",
    consultationClass: "২০: অসীমিত",
    writtenClass: "১০",
    classTest: "৪০",
    evaluationTest: "০৪",
    modelTest: "১২",
    specialClass: "১৫",
    price: "১৫০০-১৮০০",
    fullDetails: "আজানা প্রশ্নমূলক কোর্সের সম্পূর্ণ বিবরণ:\n\n- নিয়মিত ক্লাস: ৪০ ঘণ্টা\n- কনসালটেশন ক্লাস: ২০ ঘণ্টা (অসীমিত অ্যাক্সেস)\n- লিখিত ক্লাস: ১০ সেশন\n- ক্লাস টেস্ট: ৪০টি\n- ইভালুয়েশন টেস্ট: ০৪টি\n- মডেল টেস্ট: ১২টি\n- স্পেশাল ক্লাস: ১৫ সেশন\n\nএই কোর্সটি বিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য ডিজাইন করা হয়েছে। UCC-এর অভিজ্ঞ শিক্ষকদের নিয়ে পরিচালিত। অফার: ১০% ডিসকাউন্ট প্রথম ৫০ জনের জন্য। আরও বিস্তারিত জানতে যোগাযোগ করুন।",
  },
  {
    id: 2,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "ক/গ ৭ম + বিজ্ঞান পরিবেশন",
    regularClass: "৭৫",
    consultationClass: "৪০: অসীমিত",
    writtenClass: "২০",
    classTest: "৭৫",
    evaluationTest: "০৮",
    modelTest: "২৪",
    specialClass: "১৫",
    price: "২৭০০-৩০০০",
    fullDetails: "আজানা প্রশ্নমূলক + বিজ্ঞান পরিবেশন কোর্সের সম্পূর্ণ বিবরণ:\n\n- নিয়মিত ক্লাস: ৭৫ ঘণ্টা\n- কনসালটেশন ক্লাস: ৪০ ঘণ্টা (অসীমিত অ্যাক্সেস)\n- লিখিত ক্লাস: ২০ সেশন\n- ক্লাস টেস্ট: ৭৫টি\n- ইভালুয়েশন টেস্ট: ০৮টি\n- মডেল টেস্ট: ২৪টি\n- স্পেশাল ক্লাস: ১৫ সেশন\n\nএই কোর্সটি উন্নত স্তরের শিক্ষার্থীদের জন্য। UCC-এর সেরা ফ্যাকাল্টি দ্বারা পরিচালিত। অফার: ফ্রি স্টাডি ম্যাটেরিয়াল।",
  },
  {
    id: 3,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "থ ৭ম / বিজ্ঞান পরিবেশন + হাউজ",
    regularClass: "৩৫",
    consultationClass: "অসীমিত",
    writtenClass: "১০",
    classTest: "৩৫",
    evaluationTest: "০৪",
    modelTest: "১২",
    specialClass: "১৫",
    price: "১৫০০-২০০০",
    fullDetails: "আজানা প্রশ্নমূলক কোর্সের সম্পূর্ণ বিবরণ (থ ৭ম):\n\n- নিয়মিত ক্লাস: ৩৫ ঘণ্টা\n- কনসালটেশন ক্লাস: অসীমিত অ্যাক্সেস\n- লিখিত ক্লাস: ১০ সেশন\n- ক্লাস টেস্ট: ৩৫টি\n- ইভালুয়েশন টেস্ট: ০৪টি\n- মডেল টেস্ট: ১২টি\n- স্পেশাল ক্লাস: ১৫ সেশন\n\nবিজ্ঞান পরিবেশন + হাউজ ফোকাসড কোর্স। UCC-এর ঐতিহ্যবাহী শিক্ষা পদ্ধতি। অফার: ইনস্টলমেন্ট পেমেন্ট অপশন।",
  },
  {
    id: 4,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "ক ৮ম (মানবিক)",
    regularClass: "৫০",
    consultationClass: "৩০: অসীমিত",
    writtenClass: "১৫",
    classTest: "৫০",
    evaluationTest: "০৬",
    modelTest: "১৮",
    specialClass: "১০",
    price: "২০০০-২৫০০",
    fullDetails: "আজানা প্রশ্নমূলক কোর্সের সম্পূর্ণ বিবরণ (মানবিক):\n\n- নিয়মিত ক্লাস: ৫০ ঘণ্টা\n- কনসালটেশন ক্লাস: ৩০ ঘণ্টা (অসীমিত অ্যাক্সেস)\n- লিখিত ক্লাস: ১৫ সেশন\n- ক্লাস টেস্ট: ৫০টি\n- ইভালুয়েশন টেস্ট: ০৬টি\n- মডেল টেস্ট: ১৮টি\n- স্পেশাল ক্লাস: ১০ সেশন\n\nমানবিক বিভাগের জন্য স্পেশালাইজড। UCC-এর সাফল্যের গ্যারান্টি। অফার: গ্রুপ ডিসকাউন্ট।",
  },
  {
    id: 5,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "গ ৬ম + পরিবেশন",
    regularClass: "৬০",
    consultationClass: "২৫: অসীমিত",
    writtenClass: "১২",
    classTest: "৬০",
    evaluationTest: "০৫",
    modelTest: "১৫",
    specialClass: "১২",
    price: "১৮০০-২২০০",
    fullDetails: "আজানা প্রশ্নমূলক + পরিবেশন কোর্সের সম্পূর্ণ বিবরণ:\n\n- নিয়মিত ক্লাস: ৬০ ঘণ্টা\n- কনসালটেশন ক্লাস: ২৫ ঘণ্টা (অসীমিত অ্যাক্সেস)\n- লিখিত ক্লাস: ১২ সেশন\n- ক্লাস টেস্ট: ৬০টি\n- ইভালুয়েশন টেস্ট: ০৫টি\n- মডেল টেস্ট: ১৫টি\n- স্পেশাল ক্লাস: ১২ সেশন\n\nপরিবেশন ফোকাসড কোর্স। UCC-এর ইনোভেটিভ অ্যাপ্রোচ। অফার: ফ্রি ওয়েবিনার অ্যাক্সেস।",
  },
  {
    id: 6,
    title: "আজানা প্রশ্নমূলক",
    subtitle: "খ ৯ম (বিজ্ঞান + মানবিক)",
    regularClass: "৪৫",
    consultationClass: "৩৫: অসীমিত",
    writtenClass: "১৮",
    classTest: "৪৫",
    evaluationTest: "০৭",
    modelTest: "২০",
    specialClass: "১৮",
    price: "২৫০০-২৮০০",
    fullDetails: "আজানা প্রশ্নমূলক কোর্সের সম্পূর্ণ বিবরণ (বিজ্ঞান + মানবিক):\n\n- নিয়মিত ক্লাস: ৪৫ ঘণ্টা\n- কনসালটেশন ক্লাস: ৩৫ ঘণ্টা (অসীমিত অ্যাক্সেস)\n- লিখিত ক্লাস: ১৮ সেশন\n- ক্লাস টেস্ট: ৪৫টি\n- ইভালুয়েশন টেস্ট: ০৭টি\n- মডেল টেস্ট: ২০টি\n- স্পেশাল ক্লাস: ১৮ সেশন\n\nহাইব্রিড কোর্স বিজ্ঞান ও মানবিকের জন্য। UCC-এর কমপ্রিহেনসিভ প্রোগ্রাম। অফার: স্পেশাল গিফট হ্যাম্পার।",
  },
];

export default function Course() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
            আমাদের <span className="text-indigo-600"> প্রোগ্রামসমূহ</span>
          </h2>
                    <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Courses Grid: উন্নত ডিজাইন */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] flex flex-col"
            >
              <div className="p-6 flex-grow">
                {/* Offer Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    <BanknotesIcon className="w-4 h-4 inline mr-1 -mt-0.5" /> অফার চলছে
                  </span>
                </div>

                {/* Title Section */}
                <div className="text-gray-900 mb-4">
                  <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                  <p className="text-md font-medium text-indigo-600">{course.subtitle}</p>
                </div>

                {/* Course Features / Details */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5 shadow-inner">
                  <h4 className="font-bold text-indigo-700 mb-3 flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2" /> কোর্সের বিবরণ
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span className="font-semibold">নিয়মিত ক্লাস:</span>
                      <span>{course.regularClass} ঘণ্টা</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold">কনসালটেশন ক্লাস:</span>
                      <span>{course.consultationClass}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold">লিখিত ক্লাস:</span>
                      <span>{course.writtenClass} সেশন</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold">ক্লাস টেস্ট:</span>
                      <span>{course.classTest} টি</span>
                    </li>
                    {/* আপনি চাইলে বাকি আইটেমগুলোও এভাবে সুন্দর করে সাজাতে পারেন */}
                  </ul>
                </div>
              </div>

              {/* Footer / Price and Button */}
              <div className="p-6 pt-0 border-t border-gray-100">
                <div className="text-center space-y-4">
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-full font-extrabold shadow-lg shadow-indigo-200/50">
                    মূল্য: ৳{course.price}
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Smooth Open/Close ট্রানজিশন */}
      <Transition appear show={!!selectedCourse} as={Fragment}>
        <Dialog as="div" onClose={() => setSelectedCourse(null)} className="relative z-50">
          
          {/* Backdrop Transition */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              
              {/* Dialog Panel Transition */}
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[90vh]">
                  <div className="flex items-start justify-between mb-4 border-b pb-3">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedCourse?.title} - বিস্তারিত
                    </DialogTitle>
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-7 w-7" />
                    </button>
                  </div>
                  
                  {selectedCourse && (
                    <div className="space-y-4 text-gray-700 leading-relaxed overflow-y-auto max-h-[calc(90vh-180px)]">
                      <h4 className="text-lg font-semibold text-indigo-600">{selectedCourse.subtitle}</h4>
                      <pre className="whitespace-pre-wrap text-base font-sans bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                        {selectedCourse.fullDetails}
                      </pre>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-4 border-t flex justify-end">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2 rounded-full font-semibold transition-colors duration-200 shadow-md"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}