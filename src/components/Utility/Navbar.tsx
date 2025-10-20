"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  UserIcon,
  UserGroupIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoIosSchool } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetInstitutesQuery } from "@/redux/features/api/institute/instituteApi";
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSiteColor } from "../SiteColorProvider";
import { 
  HomeIcon, 
  InformationCircleIcon, 
  DocumentDuplicateIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  CheckCircleIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "হোম",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "আমাদের সম্পর্কে",
    href: "/about",
    icon: InformationCircleIcon,
    sub: [
      { name: "প্রতিষ্ঠানের সম্পর্কে", href: "/about", icon: BuildingOfficeIcon },
      { name: "নীতিনির্ধারকদের বাণী", href: "/chairman", icon: UserIcon },
      { name: "কমিটি সদস্যবৃন্দ", href: "/committees", icon: UserGroupIcon },
      { name: "শিক্ষকবৃন্দ", href: "/teachers", icon: BookOpenIcon },
    ],
  },
  { 
    name: "নোটিশ", 
    href: "/notice", 
    icon: DocumentDuplicateIcon 
  },
  { 
    name: "ফটো গ্যালারি", 
    href: "/gallery", 
    icon: PhotoIcon 
  },
  { 
    name: "ভিডিও", 
    href: "/video_gallery", 
    icon: VideoCameraIcon 
  },
  { 
    name: "রেজাল্ট", 
    href: "/report-card", 
    icon: CheckCircleIcon 
  },
  { 
    name: "যোগাযোগ", 
    href: "/contact_us", 
    icon: EnvelopeIcon 
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const pathname = usePathname();
  const { data = [], isLoading, error } = useGetInstitutesQuery();
  const color = useSiteColor();

  console.log(color)

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

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-lg">
          {/* Top Info Bar Skeleton */}
          <div className="bg-gradient-to-r from-secondary to-primary h-12 hidden lg:block">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center space-x-4">
                  <Skeleton width={120} height={16} baseColor="#6366f1" highlightColor="#818cf8" />
                  <Skeleton width={80} height={16} baseColor="#6366f1" highlightColor="#818cf8" />
                  <Skeleton width={60} height={16} baseColor="#6366f1" highlightColor="#818cf8" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton circle width={20} height={20} baseColor="#6366f1" highlightColor="#818cf8" />
                  <Skeleton circle width={20} height={20} baseColor="#6366f1" highlightColor="#818cf8" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Skeleton */}
          <nav className="flex items-center max-w-7xl mx-auto justify-between p-3 lg:px-8">
            <div className="flex items-center gap-4">
              <Skeleton circle width={44} height={44} baseColor="#e0e7ff" highlightColor="#c7d2fe" />
              <div className="hidden lg:block">
                <Skeleton width={200} height={20} baseColor="#e0e7ff" highlightColor="#c7d2fe" />
                <Skeleton width={250} height={14} baseColor="#e0e7ff" highlightColor="#c7d2fe" className="mt-1" />
              </div>
            </div>
            <div className="hidden lg:flex lg:gap-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} width={80} height={20} baseColor="#e0e7ff" highlightColor="#c7d2fe" />
              ))}
            </div>
            <div className="lg:hidden">
              <Skeleton width={24} height={24} baseColor="#e0e7ff" highlightColor="#c7d2fe" />
            </div>
          </nav>
        </header>
        <div className="h-[64px]"></div>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 text-center">Failed to load data</p>;

  return (
    <div>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white shadow-lg`}
      >
        {/* Top Info Bar - Hidden on mobile */}
        <div
          className={`bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] transition-all duration-300 hidden lg:block ${
            isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-12 opacity-100"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-4 text-white text-sm">
                <span className="flex gap-1 items-center hover:text-white/70 transition-colors">
                  <IoCall />
                  {data[0]?.institute_mobile}
                </span>
                <span>|</span>
                <Link href="/admission" className="flex gap-1 items-center hover:text-white/70 transition-colors">
                  <IoIosSchool />
                  Admission
                </Link>
                <span>|</span>
                <Link href={data[0]?.institute_management_web} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center hover:text-white/70 transition-colors cursor-pointer">
                  <PiStudentBold />
                  Login
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-white text-sm">
                {data[0]?.institute_fb && (
                  <a href={data[0]?.institute_fb} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                    <FaFacebookF />
                  </a>
                )}
                {data[0]?.institute_youtube && (
                  <a href={data[0]?.institute_youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                    <FaYoutube />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          aria-label="Global"
          className={`flex items-center max-w-7xl mx-auto justify-between p-4 lg:px-8 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-3"
          }`}
        >
          <div className="flex items-center gap-3 lg:gap-4 lg:flex-1">
            <Link href="/" className="flex-shrink-0">
              <span className="sr-only">{data[0]?.institute_name}</span>
              <Image
                src={data[0]?.institute_logo}
                alt={data[0]?.institute_name}
                width={44}
                height={44}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                className="rounded-md"
              />
            </Link>
            <div className="">
              <h1 className="lg:text-lg font-bold text-[var(--color-text)] leading-tight">
                {data[0]?.institute_name}
              </h1>
              {data[0]?.institute_address && <p className="lg:text-xs text-[10px] text-[var(--color-text)] flex items-center gap-1 mt-0.5">
                <MdLocationOn className="text-[var(--color-primary)]]" />
                {data[0]?.institute_address}
              </p>}
            </div>
          </div>

          <div className="flex xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-text)] hover:bg-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Desktop Menu with Icons */}
          <div className="hidden xl:flex flex-wrap lg:gap-x-4">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className={`text-sm/6 font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 px-3 py-2 rounded-md flex items-center gap-1 ${
                      isActive(item.href)
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
                        : ""
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.name}
                    {item.sub && (
                      <svg
                        className="inline h-3 w-3 group-hover:rotate-180 transition-transform duration-200"
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
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 origin-top border border-white">
                      <div className="py-2">
                        {item.sub.map((subItem) => {
                          const SubIconComponent = subItem.icon;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-2 ${
                                isActive(subItem.href)
                                  ? "bg-white text-[var(--color-primary)] font-semibold"
                                  : ""
                              }`}
                            >
                              <SubIconComponent className="w-4 h-4" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu */}
        <Transition show={mobileMenuOpen} as={Fragment} appear>
          <Dialog
            as="div"
            className="relative z-50 xl:hidden"
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
              <div className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            {/* Slide panel */}
            <div className="fixed inset-0 overflow-y-auto">
              <div className="absolute inset-0 overflow-y-auto">
                <div className="pointer-events-none overflow-y-auto fixed inset-y-0 right-0 flex max-w-full">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto w-screen h-fit min-h-screen bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-primary)] ring-1 ring-gray-100/10 transform transition-all duration-300 ease-in-out">
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={data[0]?.institute_logo}
                              alt={data[0]?.institute_name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <div>
                              <h2 className="text-sm font-bold text-white leading-tight">
                                {data[0]?.institute_name}
                              </h2>
                              {data[0]?.institute_address && <p className="text-xs text-white flex items-center gap-1 mt-0.5">
                                <MdLocationOn className="text-xs" />
                                {data[0]?.institute_address}
                              </p>}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                          </button>
                        </div>

                        {/* Navigation Links with Icons */}
                        <div className="flow-root mt-8">
                          <div className="-my-6 divide-y divide-white/10">
                            {navigation.map((item) => {
                              const isExpanded = expandedItems.has(item.name);
                              const parentActive = isActive(item.href);
                              const IconComponent = item.icon;
                              return (
                                <div key={item.name} className="py-2">
                                  {item.sub ? (
                                    <>
                                      <button
                                        onClick={() => toggleExpanded(item.name)}
                                        className={`-mx-3 w-full rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200 text-left flex items-center justify-between ${
                                          parentActive ? "bg-white/10" : ""
                                        }`}
                                      >
                                        <span className="flex items-center gap-2">
                                          <IconComponent className="w-5 h-5" />
                                          {item.name}
                                        </span>
                                        <ChevronDownIcon
                                          className={`h-4 w-4 transition-transform duration-200 ${
                                            isExpanded ? "rotate-180" : ""
                                          }`}
                                        />
                                      </button>
                                      <div
                                        className={`ml-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                                          isExpanded
                                            ? "max-h-96 opacity-100 mt-2"
                                            : "max-h-0 opacity-0"
                                        }`}
                                      >
                                        {item.sub.map((subItem) => {
                                          const SubIconComponent = subItem.icon;
                                          return (
                                            <Link
                                              key={subItem.name}
                                              href={subItem.href}
                                              onClick={handleMobileLinkClick}
                                              className={`-mx-3 block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 ${
                                                isActive(subItem.href)
                                                  ? "bg-white/10 text-white font-semibold"
                                                  : ""
                                              }`}
                                            >
                                              <SubIconComponent className="w-4 h-4" />
                                              {subItem.name}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </>
                                  ) : (
                                    <Link
                                      href={item.href}
                                      onClick={handleMobileLinkClick}
                                      className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 ${
                                        isActive(item.href) ? "bg-white/10" : ""
                                      }`}
                                    >
                                      <IconComponent className="w-5 h-5" />
                                      {item.name}
                                    </Link>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Top Info in Mobile Menu */}
                        <div className="mt-8 border-t border-white/10 pt-6">
                          <div className="space-y-3 text-white">
                            <a href={`tel:${data[0]?.institute_mobile}`} className="flex items-center gap-2 text-sm hover:text-white/70 transition-colors">
                              <IoCall className="text-white w-5 h-5" />
                              <span>{data[0]?.institute_mobile}</span>
                            </a>
                            <Link href="/admission" onClick={handleMobileLinkClick} className="flex items-center gap-2 text-sm hover:text-white/70 transition-colors">
                              <IoIosSchool className="text-white w-5 h-5" />
                              <span>Admission</span>
                            </Link>
                            <a href={data[0]?.institute_management_web} target="_blank" className="flex items-center gap-2 text-sm hover:text-white/70 transition-colors">
                              <PiStudentBold className="text-white w-5 h-5" />
                              <span>Login</span>
                            </a>
                          </div>

                          {/* Social Icons in Mobile Menu */}
                          <div className="flex items-center gap-4 mt-5">
                            {data[0]?.institute_fb && (
                              <a
                                href={data[0]?.institute_fb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/70 transition-colors duration-200"
                              >
                                <FaFacebookF />
                              </a>
                            )}
                            {data[0]?.institute_youtube && (
                              <a
                                href={data[0]?.institute_youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/70 transition-colors duration-200"
                              >
                                <FaYoutube />
                              </a>
                            )}
                          </div>
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