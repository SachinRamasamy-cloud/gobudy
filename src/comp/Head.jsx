
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Head({ setIsOpen }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex gap-3 items-center">
                        {/* Hamburger Menu (For All Screens) */}
                        <button
                            className=" text-2xl text-white hover:text-red-500 transition"
                              onClick={() => setIsOpen(true)}
                        >
                            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src="/logo1-removebg-preview.png" className="w-8 h-8" alt="" />
                            <h1 className="text-2xl font-extrabold tracking-wide text-white">
                                Go<span className="text-red-600 drop-shadow-[0_0_10px_#ff0000]">Budy</span>
                            </h1>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="hidden md:block flex-1 mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tournaments, games..."
                                className="w-full pl-10 pr-4 py-2 
                rounded-full bg-white/10 text-white
                border border-white/20 
                placeholder-gray-300
                focus:ring-2 focus:ring-red-600/70 focus:border-red-600
                backdrop-blur-xl outline-none transition"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 text-white">
                        {/* Coins */}
                        <div className="hidden md:flex items-center gap-2 
            border border-white/20 bg-white/5
            px-3 py-1.5 rounded-lg text-sm font-bold 
            hover:border-red-600 transition">
                            <i className="fa-solid fa-wallet text-red-600 drop-shadow"></i> ₹1200
                            <button className="text-red-500 hover:text-red-400 active:scale-95 transition">
                            </button>
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
                                <div className="text-[10px] font-semibold text-gray-300  w-fit">
                                    Level-31
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <AnimatePresence>
                    {menuOpen && (
                        <>
                            <motion.div
                                initial={{ x: -250, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -250, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="fixed top-0 left-0 h-full w-64 z-50 
                   bg-gray-800 border-r border-gray-700 
                   flex flex-col justify-between py-8 px-6 
                   text-white shadow-[4px_0_15px_rgba(0,0,0,0.6)]"
                            >

                                <div className="">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl font-extrabold tracking-wide mb-8">
                                            Go<span className="text-red-600 drop-shadow-[0_0_10px_#ff0000]">Budy</span>
                                        </h1>
                                        <div className="text-center flex justify-center text-2xl mt-1">
                                            <i class="fa-solid fa-xmark text-center"

                                                onClick={() => setMenuOpen(false)}></i>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 text-lg">
                                        <div className="flex items-center gap-3  bg-red-500 p-4 rounded-lg cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-user"></i> Home
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-trophy"></i> Featured Games
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Tournaments
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Best Players
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Top Videos
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Reels
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Join Match
                                        </div>
                                        <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition">
                                            <i className="fa-solid fa-gear"></i> Settings
                                        </div>

                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="px-3 py-1 border border-red-600 rounded-full text-red-500 hover:bg-red-600 hover:text-white transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>

                            {/* Backdrop (Black Dim) — Placed Behind Sidebar */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-40"
                                onClick={() => setMenuOpen(false)}
                            />
                        </>
                    )}
                </AnimatePresence>


            </header>
            <div className="bg-gray-800 p-2 block md:hidden">
                <div className=" flex-1 mx-3">
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
        </>
    );
}
