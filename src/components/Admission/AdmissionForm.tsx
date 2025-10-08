"use client"

import React, { useState } from 'react';
import { Eye, EyeOff, Phone } from 'lucide-react';

export default function AdmissionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullNameBangla: '',
    fullNameEnglish: '',
    fatherName: '',
    motherName: '',
    birthCertificate: '',
    nidNumber: '',
    dateOfBirth: '',
    photo: null,
    mobileNumber: '',
    guardianMobile: '',
    sscInstitute: '',
    sscBoard: '',
    sscGroup: '',
    sscYear: '',
    sscDivision: '',
    sscGPA: '',
    sscRoll: '',
    sscReg: '',
    hscInstitute: '',
    hscBoard: '',
    hscGroup: '',
    hscYear: '',
    hscDivision: '',
    hscGPA: '',
    hscRoll: '',
    hscReg: '',
    admissionBatch: '',
    desiredCourse: '',
    classTime: '',
    timeSlot: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e : any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 lg:flex gap-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 inline-block pb-1">
              ভর্তি ফরম
            </h1>
            <p className="text-green-700 translate-y-[-5px] font-semibold lg:mt-0 mt-5  md:text-3xl flex items-center gap-1">
              (Online Admission Helpline: <span className='text-nowrap flex items-center gap-2'><Phone className="w-4 h-4" /> 013 3252 3959</span>)
            </p>
          </div>
          <hr className='my-3 border border-gray-300' />

          <div className="space-y-6">
            {/* Personal Information */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ছাত্র-ছাত্রীর পূর্ণ নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullNameBangla"
                    placeholder="e.g. পূর্ণ নাম"
                    value={formData.fullNameBangla}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পূর্ণ নাম (ইংরেজিতে বড় আকারে) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullNameEnglish"
                    placeholder="E.G. YOUR FULL NAME"
                    value={formData.fullNameEnglish}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পিতার নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাতার নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জন্মনিবন্ধন নম্বর <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="birthCertificate"
                    value={formData.birthCertificate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জাতীয় পরিচয়পত্র <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="nidNumber"
                    value={formData.nidNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জন্ম তারিখ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="mm/dd/yyyy"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum upload file size: 12 MB</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    শিক্ষার্থীর মোবাইল নং <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="e.g. +8801711111111 / +০১৭০০০০০০০০০০"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিভাবকের মোবাইল নং <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="guardianMobile"
                    placeholder="e.g. +8801711111111 / +০১৭০০০০০০০০০০"
                    value={formData.guardianMobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* SSC Section */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Educational Qualification:</h2>
              <h3 className="text-md font-semibold text-gray-700 mb-4">এস.এস.সি:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    শিক্ষা প্রতিষ্ঠানের নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="sscInstitute"
                    value={formData.sscInstitute}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বোর্ড <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="sscBoard"
                    value={formData.sscBoard}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="chittagong">চট্টগ্রাম</option>
                    <option value="rajshahi">রাজশাহী</option>
                    <option value="sylhet">সিলেট</option>
                    <option value="barisal">বরিশাল</option>
                    <option value="comilla">কুমিল্লা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    গ্রুপ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="sscGroup"
                    value={formData.sscGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="science">বিজ্ঞান</option>
                    <option value="arts">মানবিক</option>
                    <option value="commerce">ব্যবসায়</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সাল <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="sscYear"
                    value={formData.sscYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="2024">২০২৪</option>
                    <option value="2023">২০২৩</option>
                    <option value="2022">২০২২</option>
                    <option value="2021">২০২১</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রাপ্ত বিভাগ (বোর্ড বিষয়ক) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="sscDivision"
                    value={formData.sscDivision}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রাপ্ত জিপিএ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="sscGPA"
                    value={formData.sscGPA}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="5.0">৫.০০</option>
                    <option value="4.5">৪.৫০</option>
                    <option value="4.0">৪.০০</option>
                    <option value="3.5">৩.৫০</option>
                    <option value="3.0">৩.০০</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রোল নং <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="sscRoll"
                    value={formData.sscRoll}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রেজি: নং (এস.এস.সি:) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="sscReg"
                    value={formData.sscReg}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* HSC Section */}
            <section>
              <h3 className="text-md font-semibold text-gray-700 mb-4">এইচ.এস.সি:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    শিক্ষা প্রতিষ্ঠানের নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="hscInstitute"
                    value={formData.hscInstitute}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বোর্ড
                  </label>
                  <select
                    name="hscBoard"
                    value={formData.hscBoard}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="chittagong">চট্টগ্রাম</option>
                    <option value="rajshahi">রাজশাহী</option>
                    <option value="sylhet">সিলেট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    গ্রুপ <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="hscGroup"
                    value={formData.hscGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="science">বিজ্ঞান</option>
                    <option value="arts">মানবিক</option>
                    <option value="commerce">ব্যবসায়</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সাল <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="hscYear"
                    value={formData.hscYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="2025">২০২৫</option>
                    <option value="2024">২০২৪</option>
                    <option value="2023">২০২৩</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রাপ্ত বিভাগ (বোর্ড বিষয়ক) (Optional)
                  </label>
                  <input
                    type="text"
                    name="hscDivision"
                    value={formData.hscDivision}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রাপ্ত জিপিএ (Optional)
                  </label>
                  <select
                    name="hscGPA"
                    value={formData.hscGPA}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="5.0">৫.০০</option>
                    <option value="4.5">৪.৫০</option>
                    <option value="4.0">৪.০০</option>
                    <option value="3.5">৩.৫০</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রোল নং <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="hscRoll"
                    value={formData.hscRoll}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রেজি: নং (এইচ.এস.সি:)
                  </label>
                  <input
                    type="text"
                    name="hscReg"
                    value={formData.hscReg}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Course Selection */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Student Account Information & Course Select:</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ভর্তিচ্ছু ব্যাচ (নির্বাচন করুন) <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="admissionBatch"
                    value={formData.admissionBatch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="batch1">ব্যাচ ১</option>
                    <option value="batch2">ব্যাচ ২</option>
                    <option value="batch3">ব্যাচ ৩</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পদানুসুহু (নির্বাচন করুন) <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="desiredCourse"
                    value={formData.desiredCourse}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="engineering">ইঞ্জিনিয়ারিং</option>
                    <option value="medical">মেডিকেল</option>
                    <option value="university">বিশ্ববিদ্যালয়</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ক্লাস নির্বাচন করুন <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="classTime"
                    value={formData.classTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select</option>
                    <option value="morning">সকাল ব্যাচ</option>
                    <option value="afternoon">দুপুর ব্যাচ</option>
                    <option value="evening">বিকাল ব্যাচ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সময় নির্বাচন করুন <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="">2-30 PM to 4-30 PM</option>
                    <option value="8-12">সকাল ৮টা - ১২টা</option>
                    <option value="2-4">দুপুর ২:৩০ - ৪:৩০</option>
                    <option value="5-7">বিকাল ৫টা - ৭টা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (This email is your username) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g: example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
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
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  Agree to our Terms and Conditions
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}