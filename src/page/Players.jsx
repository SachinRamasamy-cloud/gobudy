
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const players = [
    {
        id: 1,
        name: "Zoro",
        role: "Assault Master",
        img: "https://esports.battlegroundsmobileindia.com/images/global_players_2025/GxdLJ0NATHAN0312.jpg",
        desc: "Unmatched in close combat, Zoro dominates every duel with precision and power.",
        stats: { kills: 250, wins: 45, accuracy: "87%" },
    },
    {
        id: 2,
        name: "Ace",
        role: "Flame Striker",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOFzms9W-VpjoeOXYCrvFbs4XEAp1rONVww&s",
        desc: "Burns through the battlefield with blazing speed and unmatched aggression.",
        stats: { kills: 300, wins: 52, accuracy: "90%" },
    },
    {
        id: 3,
        name: "Itachi",
        role: "Silent Killer",
        img: "https://esports.battlegroundsmobileindia.com/images/global_players_2025/NoNxLEVII.jpg",
        desc: "A shadow in the dark — precise, calm, and deadly with every move.",
        stats: { kills: 210, wins: 38, accuracy: "85%" },
    },
    {
        id: 4,
        name: "Luffy",
        role: "Frontline Brawler",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEz5hFkBpnpV6r2Rg3RSzP_JMTpZ3jw4L4Q&s",
        desc: "A fearless fighter who never backs down from a challenge.",
        stats: { kills: 270, wins: 41, accuracy: "82%" },
    },
];

export default function PlayerCarousel() {
    const [index, setIndex] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    const nextPlayer = () => setIndex((prev) => (prev + 1) % players.length);
    const prevPlayer = () =>
        setIndex((prev) => (prev - 1 + players.length) % players.length);

    const player = players[index];
    const nextImg = players[(index + 1) % players.length].img;

    return (
        <>
            {/* head */}
            <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
                {/* title */}
                <div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                        Featured
                        <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
                            Games
                        </span>
                    </h1>

                </div>
                {/* buttons */}
                <div className="flex gap-2 sm:gap-4">
                    <div
                        onClick={prevPlayer}
                        className="w-11 h-11 rounded-full bg-gray-900 hover:bg-red-600 
                 flex items-center justify-center 
                 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]
                 transition-all duration-200 cursor-pointer"
                    >
                        <i className="fa-solid fa-chevron-left text-white text-lg"></i>
                    </div>

                    <div
                        onClick={nextPlayer}
                        className="w-11 h-11 rounded-full bg-gray-900 hover:bg-red-600 
                 flex items-center justify-center 
                 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]
                 transition-all duration-200 cursor-pointer"
                    >
                        <i className="fa-solid fa-chevron-right text-white text-lg"></i>
                    </div>
                </div>
            </div>
            <section className="w-full min-h-[60vh] flex items-center justify-center bg-gray-800 text-white relative overflow-hidden px-4 md:px-8 py-8">
                <AnimatePresence mode="wait">
                    {!showDetail ? (
                        // --- Carousel Mode ---
                        <motion.div
                            key="carousel"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full max-w-[1100px] flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8"
                        >
                            {/* Left Info */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                                <motion.div
                                    key={player.id}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 40 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {player.name}
                                    </h2>
                                    <h3 className="text-red-500 text-lg md:text-xl font-semibold mb-4">
                                        {player.role}
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                                        {player.desc}
                                    </p>
                                    <button
                                        onClick={() => setShowDetail(true)}
                                        className="px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold text-sm shadow-md"
                                    >
                                        See All
                                    </button>
                                </motion.div>
                            </div>

                            {/* Right Image */}
                            <div className="relative w-full md:w-1/2 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={player.img}
                                        src={player.img}
                                        alt={player.name}
                                        className="w-[85%] sm:w-[70%] md:w-[80%] rounded-2xl shadow-2xl object-cover relative z-10 aspect-[4/3]"
                                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </AnimatePresence>

                                {/* Next Image Blur Preview */}
                                <img
                                    src={nextImg}
                                    alt="next preview"
                                    className="absolute right-0 w-[50%] md:w-[35%] opacity-30 blur-sm rounded-xl z-0 scale-90"
                                />
                            </div>


                        </motion.div>
                    ) : (
                        // --- Detail Mode ---
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-[1100px] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-center bg-gray-800 backdrop-blur-md"
                        >
                            {/* Player Image */}
                            <div className="flex justify-center w-full md:w-1/2 mb-6 md:mb-0">
                                <img
                                    src={player.img}
                                    alt={player.name}
                                    className="w-[85%] sm:w-[70%] md:w-[80%] rounded-2xl shadow-lg object-cover aspect-[4/3]"
                                />
                            </div>

                            {/* Player Info */}
                            <div className="w-full md:w-1/2 text-center md:text-left px-2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    {player.name}
                                </h2>
                                <h3 className="text-red-500 text-lg md:text-xl font-semibold mb-4">
                                    {player.role}
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                                    {player.desc}
                                </p>

                                <div className="flex justify-center md:justify-start gap-6 mb-8">
                                    <div>
                                        <p className="text-red-500 font-bold text-lg md:text-xl">
                                            {player.stats.kills}
                                        </p>
                                        <p className="text-gray-400 text-xs md:text-sm">Kills</p>
                                    </div>
                                    <div>
                                        <p className="text-red-500 font-bold text-lg md:text-xl">
                                            {player.stats.wins}
                                        </p>
                                        <p className="text-gray-400 text-xs md:text-sm">Wins</p>
                                    </div>
                                    <div>
                                        <p className="text-red-500 font-bold text-lg md:text-xl">
                                            {player.stats.accuracy}
                                        </p>
                                        <p className="text-gray-400 text-xs md:text-sm">
                                            Accuracy
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowDetail(false)}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg font-semibold text-sm"
                                >
                                    Back
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}
