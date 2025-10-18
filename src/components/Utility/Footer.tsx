"use client";

import { useState, Fragment } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoIosSchool } from "react-icons/io";
import Link from "next/link";
import { useGetInfoBlocksQuery } from "@/redux/features/api/infoBlock/infoBlockApi";
import { useGetInstitutesQuery } from "@/redux/features/api/institute/instituteApi";
import { useGetProgramsQuery } from "@/redux/features/api/program/programApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "হোম", href: "/" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "নোটিশ", href: "/notice" },
  { name: "ফটো গ্যালারি", href: "/gallery" },
  { name: "ভিডিও", href: "/video_gallery" },
  { name: "যোগাযোগ", href: "/contact_us" },
];

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

interface Program {
  id: number;
  title: string;
  long_description: string;
}

export default function Footer() {
  const { data: infoBlocks = [], isLoading: isInfoLoading, error: infoError } = useGetInfoBlocksQuery();
  const { data: institutes = [], isLoading: isInstituteLoading, error: instituteError } = useGetInstitutesQuery();
  const { data: programs = [], isLoading: isProgramsLoading, error: programsError } = useGetProgramsQuery();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Use first institute's data with fallbacks
  const institute = institutes[0] || {
    institute_logo: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500",
    institute_mobile: "+88 01847-066362-66",
    institute_email_address: "info@edutech.com",
    institute_address: "Dhaka, Bangladesh",
    institute_management_web: "/login",
  };

  // Use first info block's footer_text with fallback
  const footerText = infoBlocks[0]?.footer_text || "Empowering the future through innovative education solutions. Join thousands of students transforming their careers with our cutting-edge platform.";

  return (
    <footer className="text-white bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-24 h-24 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 -right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              {isInstituteLoading ? (
                <Skeleton circle height={32} width={32} baseColor="#4a5568" highlightColor="#a0aec0" />
              ) : instituteError ? (
                <img
                  alt="Fallback Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              ) : (
                <img
                  alt="Institute Logo"
                  src={institute.institute_logo}
                  className="h-8 w-auto"
                />
              )}
              <span className="text-xl font-bold text-white">{institute?.institute_name}</span>
            </div>
            {isInfoLoading ? (
              <Skeleton height={16} count={3} baseColor="#4a5568" highlightColor="#a0aec0" />
            ) : infoError ? (
              <p className="text-indigo-200 text-sm leading-relaxed">
                Empowering the future through innovative education solutions.
              </p>
            ) : (
              <p className="text-indigo-200 text-sm leading-relaxed">{footerText}</p>
            )}
            <div className="flex space-x-4">
              <a href={institute?.institute_fb} target="_blank" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href={institute?.institute_youtube} target="_blank" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110">
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">নেভিগেশন</h3>
            <ul className="space-y-2 text-indigo-200">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">প্রোগ্রাম</h3>
            {isProgramsLoading ? (
              <Skeleton height={16} count={3} baseColor="#4a5568" highlightColor="#a0aec0" />
            ) : programsError ? (
              <p className="text-indigo-200 text-sm">প্রোগ্রাম লোড করতে ব্যর্থ।</p>
            ) : (
              <ul className="space-y-2 text-indigo-200">
                {programs.map((program: Program) => (
                  <li key={program.id}>
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                      {program.title.slice(0, 10)}...
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">যোগাযোগ</h3>
            {isInstituteLoading ? (
              <Skeleton height={16} count={3} baseColor="#4a5568" highlightColor="#a0aec0" />
            ) : instituteError ? (
              <div className="space-y-3 text-indigo-200">
                <div className="flex items-center gap-3">
                  <FaPhone className="h-5 w-5 text-indigo-400" />
                  <span>+88 01847-066362-66</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="h-5 w-5 text-indigo-400" />
                  <span>info@edutech.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="h-5 w-5 text-indigo-400" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-indigo-200">
                <div className="flex items-center gap-3">
                  <FaPhone className="h-5 w-5 text-indigo-400" />
                  <span>{institute.institute_mobile}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="h-5 w-5 text-indigo-400" />
                  <span>{institute.institute_email_address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="h-5 w-5 text-indigo-400" />
                  <span>{institute.institute_address}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/admission" className="flex items-center gap-2 text-sm text-indigo-300">
                <IoIosSchool /> Admission
              </Link>
              <Link href={institute.institute_management_web} className="flex items-center gap-2 text-sm text-indigo-300">
                <PiStudentBold /> Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-800 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-indigo-300">
              &copy; 2025 {institute?.institute_name}. All rights reserved. Built with ❤️ for education.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Program Details */}
      <Transition appear show={!!selectedProgram} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedProgram(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[100vh]">
                  <div className="flex items-start justify-between mb-4 border-b pb-3">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedProgram?.title} - বিস্তারিত
                    </DialogTitle>
                    <button
                      onClick={() => setSelectedProgram(null)}
                      className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-7 w-7" />
                    </button>
                  </div>

                  {selectedProgram && (
                    <div className="space-y-4 text-gray-700 leading-relaxed overflow-y-auto max-h-[calc(90vh-180px)]">
                      <div
                        className="prose prose-sm lg:prose-base max-w-none bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                        dangerouslySetInnerHTML={createMarkup(selectedProgram.long_description)}
                      />
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t flex justify-end">
                    <button
                      onClick={() => setSelectedProgram(null)}
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
    </footer>
  );
}
