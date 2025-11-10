
import React from "react";
import { motion } from "framer-motion";

export default function Preload() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background red glow */}
      <div className="absolute w-[420px] h-[420px] bg-red-600/20 blur-3xl rounded-full animate-pulse" />

      {/* Logo + spinning border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 flex flex-col items-center relative z-10"
      >
        <div className="relative flex items-center justify-center">
          {/* Larger spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute w-36 h-36 rounded-full border-[3px] border-transparent"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(239,68,68,1), rgba(255,255,255,0.2), rgba(239,68,68,1))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black 0)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black 0)",
            }}
          />
          <img
            src={`${import.meta.env.BASE_URL}/logo1-removebg-preview.png`}
            alt="Gobudy"
            className="w-24 h-24 relative z-10 drop-shadow-xl"
          />
        </div>

        <motion.h1
          className="mt-6 text-5xl font-extrabold tracking-wider bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Gobudy
        </motion.h1>
      </motion.div>

      {/* Animated loading dots */}
      <div className="flex items-center space-x-3">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-red-600 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-red-500 font-semibold tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
