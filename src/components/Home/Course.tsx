"use client";

import { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  XMarkIcon,
  AcademicCapIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useGetProgramsQuery } from "@/redux/features/api/program/programApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const createMarkup = (html: string) => {
  const decodedHtml = decodeHtml(html);
  return {
    __html: decodedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""),
  };
};

interface Course {
  id: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDetails: string;
  price: string;
}

export default function Course() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { data = [], isLoading, error } = useGetProgramsQuery();

  const courses: Course[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.sub_title,
    shortDescription: item.short_description,
    fullDetails: item.long_description,
    price: item.price,
  }));

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            আমাদের <span className="text-indigo-600">প্রোগ্রামসমূহ</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600">আপনার শিক্ষার যাত্রাকে শক্তিশালী করতে ডিজাইন করা কোর্স</p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 p-6"
              >
                <Skeleton height={32} width="70%" className="mb-2" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
                <Skeleton height={20} width="50%" className="mb-4" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
                <Skeleton height={16} count={4} className="mb-2" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
                <Skeleton height={40} width={120} className="mt-4" baseColor="#e0e7ff" highlightColor="#f3f4f6" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            Error loading programs. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-base font-medium text-indigo-600 mb-4">{course.subtitle}</p>
                  <div className="space-y-3 text-gray-700 text-sm lg:text-base leading-relaxed">
                    <div
                      className="prose prose-sm lg:prose-base max-w-none"
                      dangerouslySetInnerHTML={createMarkup(course.shortDescription)}
                    />
                    <p className="flex items-start gap-2">
                      <BanknotesIcon className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                      <span>মূল্য: {course.price}</span>
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Course Details */}
      <Transition show={!!selectedCourse} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedCourse(null)}
        >
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          {/* Dialog Panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
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
                    <h4 className="text-lg font-semibold text-indigo-600">
                      {selectedCourse.subtitle}
                    </h4>
                    <div
                      className="prose prose-sm lg:prose-base max-w-none bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                      dangerouslySetInnerHTML={createMarkup(selectedCourse.fullDetails)}
                    />
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
        </Dialog>
      </Transition>
    </section>
  );
}