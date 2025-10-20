"use client";

import { useState } from "react";
import Select from 'react-select';
import { useDownloadReportCardMutation, useGetExamsQuery } from "@/redux/features/api/exam/examApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Alert {
  type: "success" | "error";
  message: string;
}

interface ExamOption {
  value: number;
  label: string;
}

export default function ReportCard() {
  const [studentId, setStudentId] = useState("");
  const [selectedExam, setSelectedExam] = useState<ExamOption | null>(null);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [alert, setAlert] = useState<Alert | null>(null);

  const { data: exams = [], isLoading: isExamsLoading, error: examsError } = useGetExamsQuery();
  const [downloadReportCard, { isLoading: isReportLoading }] = useDownloadReportCardMutation();

  const examOptions: ExamOption[] = exams.map(exam => ({
    value: exam.id,
    label: `${exam.name} (${exam.date})`
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !selectedExam) {
      setAlert({ type: "error", message: "Please enter a valid Student ID and select an exam." });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const blob = await downloadReportCard({ 
        student_id: studentId, 
        exam_id: selectedExam.value 
      }).unwrap();
      
      const url = URL.createObjectURL(blob);
      setReportUrl(url);
      setAlert({ type: "success", message: "Report card loaded successfully!" });
      setTimeout(() => setAlert(null), 5000);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to load report card. Please try again." });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleDownload = () => {
    if (reportUrl && selectedExam) {
      const link = document.createElement("a");
      link.href = reportUrl;
      link.download = `report_card_${studentId}_${selectedExam.value}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setAlert({ type: "success", message: "Report card downloaded successfully!" });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: "#d1d5db",
      "&:hover": { borderColor: "#d1d5db" },
      "&:focus-within": {
        borderColor: "var(--color-primary)",
        boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
      },
      minHeight: "40px",
      borderRadius: "0.375rem",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--color-primary)"
        : state.isFocused
        ? "#eef2ff"
        : "white",
      color: state.isSelected ? "white" : "#1f2937",
      cursor: "pointer",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.375rem",
      zIndex: 50,
    }),
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Custom Alert */}
        {alert && (
          <div
            className={`fixed top-1 right-1 z-50 p-5 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
              alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            } animate-slide-in`}
          >
            <div className="flex items-center gap-3">
              {alert.type === "success" ? (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--color-text)] mb-2">
          রেজাল্ট  <span className="text-[var(--color-primary)]">ডাউনলোড</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600">
            আপনার স্টুডেন্ট আইডি এবং পরীক্ষা নির্বাচন করুন রেজাল্ট দেখতে এবং ডাউনলোড করতে।
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 p-4 sm:p-6 bg-white max-h-[250px] rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  স্টুডেন্ট আইডি <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-2 border outline-0 border-gray-300 rounded focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white"
                  placeholder="Enter Student ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পরীক্ষা নির্বাচন করুন <span className="text-red-600">*</span>
                </label>
                {isExamsLoading ? (
                  <Skeleton height={40} baseColor="#e2e8f0" highlightColor="#ffffff" />
                ) : examsError ? (
                  <p className="text-red-600 text-sm">Failed to load exams.</p>
                ) : examOptions.length === 0 ? (
                  <p className="text-gray-600 text-sm">No exams available.</p>
                ) : (
                  <Select
                    options={examOptions}
                    value={selectedExam}
                    onChange={setSelectedExam}
                    placeholder="নির্বাচন করুন"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={isReportLoading || isExamsLoading}
                className={`w-full bg-[var(--color-primary)] text-white cursor-pointer font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md ${
                  isReportLoading || isExamsLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--color-primary)]"
                }`}
              >
                {isReportLoading ? "লোড হচ্ছে..." : "রেজাল্ট দেখুন"}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">রেজাল্ট প্রিভিউ</h3>
            {isReportLoading ? (
              <Skeleton height={300} baseColor="#e2e8f0" highlightColor="#ffffff" />
            ) : reportUrl ? (
              <div className="space-y-4">
                {/* Mobile View - Responsive Height */}
                <div className="lg:hidden bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-white min-h-[500px] w-full">
                    <iframe
                      src={reportUrl}
                      className="w-full h-full border-0"
                      style={{ minHeight: "500px" }}
                      title="Report Card Preview"
                    />
                  </div>
                </div>

                {/* Desktop View - A4 Aspect Ratio */}
                <div className="hidden lg:flex bg-gray-100 rounded-lg p-4 justify-center overflow-auto">
                  <div
                    className="bg-white shadow-lg border-2 border-gray-300"
                    style={{ 
                      width: "210mm", 
                      aspectRatio: "210 / 200",
                      maxWidth: "100%"
                    }}
                  >
                    <iframe
                      src={reportUrl}
                      className="w-full h-full border-0"
                      title="Report Card Preview"
                    />
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md"
                >
                  ডাউনলোড করুন
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-12">উপরের ফর্মটি পূর্ণ করুন রেজাল্ট দেখতে।</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}