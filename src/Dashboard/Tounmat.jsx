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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Current Events</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Featured{" "}
            <span className="text-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
              Tournaments
            </span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-2xl">Compete in the biggest esports tournaments with massive prize pools and real competition</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, borderColor: "#e50914", boxShadow: "0 0 20px rgba(229,9,20,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-lg bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-[#e50914] transition-all whitespace-nowrap"
        >
          View All
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </motion.button>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {tournaments.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, translateY: -8 }}
            className="w-full rounded-2xl overflow-hidden
            bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl
            border border-white/10 hover:border-[#e50914]/50
            shadow-[0_0_30px_rgba(0,0,0,0.4)]
            transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden h-[240px]">
              <motion.img
                src={t.img}
                alt={t.game}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60"></div>

              {/* GAME TAG */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="absolute top-4 left-4 px-4 py-2 rounded-lg text-xs font-bold
                bg-gradient-to-r from-[#e50914] to-red-700 text-white shadow-lg
                drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]"
              >
                {t.game}
              </motion.span>
            </div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.25 }}
              viewport={{ once: true }}
              className="p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white leading-snug">{t.title}</h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-gray-300 text-sm flex items-center gap-2 font-medium"
              >
                <i className="fa-regular fa-calendar text-[#00e5ff] text-xs"></i>
                <span>{t.date}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.35 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 pt-2"
              >
                <div className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl border border-gray-700/50 hover:border-[#00e5ff]/30 transition-colors">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Prize Pool</p>
                  <h4 className="text-[#00e5ff] text-lg font-bold">{t.prize}</h4>
                </div>

                <div className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl border border-gray-700/50 hover:border-white/30 transition-colors">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Players</p>
                  <h4 className="text-white text-lg font-bold">{t.participants}</h4>
                </div>
              </motion.div>

              {/* BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(229,9,20,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 mt-2 rounded-lg font-bold text-sm uppercase tracking-wider
                bg-gradient-to-r from-[#e50914] to-red-700 text-white
                hover:from-red-600 hover:to-red-800
                shadow-[0_0_20px_rgba(229,9,20,0.3)]
                transition-all duration-300"
              >
                Join Tournament
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
