"use client";

import { useGetContactInfoQuery, useSendContactMessageMutation } from "@/redux/features/api/contact/contactApi";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface FormData {
  name: string;
  phone_number: string;
  email: string;
  subject: string;
  msg: string;
}

export default function ContactUs() {
  const { data = [], isLoading } = useGetContactInfoQuery();
  const [sendMessage, { isLoading: isSending, isSuccess, isError, error }] =
    useSendContactMessageMutation();

  const contact = data?.[0];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone_number: "",
    email: "",
    subject: "",
    msg: "",
  });

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendMessage(formData).unwrap();
      setAlert({ type: "success", message: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!" });
      setFormData({ name: "", phone_number: "", email: "", subject: "", msg: "" });
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err?.data?.message || "বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    }
    // Auto-dismiss alert after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Custom Alert */}
      {alert && (
        <div
          className={`fixed top-4 right-4 z-50 p-5 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
            alert.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } animate-slide-in`}
        >
          <div className="flex items-center gap-3">
            {alert.type === "success" ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
          <button
            onClick={() => setAlert(null)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            <span className="text-indigo-600">যোগাযোগ</span> করুন
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Contact Info (Email, Mobile, Address) */}
        <div className="p-6 rounded-2xl shadow-lg mb-8">
          {isLoading ? (
            <Skeleton height={120} className="rounded-2xl" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <svg
                  className="w-8 h-8 text-indigo-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-700">ইমেইল</p>
                  <p className="text-gray-600">{contact?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  className="w-8 h-8 text-indigo-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-700">মোবাইল</p>
                  <p className="text-gray-600">{contact?.mobile || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  className="w-8 h-8 text-indigo-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-700">ঠিকানা</p>
                  <p className="text-gray-600">{contact?.office_address || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map and Image Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 items-center justify-between">
          {/* Google Map */}
          <div className="p-6 rounded-2xl transition-shadow duration-300">
            {isLoading ? (
              <Skeleton height={300} className="rounded-2xl" />
            ) : (
              contact?.google_map && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={contact.google_map}
                    className="w-full h-64 sm:h-80 lg:h-96 border-0"
                    loading="lazy"
                    title="Location Map"
                  ></iframe>
                </div>
              )
            )}
          </div>

          {/* Institute Image */}
          <div className="p-6 rounded-2xl transition-shadow mx-auto duration-300">
            {isLoading ? (
              <Skeleton height={300} className="rounded-2xl" />
            ) : (
              contact?.image && (
                <div className="relative w-full mx-auto h-[350px] rounded-2xl">
                  <Image
                    src={contact.image}
                    alt="Institute Image"
                    width={350}
                    height={350}
                    className="object-cover w-fit h-[350px]"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Contact Form - Now at the bottom */}
        <div className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            আমাদের একটি বার্তা পাঠান
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                নাম
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="আপনার নাম লিখুন"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2">
                ফোন নাম্বার
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="আপনার ফোন নাম্বার লিখুন"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                বিষয়
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="বিষয় লিখুন"
                value={formData.subject}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="msg" className="block text-sm font-semibold text-gray-700 mb-2">
                বার্তা
              </label>
              <textarea
                id="msg"
                name="msg"
                placeholder="আপনার বার্তা লিখুন..."
                value={formData.msg}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg w-full h-36 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSending}
                className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full md:w-auto ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSending ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for slide-in animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}