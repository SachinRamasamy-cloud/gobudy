
import React from "react";
import { motion } from "framer-motion";

export default function Preload() {
  const dotVariant = {
    animate: (i) => ({ y: [0, -10, 0], opacity: [0.6, 1, 0.6], transition: { repeat: Infinity, duration: 0.9, delay: i * 0.15, ease: "easeInOut" } }),
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-[#0b0b0b] to-gray-900" />
      <motion.div
        aria-hidden
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute -right-28 -top-24 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#e50914]/10 via-[#00e5ff]/6 to-[#7c3aed]/6 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 flex flex-col items-center text-center px-6"
      >
        {/* Logo with subtle spinning accent ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(229,9,20,0.16), rgba(0,229,255,0.12), rgba(124,58,237,0.12))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), black 0)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), black 0)",
            }}
          />

          <img
            src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`}
            alt="GoBudy logo"
            className="w-24 h-24 rounded-full object-cover relative z-10 shadow-lg"
          />
        </div>

        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#e50914] to-[#00e5ff]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          GoBudy
        </motion.h1>

        <motion.p
          className="mt-3 text-sm md:text-base text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Preparing your competitive arena — fetching latest tournaments and leaderboards.
        </motion.p>

        {/* Loading indicators */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariant}
              initial={{ opacity: 0.6 }}
              animate="animate"
              className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-[#e50914] to-[#ff7b7b] shadow-[0_6px_18px_rgba(229,9,20,0.12)]"
            />
          ))}
        </div>

        <motion.div
          role="status"
          aria-live="polite"
          className="mt-4"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <span className="text-sm md:text-base font-semibold text-[#e50914]">Loading…</span>
          <span className="sr-only">Application is loading</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
