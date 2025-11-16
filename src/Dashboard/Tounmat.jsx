// import React from 'react'
// import { motion } from "framer-motion";

// export default function Tounmat() {
//     const tournaments = [
//         {
//             game: "Valorant",
//             title: "Summer Championship",
//             date: "Aug 15, 2025",
//             prize: "$5,000",
//             participants: "24/32",
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
//         },
//         {
//             game: "BGMI",
//             title: "Indian Masters Cup",
//             date: "Jul 22, 2025",
//             prize: "₹2,00,000",
//             participants: "56/64",
//             img: "https://cdn.mos.cms.futurecdn.net/bcKDb5Hq8uMCeYqZyMvy6b.jpg",
//         },
//         {
//             game: "Apex Legends",
//             title: "Legends Arena",
//             date: "Sep 10, 2025",
//             prize: "$2,500",
//             participants: "40/50",
//             img: "https://cdn1.epicgames.com/offer/f5ff7e48df404b29a9b2cbf81a46b724/EGS_ApexLegends_RespawnEntertainment_S2_1200x1600-65553c06616e9d1a384bdf3776dfe7d6",
//         },
//     ];

//     return (
//         <div>
//             {/* ✅ FEATURED TOURNAMENTS */}
//             <section className="bg-black py-12 px-6 md:px-10">
//                 <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
//                     Featured
//                     <span className="text-red-600 ml-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
//                         Tournaments
//                     </span>
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
//                     {tournaments.map((t, i) => (
//                         <motion.div
//                             key={i}
//                             whileHover={{ scale: 1.05 }}
//                             className="bg-[#111827] w-full max-w-[400px] rounded-xl overflow-hidden border border-gray-800 shadow-lg transition-all"
//                         >
//                             <div className="relative">
//                                 <img
//                                     src={t.img}
//                                     alt={t.game}
//                                     loading="lazy"
//                                     className="w-full h-[200px] object-cover"
//                                 />
//                                 <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
//                                     {t.game}
//                                 </span>
//                             </div>
//                             <div className="p-5 space-y-3">
//                                 <h3 className="text-xl font-semibold text-white">{t.title}</h3>
//                                 <p className="text-gray-400 text-sm flex items-center gap-2">
//                                     <i className="fa-regular fa-calendar"></i> {t.date}
//                                 </p>
//                                 <div className="flex justify-between mt-3 text-sm font-semibold">
//                                     <div>
//                                         <p className="text-gray-400 mb-1">PRIZE POOL</p>
//                                         <h4 className="text-green-400 text-lg">{t.prize}</h4>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-gray-400 mb-1">PARTICIPANTS</p>
//                                         <h4 className="text-white text-lg">{t.participants}</h4>
//                                     </div>
//                                 </div>
//                                 <motion.button
//                                     whileTap={{ scale: 0.97 }}
//                                     className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors"
//                                 >
//                                     Join Tournament
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     )
// }
import React from "react";
import { motion } from "framer-motion";

export default function Tounmat() {
  const tournaments = [
    {
      game: "Valorant",
      title: "Summer Championship",
      date: "Aug 15, 2025",
      prize: "$5,000",
      participants: "24/32",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
    },
    {
      game: "BGMI",
      title: "Indian Masters Cup",
      date: "Jul 22, 2025",
      prize: "₹2,00,000",
      participants: "56/64",
      img: "https://cdn.mos.cms.futurecdn.net/bcKDb5Hq8uMCeYqZyMvy6b.jpg",
    },
    {
      game: "Apex Legends",
      title: "Legends Arena",
      date: "Sep 10, 2025",
      prize: "$2,500",
      participants: "40/50",
      img: "https://cdn1.epicgames.com/offer/f5ff7e48df404b29a9b2cbf81a46b724/EGS_ApexLegends_RespawnEntertainment_S2_1200x1600-65553c06616e9d1a384bdf3776dfe7d6",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10 bg-[#0d0d0d]">
      {/* HEADER + VIEW ALL */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Featured{" "}
          <span className="text-[#e50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]">
            Tournaments
          </span>
        </h2>

        <button
          className="
    flex items-center justify-center
    text-xs sm:text-sm font-semibold
    px-1 sm:px-4 py-2 sm:py-2.5
    rounded-lg
    bg-#0d0d0d hover:bg-white/10
    text-gray-300
    border border-white/10
    w-24 sm:w-auto
    transition-all duration-200
  "
        >
          View All
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tournaments.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04, translateY: -6 }}
            className="w-full rounded-xl overflow-hidden
            bg-[#111]/60 backdrop-blur-xl
            border border-white/10
            shadow-[0_0_15px_rgba(0,0,0,0.5)]
            transition-all"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={t.img}
                alt={t.game}
                className="w-full h-[200px] object-cover"
              />

              {/* GAME TAG */}
              <span
                className="absolute top-3 left-3 px-3 py-1 rounded-md text-sm font-semibold
                bg-[#e50914] text-white shadow
                drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]"
              >
                {t.game}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-white">{t.title}</h3>

              <p className="text-gray-300 text-sm flex items-center gap-2">
                <i className="fa-regular fa-calendar text-[#00e5ff]"></i> {t.date}
              </p>

              <div className="flex justify-between mt-3 text-sm font-semibold">
                <div>
                  <p className="text-gray-400 mb-1">PRIZE POOL</p>
                  <h4 className="text-[#00e5ff] text-lg">{t.prize}</h4>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 mb-1">PARTICIPANTS</p>
                  <h4 className="text-white text-lg">{t.participants}</h4>
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 mt-4 rounded-lg font-semibold
                bg-[#e50914] text-white
                hover:shadow-[0_0_18px_rgba(229,9,20,0.8)]
                transition-all"
              >
                Join Tournament
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section >
  );
}
