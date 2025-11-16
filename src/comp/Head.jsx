import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Head({ setIsOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex gap-3 items-center">
            <button
              className="text-2xl text-white hover:text-red-500 transition md:hidden"
              onClick={() => setIsOpen(true)} 
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`} className="w-8 h-8" alt="logo" />
              <h1 className="text-2xl font-extrabold tracking-wide text-white">
                Go<span className="text-red-600 drop-shadow-[0_0_10px_#ff0000]">Budy</span>
              </h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-8 text-sm font-semibold text-white">
              <a href="#" className="hover:text-red-500 transition">Home</a>
              <a href="#" className="hover:text-red-500 transition">Tournaments</a>
              <a href="#" className="hover:text-red-500 transition">Featured Games</a>
              <a href="#" className="hover:text-red-500 transition">Top Players</a>
              <a href="#" className="hover:text-red-500 transition">Reels</a>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 text-white">
            {/* Coins */}
            <div className="hidden md:flex items-center gap-2 
              border border-white/20 bg-white/5
              px-3 py-1.5 rounded-lg text-sm font-bold 
              hover:border-red-600 transition">
              <i className="fa-solid fa-wallet text-red-600 drop-shadow"></i> ₹1200
            </div>

            {/* Notifications */}
            <div className="relative cursor-pointer hover:text-red-500 transition">
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-2 bg-red-600 
                text-white text-[10px] font-bold px-1 rounded-full animate-pulse shadow-lg">
                7
              </span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src="/default-avatar.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-red-600 
                object-cover shadow-md group-hover:scale-105 transition"
              />
              <div className="leading-tight hidden md:block">
                <span className="text-sm font-bold">Sachin</span>
                <div className="text-[10px] font-semibold text-gray-300 w-fit">
                  Level-31
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 block md:hidden">
          <div className="flex-1 mx-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tournaments, games..."
                className="w-full pl-10 pr-4 py-2 
                rounded-2xl bg-white/10 text-white
                border border-white/20 
                placeholder-gray-300
                focus:ring-2 focus:ring-red-600/70 focus:border-red-600
                backdrop-blur-xl outline-none transition"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
