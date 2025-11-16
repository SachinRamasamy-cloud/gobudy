
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-0 flex flex-col lg:flex-row items-start gap-8">

        {/* LEFT - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-red-600 text-white font-semibold text-xs mb-4">LIVE TOURNAMENTS</div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
          >
            Compete. Win. Build Your Legacy.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-gray-300 text-base md:text-lg mt-4 max-w-xl"
          >
            Join the world's most advanced esports ecosystem. Compete in cinematic tournaments, rise through the ranks, and carve your name into the future of gaming.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg text-sm"
            >
              START COMPETING
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-6 py-3 rounded-lg border border-cyan-400 text-white font-semibold text-sm"
            >
              VIEW TOURNAMENTS
            </motion.button>
          </motion.div>

          {/* Stats - stack on mobile (single column), row on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 pt-8 w-full"
          >
            <motion.div
              whileHover={{ translateY: -5 }}
              className="flex-1 px-5 py-4 bg-gradient-to-br from-cyan-800/20 to-cyan-700/10 border-l-4 border-cyan-400 rounded-lg"
            >
              <div className="text-cyan-300 font-black text-2xl md:text-3xl">2.5M+</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Active Players</div>
            </motion.div>

            <motion.div
              whileHover={{ translateY: -5 }}
              className="flex-1 px-5 py-4 bg-gradient-to-br from-red-800/20 to-red-700/10 border-l-4 border-red-500 rounded-lg"
            >
              <div className="text-red-400 font-black text-2xl md:text-3xl">$10M+</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Prize Pool</div>
            </motion.div>

            <motion.div
              whileHover={{ translateY: -5 }}
              className="flex-1 px-5 py-4 bg-gradient-to-br from-purple-800/20 to-purple-700/10 border-l-4 border-purple-400 rounded-lg"
            >
              <div className="text-purple-300 font-black text-2xl md:text-3xl">18.5K</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Online Now</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block w-[520px]"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-red-700/30 to-cyan-700/20">
            <img src="/hero-image.png" alt="Esports Hero" className="w-full h-[420px] object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
