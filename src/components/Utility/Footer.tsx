import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoIosSchool } from "react-icons/io";

export default function Footer() {
  return (
    <footer className=" text-white bg-gradient-to-r from-slate-700 to-slate-800 relative overflow-hidden">
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
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">EduTech</span>
            </div>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Empowering the future through innovative education solutions. Join thousands of students transforming their careers with our cutting-edge platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <FaFacebookF className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <FaInstagram className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <FaYoutube className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <FaLinkedinIn className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">Quick Links</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Home
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                About Us
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Marketplace
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Company
              </a></li>
            </ul>
          </div>

          {/* Features/Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">Features</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Analytics
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Reports
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Overview
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:translate-x-1 transition-transform"></span>
                Pricing
              </a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-indigo-400 pb-1">Contact Us</h3>
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
            <div className="flex flex-col space-y-2 pt-2">
              <span className="flex items-center gap-2 text-sm text-indigo-300">
                <IoIosSchool /> Admission
              </span>
              <span className="flex items-center gap-2 text-sm text-indigo-300">
                <PiStudentBold /> Student Login
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-800 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-indigo-300">
              &copy; 2025 EduTech. All rights reserved. Built with ❤️ for education.
            </p>
            <div className="flex items-center space-x-6 text-sm text-indigo-300">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}