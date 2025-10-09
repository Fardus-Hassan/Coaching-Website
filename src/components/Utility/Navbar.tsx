"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoIosSchool } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetInstitutesQuery } from "@/redux/features/api/institute/instituteApi";
import Image from "next/image";

const navigation = [
  {
    name: "হোম",
    href: "/",
  },
  {
    name: "আমাদের সম্পর্কে",
    href: "/about",
    sub: [
      { name: "UCC সম্পর্কে", href: "/about" },
      { name: "চেয়ারম্যানের বার্তা", href: "/chairman" },
    ],
  },
  { name: "নোটিশ", href: "/notice" },
  { name: "ফটো গ্যালারি", href: "/gallery" },
  { name: "ভিডিও", href: "/video_gallery" },
  // { name: "বই", href: "/books" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const pathname = usePathname();
  const { data = [], isLoading, error } = useGetInstitutesQuery();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const isActive = (href: string) => pathname === href;

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center">Failed to load data</p>;

  return (
    <div>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-lg`}
      >
        {/* Top Info Bar - Hidden on mobile */}
        <div
          className={`bg-gradient-to-r from-indigo-500 to-indigo-900 transition-all duration-300 hidden lg:block ${
            isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-12 opacity-100"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-4 text-white text-sm">
                <span className="flex gap-1 items-center">
                  <IoCall />
                  {data[0]?.institute_mobile}
                </span>
                <span>|</span>
                <Link href="/admission" className="flex gap-1 items-center">
                  <IoIosSchool />
                  Admission
                </Link>
                <span>|</span>
                <span className="flex gap-1 items-center">
                  <PiStudentBold />
                  Login
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white text-sm">
                <a href={data[0]?.institute_fb} target="_blank">
                  <FaFacebookF />
                </a>
                {/* <span>
                  <FaInstagram />
                </span> */}
                <a href={data[0]?.institute_youtube} target="_blank">
                  <FaYoutube />
                </a>
                {/* <span>
                  <FaLinkedinIn />
                </span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          aria-label="Global"
          className={`flex items-center max-w-7xl mx-auto justify-between p-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "py-4" : "py-4"
          }`}
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src={data[0].institute_logo}
                alt={data[0].institute_name}
                width={44}
                height={44}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="mx-auto rounded-md"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  className={`text-sm/6 text-gray-900 hover:text-gray-500 transition-colors duration-200 p-2 rounded-md ${
                    isActive(item.href)
                      ? "bg-indigo-500/10 text-gray-900 font-bold"
                      : ""
                  }`}
                >
                  {item.name}
                  {item.sub && (
                    <svg
                      className="ml-1 inline h-3 w-3 group-hover:rotate-180 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {item.sub && (
                  <div className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 origin-top">
                    <div className="py-1">
                      {item.sub.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 text-sm text-gray-900 hover:bg-indigo-800/10 transition-colors duration-200 ${
                            isActive(subItem.href)
                              ? "bg-indigo-800/10 font-bold"
                              : ""
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Menu with Top Info */}
        <Transition show={mobileMenuOpen} as={Fragment} appear>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            {/* Backdrop */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" />
            </Transition.Child>

            {/* Slide panel */}
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto p-6 w-screen bg-gradient-to-b from-indigo-500 to-indigo-900 ring-1 ring-gray-100/10 transform transition-all duration-300 ease-in-out">
                      <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                          <span className="sr-only">Your Company</span>
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                          />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>

                      {/* Navigation Links */}
                      <div className="flow-root mt-10">
                        <div className="-my-6 divide-y divide-white/10">
                          {navigation.map((item) => {
                            const isExpanded = expandedItems.has(item.name);
                            const parentActive = isActive(item.href);
                            return (
                              <div key={item.name} className="py-2">
                                {item.sub ? (
                                  <>
                                    <button
                                      onClick={() => toggleExpanded(item.name)}
                                      className={`-mx-3 w-full rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10 transition-colors duration-200 text-left flex items-center justify-between ${
                                        parentActive ? "bg-white/10" : ""
                                      }`}
                                    >
                                      <span>{item.name}</span>
                                      <ChevronDownIcon
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                          isExpanded ? "rotate-180" : ""
                                        }`}
                                      />
                                    </button>
                                    <div
                                      className={`ml-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                                        isExpanded
                                          ? "max-h-96 opacity-100"
                                          : "h-0 opacity-0"
                                      }`}
                                    >
                                      {item.sub.map((subItem) => (
                                        <Link
                                          key={subItem.name}
                                          href={subItem.href}
                                          className={`-mx-3 block rounded-lg px-3 py-1 text-sm text-white/80 hover:bg-white/10 transition-colors duration-200 ${
                                            isActive(subItem.href)
                                              ? "bg-white/10 text-white"
                                              : ""
                                          }`}
                                        >
                                          {subItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10 transition-colors duration-200 ${
                                      isActive(item.href) ? "bg-white/10" : ""
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </div>
                            );
                          })}
                          <div className="py-6">
                            <Link
                              href="#"
                              className="-mx-3 block rounded-lg px-3 text-base/7 font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              Log in
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* Top Info in Mobile Menu */}
                      <div className="mt-6 border-t border-white/10 pt-6">
                        <div className="space-y-4 text-white">
                          <div className="flex items-center gap-2 text-sm">
                            <IoCall className="text-white" />
                            <span>+88 01847-066362-66</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <IoIosSchool className="text-white" />
                            <span>Admission</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <PiStudentBold className="text-white" />
                            <span>Student Login</span>
                          </div>
                        </div>

                        {/* Social Icons in Mobile Menu */}
                        <div className="flex items-center gap-4 mt-5">
                          <a
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors duration-200"
                          >
                            <FaFacebookF />
                          </a>
                          <a
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors duration-200"
                          >
                            <FaInstagram />
                          </a>
                          <a
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors duration-200"
                          >
                            <FaYoutube />
                          </a>
                          <a
                            href="#"
                            className="text-white hover:text-gray-300 transition-colors duration-200"
                          >
                            <FaLinkedinIn />
                          </a>
                        </div>
                      </div>
                    </DialogPanel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </header>
      <div className="h-[64px]"></div>
    </div>
  );
}
