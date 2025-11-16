
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#E50914"; // red accent
const SECONDARY = "#3B82F6"; // blue secondary
const BG = "#0d0d0d"; // section background as requested
const FALLBACK =
    "https://via.placeholder.com/800x450.png?text=Video+Thumbnail+Unavailable";

const videos = [
    {
        id: 1,
        title: "Summer Championship — Finals",
        date: "Aug 15, 2025",
        duration: "12:45",
        thumb:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        tag: "VOD",
    },
    {
        id: 2,
        title: "Clutch Plays — Highlight Reel",
        date: "Jul 02, 2025",
        duration: "08:20",
        thumb:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        tag: "HIGHLIGHT",
    },
    {
        id: 3,
        title: "Pro Tips — 1v3 Retakes",
        date: "Jun 18, 2025",
        duration: "05:50",
        thumb:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        tag: "GUIDE",
    },
];

export default function Live() {
    const [active, setActive] = useState(null);

    // close on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const openVideo = (v) => setActive(v);
    const closeVideo = () => setActive(null);

    const onImgError = (e) => {
        e.currentTarget.src = FALLBACK;
    };

    return (
        <section
            className="py-16 px-6 md:px-10"
            style={{ background: BG }}
            aria-labelledby="videos-heading"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
            >
                <div>
                    <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Live Now</p>
                    <h2
                        id="videos-heading"
                        className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                    >
                        Live
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
                    <p className="text-gray-400 text-sm mt-3 max-w-2xl">Watch live esports action and never miss a moment from your favorite tournaments</p>
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

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {videos.map((v, i) => (
                    <motion.article
                        key={v.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.04, translateY: -8 }}
                        className="group w-full rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer"
                        aria-labelledby={`video-${v.id}-title`}
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-white/10 hover:border-[#e50914]/50 shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all">
                            {/* thumbnail */}
                            <motion.img
                                src={v.thumb}
                                alt={`${v.title} thumbnail`}
                                loading="lazy"
                                onError={onImgError}
                                className="w-full h-[240px] object-cover transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60"></div>

                            {/* top-left LIVE tag with animation */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="absolute left-4 top-4 px-4 py-2 rounded-lg text-xs font-bold"
                                style={{
                                    background: `linear-gradient(90deg, ${ACCENT}, rgba(229,9,20,0.95))`,
                                    color: "white",
                                    boxShadow: "0 0 12px rgba(229,9,20,0.6)",
                                }}
                            >
                                🔴 LIVE
                            </motion.div>

                            {/* top right viewers tag */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.25 }}
                                viewport={{ once: true }}
                                className="absolute right-4 top-4 px-4 py-2 text-xs font-bold rounded-full bg-black/70 backdrop-blur-sm border border-white/10"
                                style={{
                                    color: "white",
                                }}
                            >
                                👥 8,900
                            </motion.div>

                            {/* center play button */}
                            <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition-all duration-300"
                                aria-hidden
                            >
                                <motion.button
                                    type="button"
                                    onClick={() => openVideo(v)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") openVideo(v);
                                    }}
                                    className="pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition transform scale-75 group-hover:scale-100 focus:outline-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${ACCENT}, rgba(229,9,20,0.85))`,
                                        boxShadow: `0 0 25px rgba(229,9,20,0.5)`,
                                    }}
                                    aria-label={`Play ${v.title}`}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <i className="fa-solid fa-play ml-1 text-lg" />
                                </motion.button>
                            </div>

                            {/* bottom-right duration */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className="absolute bottom-4 right-4"
                            >
                                <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-white/10">
                                    ⏱️ {v.duration}
                                </span>
                            </motion.div>
                        </div>

                        {/* content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 + 0.35 }}
                            viewport={{ once: true }}
                            className="p-6 space-y-4 bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-sm"
                        >
                            <h3
                                id={`video-${v.id}-title`}
                                className="text-lg font-bold text-white leading-snug group-hover:text-[#e50914] transition-colors"
                            >
                                {v.title}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.4 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-between gap-2 text-xs text-gray-300 pt-2"
                            >
                                <span className="flex items-center gap-2 font-medium">
                                    <i className="fa-regular fa-calendar" style={{ color: "#00e5ff" }} />
                                    <span className="text-white/80">{v.date}</span>
                                </span>

                                <span className="hidden sm:flex items-center gap-1 text-[#00e5ff] font-semibold">
                                    <i className="fa-solid fa-eye text-xs" /> 24.8k
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.article>
                ))}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Playing ${active.title}`}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={closeVideo}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10"
                        >
                            <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-gray-900/60 to-gray-950/60 backdrop-blur-sm">
                                <h4 className="text-white font-bold text-lg">{active.title}</h4>
                                <motion.button
                                    onClick={closeVideo}
                                    aria-label="Close player"
                                    className="text-white/90 p-2 rounded-lg hover:bg-white/10 hover:text-[#e50914] transition-all font-bold"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fa-solid fa-xmark text-lg" />
                                </motion.button>
                            </header>

                            <div className="bg-black relative">
                                <video
                                    src={active.src}
                                    controls
                                    autoPlay
                                    className="w-full h-[50vh] md:h-[70vh] bg-black object-cover"
                                >
                                    Sorry, your browser doesn't support embedded videos.
                                </video>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
