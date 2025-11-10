
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-gradient-to-b from-black/40 via-black/60 to-black px-8 py-10 ">
        <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-400">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`}
                alt="GoBudy Logo"
                className="w-16 h-16"
              />
              <h1 className="text-3xl font-extrabold text-white">
                Go<span className="text-red-600">Budy</span>
              </h1>
            </div>
            <p className="mt-3 text-gray-400 text-sm max-w-xs">
              The ultimate gaming platform to connect with players, join tournaments,
              and showcase your skills.
            </p>
            <div className="flex gap-4 mt-4">
              <i className="fa-brands fa-github text-xl hover:text-red-600 transition-all duration-200"></i>
              <i className="fa-brands fa-whatsapp text-xl hover:text-red-600 transition-all duration-200"></i>
              <i className="fa-brands fa-facebook text-xl hover:text-red-600 transition-all duration-200"></i>
              <i className="fa-brands fa-youtube text-xl hover:text-red-600 transition-all duration-200"></i>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="text-white font-semibold text-lg mb-3">Platform</h2>
            <ul className="space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Games</li>
              <li className="hover:text-red-500 cursor-pointer">Tournaments</li>
              <li className="hover:text-red-500 cursor-pointer">LeaderBoard</li>
              <li className="hover:text-red-500 cursor-pointer">Premium Membership</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="text-white font-semibold text-lg mb-3">Contact Us</h2>
            <ul className="space-y-2">
              <li>Email: <span className="text-gray-300">support@gobudy.com</span></li>
              <li>Phone: <span className="text-gray-300">+91 98765 43210</span></li>
              <li>Location: <span className="text-gray-300">India</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="text-white font-semibold text-lg mb-3">Support</h2>
            <ul className="space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Help Center</li>
              <li className="hover:text-red-500 cursor-pointer">FAQs</li>
              <li className="hover:text-red-500 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-red-500 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </footer><div className="w-full h-[1px] bg-gray-700 mt-8 mb-6"></div>

        <div className="text-gray-500 text-sm flex items-center justify-center gap-2 pb-4">
          <i className="fa-regular fa-copyright"></i>
          <p>2025 <span className="text-white font-semibold">Go</span><span className="text-red-600 font-semibold">Budy</span>. All rights reserved.</p>
        </div>

      </div>
    </>
  );
}