
"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  useCreateOnlineAdmissionMutation,
  useGetAdmissionYearsQuery,
  useGetBatchesQuery,
  useGetStudentClassesQuery,
} from "@/redux/features/api/admission/admissionApi";
import Image from "next/image";

interface FormData {
  name: string;
  name_in_bangla: string;
  phone_number: string;
  gender: "Male" | "Female" | "Other" | "";
  dob: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";
  email: string;
  present_address: string;
  permanent_address: string;
  admission_year_id: string;
  class_id: string;
  batch_id: string;
  roll_no: string;
  institute_name: string;
  admission_date: string;
  village: string;
  post_office: string;
  ps_or_upazilla: string;
  district: string;
  g_name: string;
  g_mobile_no: string;
  father_name: string;
  father_mobile_no: string;
  mother_name: string;
  mother_mobile_no: string;
  relation: string;
  f_occupation: string;
  m_occupation: string;
  g_occupation: string;
  f_nid: string;
  m_nid: string;
  g_nid: string;
  avatar: File | null;
  password: string;
  agreeTerms: boolean;
}

export default function AdmissionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const { data: years = [] } = useGetAdmissionYearsQuery();
  const { data: classes = [] } = useGetStudentClassesQuery();
  const { data: batches = [] } = useGetBatchesQuery();
  const [createAdmission, { isLoading: isSubmitting }] = useCreateOnlineAdmissionMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    name_in_bangla: "",
    phone_number: "",
    gender: "",
    dob: "",
    blood_group: "",
    email: "",
    present_address: "",
    permanent_address: "",
    admission_year_id: "",
    class_id: "",
    batch_id: "",
    roll_no: "",
    institute_name: "",
    admission_date: "",
    village: "",
    post_office: "",
    ps_or_upazilla: "",
    district: "",
    g_name: "",
    g_mobile_no: "",
    father_name: "",
    father_mobile_no: "",
    mother_name: "",
    mother_mobile_no: "",
    relation: "",
    f_occupation: "",
    m_occupation: "",
    g_occupation: "",
    f_nid: "",
    m_nid: "",
    g_nid: "",
    avatar: null,
    password: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: target.type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setAlert({ type: "error", message: "শর্তাবলীতে সম্মতি দিন।" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("name_in_bangla", formData.name_in_bangla);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("blood_group", formData.blood_group);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("present_address", formData.present_address);
      formDataToSend.append("permanent_address", formData.permanent_address);
      formDataToSend.append("admission_year_id", formData.admission_year_id);
      formDataToSend.append("class_id", formData.class_id);
      formDataToSend.append("batch_id", formData.batch_id);
      formDataToSend.append("roll_no", formData.roll_no);
      formDataToSend.append("institute_name", formData.institute_name);
      formDataToSend.append("admission_date", formData.admission_date);
      formDataToSend.append("village", formData.village);
      formDataToSend.append("post_office", formData.post_office);
      formDataToSend.append("ps_or_upazilla", formData.ps_or_upazilla);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("g_name", formData.g_name);
      formDataToSend.append("g_mobile_no", formData.g_mobile_no);
      formDataToSend.append("father_name", formData.father_name);
      formDataToSend.append("father_mobile_no", formData.father_mobile_no);
      formDataToSend.append("mother_name", formData.mother_name);
      formDataToSend.append("mother_mobile_no", formData.mother_mobile_no);
      formDataToSend.append("relation", formData.relation);
      formDataToSend.append("f_occupation", formData.f_occupation);
      formDataToSend.append("m_occupation", formData.m_occupation);
      formDataToSend.append("g_occupation", formData.g_occupation);
      formDataToSend.append("f_nid", formData.f_nid);
      formDataToSend.append("m_nid", formData.m_nid);
      formDataToSend.append("g_nid", formData.g_nid);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      formDataToSend.append("password", formData.password);
      formDataToSend.append("status", "Hold");

      await createAdmission(formDataToSend as any).unwrap();
      setAlert({ type: "success", message: "ভর্তি ফরম সফলভাবে জমা দেওয়া হয়েছে!" });
      setFormData({
        name: "",
        name_in_bangla: "",
        phone_number: "",
        gender: "",
        dob: "",
        blood_group: "",
        email: "",
        present_address: "",
        permanent_address: "",
        admission_year_id: "",
        class_id: "",
        batch_id: "",
        roll_no: "",
        institute_name: "",
        admission_date: "",
        village: "",
        post_office: "",
        ps_or_upazilla: "",
        district: "",
        g_name: "",
        g_mobile_no: "",
        father_name: "",
        father_mobile_no: "",
        mother_name: "",
        mother_mobile_no: "",
        relation: "",
        f_occupation: "",
        m_occupation: "",
        g_occupation: "",
        f_nid: "",
        m_nid: "",
        g_nid: "",
        avatar: null,
        password: "",
        agreeTerms: false,
      });
      setPhotoPreview(null);
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err?.data?.message || "ভর্তি ফরম জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
      setTimeout(() => setAlert(null), 5000);
    }
          setTimeout(() => setAlert(null), 5000);

  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 md:p-8">
          {/* Custom Alert */}
          {alert && (
            <div
              className={`fixed top-1 right-1 z-50 p-5 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
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

          {/* Header */}
          <div className="mb-6 lg:flex gap-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 inline-block pb-1">
              ভর্তি ফরম
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              আপনার তথ্য সঠিকভাবে পূরণ করুন। প্রয়োজনীয় ফিল্ডগুলোতে * চিহ্ন দেওয়া আছে।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            {/* Personal Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                ব্যক্তিগত তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পুরো নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name_in_bangla"
                    value={formData.name_in_bangla}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পুরো নাম (ইংরেজিতে) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    লিঙ্গ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    <option value="Male">পুরুষ</option>
                    <option value="Female">মহিলা</option>
                    <option value="Other">অন্যান্য</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রক্তের গ্রুপ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    <option value="A+">A+</option>
                    <option value="A- ">A-</option>
                    <option value="B+">B+</option>
                    <option value="B- ">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB- ">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O- ">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জন্ম তারিখ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মোবাইল নম্বর <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পাসওয়ার্ড <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বর্তমান ঠিকানা <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="present_address"
                    value={formData.present_address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    স্থায়ী ঠিকানা <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="permanent_address"
                    value={formData.permanent_address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    গ্রাম
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পোস্ট অফিস
                  </label>
                  <input
                    type="text"
                    name="post_office"
                    value={formData.post_office}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    থানা/উপজেলা
                  </label>
                  <input
                    type="text"
                    name="ps_or_upazilla"
                    value={formData.ps_or_upazilla}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জেলা
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ছবি আপলোড করুন <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                  {photoPreview && (
                    <div className="mt-4">
                      <Image
                        src={photoPreview}
                        alt="Photo Preview"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Guardian Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                অভিভাবকের তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিভাবকের নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="g_name"
                    value={formData.g_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিভাবকের মোবাইল <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="g_mobile_no"
                    value={formData.g_mobile_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সম্পর্ক <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিভাবকের পেশা
                  </label>
                  <input
                    type="text"
                    name="g_occupation"
                    value={formData.g_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিভাবকের NID
                  </label>
                  <input
                    type="text"
                    name="g_nid"
                    value={formData.g_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার মোবাইল
                  </label>
                  <input
                    type="tel"
                    name="father_mobile_no"
                    value={formData.father_mobile_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার পেশা
                  </label>
                  <input
                    type="text"
                    name="f_occupation"
                    value={formData.f_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার NID
                  </label>
                  <input
                    type="text"
                    name="f_nid"
                    value={formData.f_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার মোবাইল
                  </label>
                  <input
                    type="tel"
                    name="mother_mobile_no"
                    value={formData.mother_mobile_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার পেশা
                  </label>
                  <input
                    type="text"
                    name="m_occupation"
                    value={formData.m_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার NID
                  </label>
                  <input
                    type="text"
                    name="m_nid"
                    value={formData.m_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                শিক্ষাগত তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ভর্তির বছর <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="admission_year_id"
                    value={formData.admission_year_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    {years.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ক্লাস <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="class_id"
                    value={formData.class_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ব্যাচ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="batch_id"
                    value={formData.batch_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    {batches.map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রোল নম্বর
                  </label>
                  <input
                    type="number"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রতিষ্ঠানের নাম
                  </label>
                  <input
                    type="text"
                    name="institute_name"
                    value={formData.institute_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ভর্তির তারিখ
                  </label>
                  <input
                    type="date"
                    name="admission_date"
                    value={formData.admission_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Terms and Submit */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Agree to our Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeTerms}
                className={`bg-indigo-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md hover:shadow-lg ${
                  isSubmitting || !formData.agreeTerms
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? "জমা হচ্ছে..." : "জমা দিন"}
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
    </div>
  );
}
