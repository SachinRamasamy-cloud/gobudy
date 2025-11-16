import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#E50914"; // red accent
const SECONDARY = "#3B82F6"; // blue secondary
const FALLBACK_IMG =
  "https://via.placeholder.com/800x800.png?text=Player+Image+Unavailable";

const players = [
  {
    id: 1,
    name: "Zoro",
    role: "Assault Master",
    img: "https://esports.battlegroundsmobileindia.com/images/global_players_2025/GxdLJ0NATHAN0312.jpg",
    desc:
      "Unmatched in close combat, Zoro dominates every duel with precision and power.",
    stats: { kills: 250, wins: 45, accuracy: "87%" },
  },
  {
    id: 2,
    name: "Ace",
    role: "Flame Striker",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOFzms9W-VpjoeOXYCrvFbs4XEAp1rONVww&s",
    desc:
      "Burns through the battlefield with blazing speed and unmatched aggression.",
    stats: { kills: 300, wins: 52, accuracy: "90%" },
  },
  {
    id: 3,
    name: "Itachi",
    role: "Silent Killer",
    img: "https://esports.battlegroundsmobileindia.com/images/global_players_2025/NoNxLEVII.jpg",
    desc:
      "A shadow in the dark — precise, calm, and deadly with every move.",
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
  const [autoplay, setAutoplay] = useState(false);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Preload next image when index changes
  useEffect(() => {
    const next = players[(index + 1) % players.length];
    const img = new Image();
    img.src = next.img;
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextPlayer();
      if (e.key === "ArrowLeft") prevPlayer();
      if (e.key === "Escape") setShowDetail(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % players.length);
    }, 4500);
    return () => clearInterval(id);
  }, [autoplay]);

  const nextPlayer = () => setIndex((prev) => (prev + 1) % players.length);
  const prevPlayer = () =>
    setIndex((prev) => (prev - 1 + players.length) % players.length);

  const player = players[index];
  const nextImg = players[(index + 1) % players.length].img;

  const onImgError = (e) => {
    e.currentTarget.src = FALLBACK_IMG;
  };

  return (
    <>
      {/* HEADER */}
      <section className="relative bg-[#0d0d0d] py-16 px-6 md:px-10 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center justify-between max-w-7xl mx-auto"
        >
          <div>
            <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">
              🏆 Elite Competitors
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Top
              <span className="ml-3 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">
                Players
              </span>
            </h2>
            <p className="hidden sm:block text-sm text-gray-400 mt-3 max-w-xl">
              Spotlight on top-tier competitors — stats, roles and playstyle breakdowns.
            </p>
          </div>

          {/* CONTROLS */}
          <motion.div
            className="flex items-center gap-3 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.button
              type="button"
              onClick={() => setAutoplay((s) => !s)}
              aria-pressed={autoplay}
              className="px-4 py-2 rounded-xl hidden sm:flex items-center gap-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20
                hover:border-[#00e5ff]/50 text-white text-sm font-medium transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={autoplay ? "Stop autoplay" : "Start autoplay"}
            >
              <i
                className={`fa-solid ${autoplay ? "fa-pause" : "fa-play"} group-hover:text-[#00e5ff] transition-colors`}
              />
              <span className="hidden sm:inline group-hover:text-[#00e5ff] transition-colors">
                {autoplay ? "Pause" : "Autoplay"}
              </span>
            </motion.button>

            <div className="flex gap-2">
              <motion.button
                aria-label="Previous player"
                onClick={prevPlayer}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex items-center justify-center cursor-pointer
                  hover:border-[#e50914]/50 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-chevron-left text-white group-hover:text-[#e50914] transition-colors" />
              </motion.button>

              <motion.button
                aria-label="Next player"
                onClick={nextPlayer}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex items-center justify-center cursor-pointer
                  hover:border-[#e50914]/50 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-chevron-right text-white group-hover:text-[#e50914] transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN */}
      <section
        className="relative w-full min-h-[70vh] flex items-center justify-center text-white overflow-hidden px-6 md:px-10 py-16 bg-[#0d0d0d]"
        aria-live="polite"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-[#0d0d0d] to-gray-950/30 pointer-events-none" />

        <AnimatePresence mode="wait">
          {!showDetail ? (
            <motion.div
              key={`carousel-${player.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 md:gap-16"
            >
              {/* left: text */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#e50914] to-[#ff6b6b] text-white shadow-[0_0_20px_rgba(229,9,20,0.6)]">
                    🌟 Pro Player
                  </span>
                  <span className="text-sm text-[#00e5ff] font-semibold">Top-ranked</span>
                </motion.div>

                {/* Name */}
                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-black mt-4 tracking-tighter leading-tight text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {player.name}
                </motion.h2>

                {/* Role */}
                <motion.h3
                  className="text-2xl md:text-3xl font-black mt-4 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {player.role}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-300 mt-6 mb-8 leading-relaxed max-w-lg text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  {player.desc}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex items-center gap-4 justify-center md:justify-start flex-wrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => setShowDetail(true)}
                    className="px-8 py-4 text-base font-black rounded-xl bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444] text-white
                      shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 uppercase tracking-tight"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📊 See Stats
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setIndex((i) => (i + 1) % players.length);
                    }}
                    className="px-6 py-4 text-base font-bold rounded-xl bg-gray-900/80 border border-white/20 text-white hover:border-[#00e5ff]/50 transition-all duration-300 uppercase tracking-tight"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Player ➜
                  </motion.button>
                </motion.div>

                {/* Indicator dots */}
                <motion.div
                  className="flex gap-3 mt-8 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                >
                  {players.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to player ${i + 1}`}
                      className={`rounded-full transition-all ${i === index
                        ? "w-8 h-3 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] shadow-[0_0_15px_rgba(229,9,20,0.8)]"
                        : "w-3 h-3 bg-white/30 hover:bg-white/50"
                        }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* right: image */}
              <motion.div
                className="relative w-full md:w-1/2 flex items-center justify-center"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* glowing blurred background of next image */}
                <motion.div
                  aria-hidden
                  className="absolute right-0 top-6 w-[45%] h-[60%] rounded-3xl blur-3xl opacity-40"
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    backgroundImage: `url(${nextImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(0.6)",
                  }}
                />

                <motion.img
                  key={player.img}
                  src={player.img}
                  alt={`${player.name} portrait`}
                  onError={onImgError}
                  loading="lazy"
                  className="w-[85%] md:w-[75%] rounded-3xl object-cover relative z-10
                    shadow-[0_20px_60px_rgba(229,9,20,0.3)] border-2 border-[#e50914]/30"
                  initial={{ opacity: 0, scale: 0.98, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -30 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Elite ribbon */}
                <motion.div
                  className="absolute left-4 top-4 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#00e5ff] to-[#00b8ff] text-gray-950 shadow-[0_0_20px_rgba(0,229,255,0.6)]"
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚡ Elite
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={`details-${player.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full max-w-5xl rounded-3xl p-8 md:p-12 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-center gap-10"
            >
              <motion.img
                src={player.img}
                alt={`${player.name} profile`}
                onError={onImgError}
                loading="lazy"
                className="w-[85%] md:w-[40%] rounded-2xl shadow-[0_20px_60px_rgba(229,9,20,0.3)] object-cover border-2 border-[#e50914]/30"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              />

              <motion.div
                className="w-full text-center md:text-left flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Player Profile</p>
                <h2 className="text-4xl md:text-5xl font-black text-white">{player.name}</h2>
                <h3 className="text-2xl font-black mt-2 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">
                  {player.role}
                </h3>

                <p className="text-gray-300 mt-6 leading-relaxed max-w-prose text-lg">
                  {player.desc}
                </p>

                {/* STATS */}
                <div className="flex flex-wrap gap-4 md:gap-6 mt-10 items-center">
                  {Object.entries(player.stats).map(([key, val]) => (
                    <motion.div
                      key={key}
                      className="min-w-[100px] bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-white/10 rounded-2xl px-6 py-5 hover:border-[#e50914]/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="font-black text-3xl bg-gradient-to-r from-[#00e5ff] to-[#00b8ff] bg-clip-text text-transparent">
                        {val}
                      </p>
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1 capitalize">
                        {key}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 flex gap-4 flex-wrap">
                  <motion.button
                    onClick={() => setShowDetail(false)}
                    className="px-6 py-3 rounded-xl bg-gray-900/60 hover:bg-gray-800/80 border border-white/20 text-white font-bold text-base transition-all duration-300 uppercase tracking-tight"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Back
                  </motion.button>

                  <motion.a
                    href="#"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#e50914] to-[#ff6b6b] text-white font-black text-base hover:from-[#d40812] hover:to-[#ff4444] transition-all duration-300 uppercase tracking-tight shadow-[0_0_20px_rgba(229,9,20,0.6)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎮 View Matches
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
