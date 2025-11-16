import { motion } from "framer-motion";
import React from 'react'

export default function Upcomming() {
    const ACCENT = "#E50914"; // red accent
    const SECONDARY = "#3B82F6"; // blue secondary
    const BG = "#0d0d0d"; //bg color



    const tournaments = [
        {
            game: "Valorant",
            title: "Summer Championship",
            date: "Aug 15, 2025",
            prize: "$5,000",
            prog: 60,
            participants: "24/32",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
        },
        {
            game: "BGMI",
            title: "Indian Masters Cup",
            date: "Jul 22, 2025",
            prize: "₹2,00,000",
            prog: 60,
            participants: "56/64",
            img: "https://cdn.mos.cms.futurecdn.net/bcKDb5Hq8uMCeYqZyMvy6b.jpg",
        },
        {
            game: "Apex Legends",
            title: "Legends Arena",
            date: "Sep 10, 2025",
            prize: "$2,500",
            prog: 60,
            participants: "40/50",
            img: "https://cdn1.epicgames.com/offer/f5ff7e48df404b29a9b2cbf81a46b724/EGS_ApexLegends_RespawnEntertainment_S2_1200x1600-65553c06616e9d1a384bdf3776dfe7d6",
        },
    ];

    return (
        <section className='py-16 px-6 md:px-10'>
            {/* header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
            >
                <div>
                    <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Featured</p>
                    <h2
                        id="videos-heading"
                        className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                    >
                        Upcomming
                        <span
                            className="ml-3 block md:inline"
                            style={{
                                color: ACCENT,
                                textShadow: "0 0 20px rgba(229,9,20,0.5)",
                            }}
                        >
                            Tournaments
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-3 max-w-2xl">Join competitive gaming events and showcase your skills on the grand stage</p>
                </div>

                <motion.a
                    href="#all-videos"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-white/90 px-5 py-2.5 rounded-lg border border-[#e50914]/30 hover:border-[#e50914] hover:bg-[#e50914]/10 transition-all font-semibold"
                >
                    View all →
                </motion.a>
            </motion.div>

            {/* grid */}
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
                        {/* IMAGE SECTION */}
                        <div className="relative overflow-hidden h-[220px]">
                            <motion.img
                                src={t.img}
                                alt={t.game}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            />
                            
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60"></div>

                            {/* GAME TAG */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="absolute top-4 left-4 px-4 py-2 rounded-lg text-sm font-bold
                bg-gradient-to-r from-[#e50914] to-red-700 text-white shadow-lg
                drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]"
                            >
                                {t.game}
                            </motion.span>
                        </div>

                        {/* CONTENT SECTION */}
                        <div className="p-6 space-y-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.15 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-bold text-white leading-snug">{t.title}</h3>
                            </motion.div>

                            {/* DATE */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="text-gray-300 text-sm flex items-center gap-2 font-medium"
                            >
                                <i className="fa-regular fa-calendar text-[#00e5ff] text-xs"></i> 
                                <span>{t.date} · 4:00 PM IST</span>
                            </motion.p>

                            {/* STATS GRID */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.25 }}
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

                            {/* MODE */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className="pt-1"
                            >
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                    <span className="text-[#00e5ff]">Mode:</span> Solo
                                </p>
                            </motion.div>

                            {/* PROGRESS BAR SECTION */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.35 }}
                                viewport={{ once: true }}
                                className="space-y-2.5 pt-2"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Registration Progress</p>
                                    <motion.span 
                                        className="text-sm font-bold text-[#e50914]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 + 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        {t.prog}%
                                    </motion.span>
                                </div>
                                
                                <div className="relative w-full h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden border border-gray-600/50">
                                    {/* Background glow */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, rgba(229,9,20,0.2), transparent)`,
                                            width: `${t.prog}%`,
                                        }}
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(229,9,20,0.4)",
                                                "0 0 15px rgba(229,9,20,0.6)",
                                                "0 0 10px rgba(229,9,20,0.4)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {/* Main progress bar */}
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full shadow-lg"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${t.prog}%` }}
                                        transition={{ duration: 1, ease: "easeInOut", delay: i * 0.1 + 0.4 }}
                                        viewport={{ once: true }}
                                        style={{
                                            boxShadow: "0 0 12px rgba(229,9,20,0.8), inset 0 1px 2px rgba(255,255,255,0.2)",
                                        }}
                                    />

                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"
                                        style={{
                                            width: `${t.prog}%`,
                                        }}
                                        animate={{
                                            backgroundPosition: ["0% 0%", "100% 0%"],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "linear",
                                        }}
                                    />
                                </div>
                            </motion.div>
                 
                            {/* REGISTER BUTTON */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.45 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(229,9,20,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 mt-2 rounded-lg font-bold text-sm uppercase tracking-wider
                bg-gradient-to-r from-[#e50914] to-red-700 text-white
                hover:from-red-600 hover:to-red-800
                shadow-[0_0_20px_rgba(229,9,20,0.3)]
                transition-all duration-300"
                            >
                                Register Now
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
