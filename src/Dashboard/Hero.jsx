// import Reveal from "../Reveal";
// import React from "react";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="py-12 lg:pt-10">
//       <div className="container mx-auto px-6 lg:px-0 flex flex-col lg:flex-row items-start gap-8">

//         {/* LEFT - Content */}
//         <Reveal>
//           <div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="flex-1"
//           >
//             <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-red-600 text-white font-semibold text-xs mb-4">LIVE TOURNAMENTS</div>

//             <h1
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
//             >
//               Compete. Win. Build Your Legacy.
//             </h1>

//             <p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.25 }}
//               className="text-gray-300 text-base md:text-lg mt-4 max-w-xl"
//             >
//               Join the world's most advanced esports ecosystem. Compete in cinematic tournaments, rise through the ranks, and carve your name into the future of gaming.
//             </p>

//             <div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35 }}
//               className="flex flex-wrap items-center gap-4 mt-6"
//             >
//               <button
//                 whileHover={{ scale: 1.03 }}
//                 className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg text-sm"
//               >
//                 START COMPETING
//               </button>

//               <button
//                 whileHover={{ scale: 1.03 }}
//                 className="px-6 py-3 rounded-lg border border-cyan-400 text-white font-semibold text-sm"
//               >
//                 VIEW TOURNAMENTS
//               </button>
//             </div>

//             {/* Stats - stack on mobile (single column), row on md+ */}
//             <div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col md:flex-row gap-4 pt-8 w-full"
//             >
//               <div
//                 whileHover={{ translateY: -5 }}
//                 className="flex-1 px-5 py-4 bg-gradient-to-br from-cyan-800/20 to-cyan-700/10 border-l-4 border-cyan-400 rounded-lg"
//               >
//                 <div className="text-cyan-300 font-black text-2xl md:text-3xl">2.5M+</div>
//                 <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Active Players</div>
//               </div>

//               <div
//                 whileHover={{ translateY: -5 }}
//                 className="flex-1 px-5 py-4 bg-gradient-to-br from-red-800/20 to-red-700/10 border-l-4 border-red-500 rounded-lg"
//               >
//                 <div className="text-red-400 font-black text-2xl md:text-3xl">$10M+</div>
//                 <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Prize Pool</div>
//               </div>

//               <div
//                 whileHover={{ translateY: -5 }}
//                 className="flex-1 px-5 py-4 bg-gradient-to-br from-purple-800/20 to-purple-700/10 border-l-4 border-purple-400 rounded-lg"
//               >
//                 <div className="text-purple-300 font-black text-2xl md:text-3xl">18.5K</div>
//                 <div className="text-gray-400 text-xs md:text-sm font-medium mt-1">Online Now</div>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//         {/* RIGHT - Hero Image */}
//         <Reveal>
//         <div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden lg:block w-[520px]"
//         >
//           <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-red-700/30 to-cyan-700/20">
//             <img src="/hero-image.png" alt="Esports Hero" className="w-full h-[420px] object-cover" />
//           </div>
//         </div>
//         </Reveal>
//       </div>
//     </section >
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import Reveal from "../Reveal"; // keep your Reveal wrapper

export default function Hero() {
  // Images: include your uploaded file (local path) + 3 esports-y Unsplash images
  const images = [
    "/mnt/data/680dd17b-fbe8-4f7f-b80e-9792f2462abf.png", // user's uploaded image (used as one tile)
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80", // neon gamer / arena
    "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80", // player silhouette / rig
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80", // esports crowd / lights
  ];

  // Small reusable hexagon image component (SVG mask + neon border)
  function Hex({ src, size = 180, glow = "red", className = "" }) {
    // hexagon points for a regular hex centered in viewBox
    const points = "50 1.7 92.3 25 92.3 75 50 98.3 7.7 75 7.7 25";
    const strokeColor = glow === "red" ? "#ff3b3b" : "#1fb6ff";
    const shadowFilterId = `glow-${strokeColor.replace("#", "")}`;

    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`inline-block ${className}`}
        role="img"
        aria-label="hexagon image"
      >
        <defs>
          <clipPath id={`hex-clip-${src}`}>
            <polygon points={points} />
          </clipPath>

          <pattern
            id={`img-pattern-${src}`}
            patternUnits="objectBoundingBox"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <image href={src} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
          </pattern>

          <filter id={shadowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* background subtle gradient */}
        <rect x="0" y="0" width="100" height="100" rx="6" fill="transparent" />

        {/* image clipped to hex */}
        <polygon points={points} clipPath={`url(#hex-clip-${src})`} fill={`url(#img-pattern-${src})`} />

        {/* neon stroke */}
        <polygon
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinejoin="round"
          style={{ filter: `url(#${shadowFilterId})` }}
          opacity="0.9"
        />

        {/* subtle inner glow */}
        <polygon points={points} fill="none" stroke={strokeColor} strokeWidth="0.6" opacity="0.18" />
      </svg>
    );
  }

  return (
    <section className="relative py-12 lg:pt-10 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-6 lg:px-0 flex flex-col lg:flex-row items-start gap-8">
        {/* LEFT - Content */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-red-600 text-white font-semibold text-xs mb-4">
              LIVE TOURNAMENTS
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
            >
              Compete. <span className="text-red-500">Win</span>. Build Your Legacy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-gray-300 text-base md:text-lg mt-4 max-w-xl"
            >
              Join the world&apos;s most advanced esports ecosystem. Compete in cinematic tournaments, rise through the ranks, and carve your name into the
              future of gaming.
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
        </Reveal>

        {/* RIGHT - Hexagon Image Composition */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex lg:w-[520px] flex-col items-center justify-center relative"
          >
            {/* Decorative hex grid layout */}
            <div className="relative w-[420px] h-[420px]">
              {/* Top-left small */}
              <div className="absolute left-0 top-6 transform -translate-x-6 -translate-y-6">
                <Hex src={images[1]} size={140} glow="blue" className="hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Top-right medium */}
              <div className="absolute right-0 top-0 transform translate-x-6 -translate-y-4">
                <Hex src={images[2]} size={180} glow="red" className="hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Center big */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Hex src={images[0]} size={220} glow="blue" className="hover:scale-102 transition-transform duration-300 shadow-2xl" />
              </div>

              {/* Bottom-right small */}
              <div className="absolute right-2 bottom-6 transform translate-x-6 translate-y-4">
                <Hex src={images[3]} size={120} glow="red" className="hover:scale-105 transition-transform duration-300" />
              </div>

              {/* subtle background geometric shapes - using simple divs for depth */}
              <div className="absolute -left-16 -top-10 w-48 h-48 rounded-2xl border border-white/6 transform rotate-12 blur-[8px] opacity-20" />
              <div className="absolute right-[-28px] bottom-[-16px] w-64 h-64 rounded-2xl border border-white/6 transform -rotate-6 blur-[8px] opacity-18" />
            </div>

            {/* optional caption under images */}
            <div className="mt-6 text-center text-gray-300 text-sm max-w-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-white/6 text-xs font-semibold">FEATURED HIGHLIGHTS</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
