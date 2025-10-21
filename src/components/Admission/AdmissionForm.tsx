"use client";

import React, { useState } from "react";
import { useCreateOnlineAdmissionMutation, useGetAdmissionYearsQuery, useGetBatchesQuery, useGetStudentClassesQuery } from "@/redux/features/api/admission/admissionApi";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  note: string;
  agreeTerms: boolean;
}

export default function AdmissionForm() {
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
    note: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, avatar: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setAlert({ type: "error", message: "Please agree to the Terms and Conditions." });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "avatar" && value) {
        formDataToSend.append("avatar", value);
      } else if (key !== "avatar") {
        formDataToSend.append(key, value);
      }
    });

    try {
      await createAdmission(formDataToSend).unwrap();
      setAlert({ type: "success", message: "Admission submitted successfully!" });
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
        note: "",
        agreeTerms: false,
      });
      setPhotoPreview(null);
      setTimeout(() => setAlert(null), 5000);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to submit admission. Please try again." });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Custom Alert */}
        {alert && (
          <div
            className={`fixed top-1 right-1 z-50 p-5 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
              alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            } animate-slide-in`}
          >
            <div className="flex items-center gap-3">
              {alert.type === "success" ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
            <button
              onClick={() => setAlert(null)}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8 text-[var(--color-text)]">
          অনলাইন <span className="text-[var(--color-primary)]">ভর্তি ফর্ম</span>
          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-2"></div>
        </h2>

        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ব্যক্তিগত তথ্য</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">জন্ম তারিখ</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ</label>
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="" disabled hidden>নির্বাচন করুন</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">বর্তমান ঠিকানা</label>
                  <input
                    type="text"
                    name="present_address"
                    value={formData.present_address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">স্থায়ী ঠিকানা</label>
                  <input
                    type="text"
                    name="permanent_address"
                    value={formData.permanent_address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">অতিরিক্ত তথ্য</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">গ্রাম</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পোস্ট অফিস</label>
                  <input
                    type="text"
                    name="post_office"
                    value={formData.post_office}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">থানা/উপজেলা</label>
                  <input
                    type="text"
                    name="ps_or_upazilla"
                    value={formData.ps_or_upazilla}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের নাম</label>
                  <input
                    type="text"
                    name="institute_name"
                    value={formData.institute_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ভর্তির তারিখ</label>
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

            {/* Guardian and Parent Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">অভিভাবক ও পিতা-মাতার তথ্য</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">পিতার নাম</label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পিতার মোবাইল</label>
                  <input
                    type="tel"
                    name="father_mobile_no"
                    value={formData.father_mobile_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">মায়ের নাম</label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">মায়ের মোবাইল</label>
                  <input
                    type="tel"
                    name="mother_mobile_no"
                    value={formData.mother_mobile_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">সম্পর্ক</label>
                  <input
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পিতার পেশা</label>
                  <input
                    type="text"
                    name="f_occupation"
                    value={formData.f_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">মায়ের পেশা</label>
                  <input
                    type="text"
                    name="m_occupation"
                    value={formData.m_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">অভিভাবকের পেশা</label>
                  <input
                    type="text"
                    name="g_occupation"
                    value={formData.g_occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পিতার NID</label>
                  <input
                    type="text"
                    name="f_nid"
                    value={formData.f_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">মায়ের NID</label>
                  <input
                    type="text"
                    name="m_nid"
                    value={formData.m_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">অভিভাবকের NID</label>
                  <input
                    type="text"
                    name="g_nid"
                    value={formData.g_nid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Admission Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ভর্তির তথ্য</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ভর্তির বছর <span className="text-red-600">*</span>
                  </label>
                  {years.length === 0 ? (
                    <Skeleton height={40} />
                  ) : (
                    <select
                      name="admission_year_id"
                      value={formData.admission_year_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      required
                    >
                      <option value="" disabled hidden>নির্বাচন করুন</option>
                      {years.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ক্লাস <span className="text-red-600">*</span>
                  </label>
                  {classes.length === 0 ? (
                    <Skeleton height={40} />
                  ) : (
                    <select
                      name="class_id"
                      value={formData.class_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      required
                    >
                      <option value="" disabled hidden>নির্বাচন করুন</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ব্যাচ <span className="text-red-600">*</span>
                  </label>
                  {batches.length === 0 ? (
                    <Skeleton height={40} />
                  ) : (
                    <select
                      name="batch_id"
                      value={formData.batch_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      required
                    >
                      <option value="" disabled hidden>নির্বাচন করুন</option>
                      {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </section>

            {/* Photo Upload */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ছবি আপলোড</h3>
              <div className="flex items-center gap-6">
                <div className="sm:w-32 min-w-24 sm:h-32 h-24 relative">
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Preview" fill className="rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
              </div>
            </section>

            {/* Notes */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">নোট</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অতিরিক্ত মন্তব্য</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  rows={4}
                />
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
                className={`bg-[var(--color-secondary)] text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md hover:shadow-lg ${
                  isSubmitting || !formData.agreeTerms
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[var(--color-primary)]"
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
