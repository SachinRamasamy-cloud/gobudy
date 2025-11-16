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
      <div className="flex items-center justify-between py-8 px-6 md:px-12">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Top{" "}
            <span className="text-[#e50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]">
            Players
            </span>
          </h2>
          <p className="hidden sm:block text-sm text-white/60 mt-2 max-w-xl">
            Spotlight on top-tier competitors — stats, roles and playstyle breakdowns.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAutoplay((s) => !s)}
            aria-pressed={autoplay}
            className="px-3 py-2 rounded-lg hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 text-white text-sm
              hover:bg-[#151515] focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2 transition"
            title={autoplay ? "Stop autoplay" : "Start autoplay"}
          >
            <i
              className={`fa-solid ${autoplay ? "fa-pause" : "fa-play"}`}
              style={{ color: "white" }}
            />
            <span className="hidden sm:inline">
              {autoplay ? "Pause" : "Autoplay"}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              aria-label="Previous player"
              onClick={prevPlayer}
              className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
            >
              <i className="fa-solid fa-chevron-left text-white" />
            </button>

            <button
              aria-label="Next player"
              onClick={nextPlayer}
              className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
            >
              <i className="fa-solid fa-chevron-right text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <section
        className="w-full min-h-[70vh] flex items-center justify-center text-white relative overflow-hidden px-6 md:px-12 py-12"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {!showDetail ? (
            <motion.div
              key={`carousel-${player.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-[1300px] flex flex-col md:flex-row items-center gap-8"
            >
              {/* left: text */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}, rgba(229,9,20,0.85))`,
                      boxShadow: `0 6px 30px rgba(229,9,20,0.18)`,
                    }}
                  >
                    PRO
                  </span>

                  <div className="ml-2 text-sm text-white/60">Top-ranked</div>
                </div>

                <h2 className="text-5xl md:text-6xl font-extrabold mt-4 tracking-tight leading-tight">
                  {player.name}
                </h2>

                <h3
                  className="text-2xl font-semibold mt-2 inline-block"
                  style={{
                    color: ACCENT,
                    textShadow: `0 0 10px rgba(229,9,20,0.9)`,
                  }}
                >
                  {player.role}
                </h3>

                <p className="text-white/60 mt-6 mb-8 leading-relaxed max-w-lg">
                  {player.desc}
                </p>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => setShowDetail(true)}
                    className="px-7 py-3 text-sm font-semibold rounded-xl bg-[#E50914] hover:bg-[#b70710] text-white
                      shadow-[0_12px_40px_rgba(229,9,20,0.35)] transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
                  >
                    See More
                  </button>

                  <button
                    onClick={() => {
                      // quick action example
                      setIndex((i) => (i + 1) % players.length);
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-black/40 border border-white/10 text-white hover:bg-[#111] transition focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
                  >
                    Quick Cycle
                  </button>
                </div>

                {/* dots */}
                <div className="flex gap-2 mt-6 justify-center md:justify-start">
                  {players.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to player ${i + 1}`}
                      className={`w-3 h-3 rounded-full transition-all ${i === index
                        ? "bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.9)] scale-110"
                        : "bg-white/20"
                        }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* right: image */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center">
                {/* glowing blurred background of next image */}
                <div
                  aria-hidden
                  className="absolute right-0 top-6 w-[45%] h-[60%] rounded-xl blur-3xl opacity-30"
                  style={{
                    backgroundImage: `url(${nextImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scale(0.95)",
                    filter: "saturate(0.8)",
                  }}
                />

                <motion.img
                  key={player.img}
                  src={player.img}
                  alt={`${player.name} portrait`}
                  onError={onImgError}
                  loading="lazy"
                  className="w-[85%] md:w-[75%] rounded-3xl object-cover relative z-10
                    shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/6"
                  initial={{ opacity: 0, scale: 0.98, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -30 }}
                  transition={{ duration: 0.5 }}
                />

                {/* small ribbon */}
                <div
                  className="absolute left-4 top-4 px-3 py-1 rounded-md text-xs font-bold"
                  style={{
                    background: "#3B82F6",
                    // background: `linear-gradient(90deg, ${ACCENT}, rgba(229,9,20,0.9))`,
                    color: "white",
                    transform: "rotate(-6deg)",
                    boxShadow: "0 8px 30px rgba(229,9,20,0.12)",
                  }}
                >
                  ELITE
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`details-${player.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-[1250px] rounded-2xl p-8 md:p-12 bg-black/30 backdrop-blur-2xl border border-white/8 flex flex-col md:flex-row items-center gap-8"
            >
              <img
                src={player.img}
                alt={`${player.name} profile`}
                onError={onImgError}
                loading="lazy"
                className="w-[85%] md:w-[45%] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] object-cover"
              />

              <div className="w-full text-center md:text-left">
                <h2 className="text-4xl font-bold">{player.name}</h2>
                <h3
                  className="text-xl font-semibold mt-1"
                  style={{ color: ACCENT }}
                >
                  {player.role}
                </h3>

                <p className="text-white/70 mt-4 leading-relaxed max-w-prose">
                  {player.desc}
                </p>

                {/* STATS */}
                <div className="flex flex-wrap gap-6 mt-8 items-center">
                  {Object.entries(player.stats).map(([key, val]) => (
                    <div
                      key={key}
                      className="min-w-[90px] bg-black/40 border border-white/6 rounded-xl px-4 py-3"
                    >
                      <p
                        className="font-extrabold text-3xl"
                        style={{
                          color: SECONDARY,
                          textShadow: `0 0 10px rgba(59,130,246,0.25)`,
                        }}
                      >
                        {val}
                      </p>
                      <p className="text-white/50 text-sm capitalize">{key}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowDetail(false)}
                    className="px-6 py-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-white text-sm transition focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
                  >
                    Back
                  </button>

                  <a
                    href="#"
                    className="px-6 py-2 rounded-lg bg-[#E50914] text-white text-sm font-semibold hover:bg-[#b70710] transition focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
                  >
                    View Matches
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
