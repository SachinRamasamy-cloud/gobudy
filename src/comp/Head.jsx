import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Head({ setIsOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all duration-300 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d] to-gray-950/80 shadow-[0_0_30px_rgba(229,9,20,0.1)]"
      >
        {/* Main Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto w-full">
          <div className="flex gap-4 items-center flex-shrink-0">
            {/* Mobile Menu Button */}
            <motion.button
              className="text-xl text-white hover:text-[#e50914] transition md:hidden rounded-lg p-2 hover:bg-white/5"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars"></i>
            </motion.button>

            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`}
                className="w-9 md:w-10 h-9 md:h-10 group-hover:drop-shadow-[0_0_15px_rgba(229,9,20,0.8)] transition-all"
                alt="GoBudy Logo"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-white whitespace-nowrap">
                Go<span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]">
                  Budy
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Navigation - Desktop */}
          <motion.nav
            className="hidden lg:flex gap-1 flex-1 justify-center px-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {
              // simple mapping from label -> path
            }
            {[
              { label: "Home", path: "/" },
              { label: "Tournaments", path: "/tournaments" },
              { label: "Videos", path: "/all-video" },
              { label: "Top Players", path: "/top-players" },
              { label: "Reels", path: "/reels" },
            ].map((item, idx) => {
              const currentPath = (location && (location.pathname || (location.hash ? location.hash.replace(/^#/, "") : ""))) || window.location.pathname || "/";
              const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Link
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-bold transition-colors relative group whitespace-nowrap ${isActive ? 'text-[#e50914]' : 'text-white hover:text-[#e50914]'}`}
                  >
                    {item.label}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Right Section */}
          <motion.div
            className="flex items-center gap-2 md:gap-4 text-white flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Coins - Desktop */}
            <motion.div
              className="hidden lg:flex items-center gap-2 border border-white/20 bg-gradient-to-br from-gray-900/60 to-gray-950/60
              px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold hover:border-[#e50914]/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(229, 9, 20, 0.5)" }}
            >
              <i className="fa-solid fa-wallet text-[#e50914] text-base md:text-lg drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]"></i>
              <span className="text-white font-black whitespace-nowrap">₹1200</span>
            </motion.div>

            {/* Notifications */}
            <motion.button
              className="relative text-white text-base md:text-lg hover:text-[#e50914] transition-colors p-2 rounded-lg hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
            >
              <i className="fa-solid fa-bell"></i>
              <motion.span
                className="absolute -top-1 -right-1 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] text-white text-[9px] md:text-[10px] font-black px-1.5 rounded-full shadow-[0_0_10px_rgba(229,9,20,0.6)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                7
              </motion.span>
            </motion.button>

            {/* Profile */}
            <motion.div
              className="flex items-center gap-2 md:gap-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src="/default-avatar.png"
                alt="Profile"
                className="w-9 md:w-10 h-9 md:h-10 rounded-full border-2 border-[#e50914]/50 object-cover shadow-[0_0_10px_rgba(229,9,20,0.4)] group-hover:border-[#e50914] transition-all"
                whileHover={{ scale: 1.1 }}
              />
              <div className="leading-tight hidden md:block group-hover:text-[#00e5ff] transition-colors">
                <span className="text-xs md:text-sm font-black block">Sachin</span>
                <div className="text-[10px] md:text-[11px] font-semibold text-gray-400 group-hover:text-[#00e5ff] transition-colors">
                  Level-31
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Search Bar */}
        <motion.div
          className="block md:hidden px-6 pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="relative group">
            <motion.input
              type="text"
              placeholder="Search tournaments, games..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gradient-to-br from-gray-900/60 to-gray-950/60 text-white text-sm
              border border-white/20 placeholder-gray-500 font-medium
              focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]/50
              backdrop-blur-xl outline-none transition-all duration-300 group-focus-within:border-[#e50914]/50"
              whileFocus={{ scale: 1.02 }}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm group-focus-within:text-[#e50914] transition-colors"></i>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
