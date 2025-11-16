
// import React from "react";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="relative h-[90vh] w-full overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover opacity-40"
//       >
//         <source
//           src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.mp4`}
//           type="video/mp4"
//         />
//       </video>

//       {/* Dark/Light Overlay */}
//       <div className="absolute inset-0 bg-black/60 dark:bg-black/70 bg-white/50 mix-blend-multiply" />

//       {/* Hero Content */}
//       <motion.div
//         className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide 
//           text-white dark:text-white drop-shadow-xl">
//           Compete Across Every Arena
//         </h1>

//         <p className="mt-5 max-w-2xl text-sm md:text-lg text-gray-900 dark:text-gray-300">
//           Join tournaments, climb the rankings, and prove your skill in every game.
//         </p>

//         {/* Buttons */}
//         <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
//           {/* Primary Button (Brand Red) */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="px-10 py-3 rounded-xl font-semibold 
//               bg-[#e50914] text-white 
//               shadow-[0_0_20px_rgba(229,9,20,0.5)]
//               hover:shadow-[0_0_30px_rgba(229,9,20,0.8)]
//               transition-all duration-300"
//           >
//             Join Now <i className="fa-solid fa-arrow-right ml-3"></i>
//           </motion.button>

//           {/* Secondary Button (Electric Cyan) */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="px-10 py-3 rounded-xl font-semibold 
//               border-2 border-[#00e5ff] text-[#00e5ff]
//               hover:bg-[#00e5ff] hover:text-black
//               transition-all duration-300"
//           >
//             View Leaderboard
//           </motion.button>
//         </div>
//       </motion.div>
//     </section>
//   );
// }
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
    const prefersReducedMotion = useReducedMotion();

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    const hoverProp = prefersReducedMotion ? {} : { whileHover: { scale: 1.05 } };

    return (
        <section
            className="relative h-[90vh] w-full overflow-hidden bg-[#0d0d0d]"
            role="region"
            aria-label="Hero — compete across every arena"
        >
            {/* Background Video (presentation only) */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                aria-hidden="true"
                tabIndex={-1}
            >
                <source
                    src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.mp4`}
                    type="video/mp4"
                />
            </video>

            {/* Dark Overlay tuned for #0d0d0d */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#0d0d0d]" />

            {/* Hero Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                variants={containerVariants}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                    Compete Across Every Arena
                </h1>

                <p className="mt-5 max-w-2xl text-sm md:text-lg text-gray-300">
                    Join tournaments, climb the rankings, and prove your skill in every game.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {/* Primary Button (Brand Red) */}
                    <motion.button
                        {...hoverProp}
                        type="button"
                        className="inline-flex w-fit items-center px-10 py-3 rounded-xl font-semibold bg-[#e50914] text-white shadow-[0_8px_30px_rgba(229,9,20,0.45)] hover:shadow-[0_12px_40px_rgba(229,9,20,0.65)] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e50914]/30"
                        aria-label="Join now — sign up"
                    >
                        <span>Join Now</span>
                        {/* Inline SVG arrow */}
                        <svg
                            className="ml-3 -mr-1 w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586L10.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </motion.button>

                    {/* Secondary Button (Blue) */}
                    <motion.button
                        {...hoverProp}
                        type="button"
                        className="inline-flex items-center px-10 py-3 rounded-xl font-semibold bg-black/40 border border-white/10 text-white transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1e90ff]/30"
                        aria-label="View leaderboard"
                    >
                        View Leaderboard
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
