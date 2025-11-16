import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Main.css";

export default function Match() {
  const [hoveredMatch, setHoveredMatch] = useState(null);

  const upcomingMatches = [
    {
      id: 1,
      game: "Valorant",
      mode: "Competitive",
      map: "Ascent",
      players: "8/10",
      time: "In 5 minutes",
      prize: "$500",
    },
    {
      id: 2,
      game: "BGMI",
      mode: "Classic",
      map: "Erangel",
      players: "15/50",
      time: "In 12 minutes",
      prize: "$1000",
    },
    {
      id: 3,
      game: "CS2",
      mode: "Competitive",
      map: "Inferno",
      players: "10/10",
      time: "In 20 minutes",
      prize: "$750",
    },
  ];

  return (
    <section className="relative bg-[#0d0d0d] py-16 px-6 md:px-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">
            🎮 Join Competition
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Find Your Next
            <span className="ml-3 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">
              Match
            </span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* LEFT FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit"
          >
            <motion.div
              className="rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-8 md:p-10 border border-white/10 backdrop-blur-sm
              shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-[#e50914]/50 transition-all duration-300"
              whileHover={{ borderColor: "rgba(229, 9, 20, 0.3)" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">🎯</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Join the
                  <span className="ml-2 text-[#e50914]">Match</span>
                </h3>
              </div>

              <form className="flex flex-col gap-6">
                {/* GAME SELECT */}
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="game" className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">
                    Select Game
                  </label>
                  <motion.select
                    id="game"
                    className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                    hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    whileHover={{ borderColor: "rgba(0, 229, 255, 0.3)" }}
                  >
                    <option value="">Valorant</option>
                    <option value="bgmi">BGMI</option>
                    <option value="cs2">CS2</option>
                    <option value="dota">Dota 2</option>
                  </motion.select>
                </motion.div>

                {/* USERNAME */}
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <label htmlFor="username" className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">
                    Your Username
                  </label>
                  <motion.input
                    id="username"
                    type="text"
                    placeholder="Enter your in-game username"
                    className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                    hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    whileHover={{ borderColor: "rgba(0, 229, 255, 0.3)" }}
                  />
                </motion.div>

                {/* RANK */}
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="rank" className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">
                    Your Rank
                  </label>
                  <motion.select
                    id="rank"
                    className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                    hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    whileHover={{ borderColor: "rgba(0, 229, 255, 0.3)" }}
                  >
                    <option value="">Select Rank</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="pro">Pro</option>
                  </motion.select>
                </motion.div>

                {/* TERMS */}
                <motion.div
                  className="flex items-center gap-3 select-none"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="accent-[#e50914] w-5 h-5 cursor-pointer rounded transition-all"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                    I agree to the{" "}
                    <span className="text-[#00e5ff] font-semibold hover:underline">
                      terms and conditions
                    </span>
                  </label>
                </motion.div>

                {/* BUTTON */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(229, 9, 20, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444]
                  text-white text-lg font-black py-4 rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.6)]
                  transition-all duration-300 tracking-tight uppercase"
                >
                  🎮 Find Match
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* RIGHT UPCOMING MATCHES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                <span className="text-[#00e5ff]">Upcoming</span> Matches
              </h3>
              <p className="text-gray-400 text-sm">Find and join live tournaments</p>
            </div>

            {/* MATCH CARDS */}
            <div className="space-y-4 md:space-y-5">
              {upcomingMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  onMouseEnter={() => setHoveredMatch(match.id)}
                  onMouseLeave={() => setHoveredMatch(null)}
                  className="rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-5 md:p-6 border border-white/10
                  shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-[#e50914]/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 0 30px rgba(229, 9, 20, 0.4)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🎮</span>
                        <h4 className="text-xl font-black text-white tracking-tight">
                          {match.game}
                        </h4>
                      </div>
                      <p className="text-xs text-[#00e5ff] font-semibold uppercase tracking-wider">
                        {match.mode}
                      </p>
                    </div>
                    <motion.div
                      className="text-right"
                      animate={hoveredMatch === match.id ? { scale: 1.05 } : { scale: 1 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#e50914]/20 border border-[#e50914]/50 text-[#ff6b6b] font-black text-xs uppercase tracking-wider">
                        {match.time}
                      </span>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                    {/* Map */}
                    <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Map</p>
                      <p className="text-sm font-bold text-white">{match.map}</p>
                    </div>
                    {/* Players */}
                    <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Players</p>
                      <p className="text-sm font-bold text-[#00e5ff]">{match.players}</p>
                    </div>
                    {/* Prize */}
                    <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Prize</p>
                      <p className="text-sm font-bold text-[#e50914]">{match.prize}</p>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444]
                    text-white font-black py-3 md:py-4 rounded-xl transition-all duration-300 text-sm md:text-base
                    shadow-[0_0_15px_rgba(229,9,20,0.5)] uppercase tracking-tight group-hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ⚡ Join Match
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
