import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Main.css";
import Reveal from "../Reveal";
import {
  getAllMatches,
  getUserById,
  updMatch,
  updUser
} from "../../server/server";

export default function Match() {
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [matchs, setmatchs] = useState([]);
  const [user, setuser] = useState(null);
  const joined = user?.joinedM || [];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const localUser = JSON.parse(storedUser);

    getUserById(localUser._id)
      .then(res => {
        const safeUser = {
          ...res.data,
          joinedM: res.data.joinedM || [],
          wallet: res.data.wallet || 0
        };
        setuser(safeUser);
      })
      .catch(err => console.log("User fetch failed", err));
  }, []);

  useEffect(() => {
    getAllMatches()
      .then(res => {
        const upcomming = res.data.filter(t => t.status === "upcomming");
        setmatchs(upcomming);
      })
      .catch(err => console.log("Match fetch failed", err));
  }, []);

  const handlejoin = async t => {
    if (!user) {
      alert("User not loaded");
      return;
    }

    const hasJoined = t.joinedP.some(p => String(p._id) === String(user._id));
    if (hasJoined) {
      alert("Already joined this Match");
      return;
    }

    if (user.wallet < t.fee) {
      alert("Not enough wallet balance");
      return;
    }

    const updatedUser = {
      ...user,
      wallet: user.wallet - t.fee,
      joinedM: [...user.joinedM, t._id]
    };

    const updatedMatch = {
      ...t,
      joined: t.joined + 1,
      joinedP: [...t.joinedP.map(p => p._id || p), user._id]
    };

    try {
      await updUser(user._id, updatedUser);
      await updMatch(t._id, updatedMatch);

      setuser(updatedUser);
      setmatchs(prev =>
        prev.map(item => (item._id === t._id ? updatedMatch : item))
      );

      alert("Joined Successfully!");
    } catch (error) {
      alert("Join failed");
      console.log("failed problem", error);
    }
  };

  return (
    <section className="relative bg-[#0d0d0d] py-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">
              Join Competition
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Find Your Next
              <span className="ml-3 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">
                Match
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* LEFT FORM CARD */}
            <div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-fit"
            >
              <div
                className="rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-8 md:p-10 border border-white/10 backdrop-blur-sm
                shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-[#e50914]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    Join the
                    <span className="ml-2 text-[#e50914]">Match</span>
                  </h3>
                </div>

                <form className="flex flex-col gap-6">
                  {/* GAME */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="game"
                      className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide"
                    >
                      Select Game
                    </label>
                    <select
                      id="game"
                      className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                      hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    >
                      <option value="">Valorant</option>
                      <option value="bgmi">BGMI</option>
                      <option value="cs2">CS2</option>
                      <option value="dota">Dota 2</option>
                    </select>
                  </div>

                  {/* USERNAME */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="username"
                      className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide"
                    >
                      Your Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your in-game username"
                      className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                      hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    />
                  </div>

                  {/* RANK */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="rank"
                      className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide"
                    >
                      Your Rank
                    </label>
                    <select
                      id="rank"
                      className="border border-white/20 bg-gray-900/80 text-white px-4 py-3 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914]
                      hover:border-[#00e5ff]/50 transition-all duration-300 font-medium"
                    >
                      <option value="">Select Rank</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="pro">Pro</option>
                    </select>
                  </div>

                  {/* TERMS */}
                  <div className="flex items-center gap-3 select-none">
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
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444]
                      text-white text-lg font-black py-4 rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.6)]
                      transition-all duration-300 tracking-tight uppercase"
                  >
                    Find Match
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT MATCHES */}
            <div
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

              <div className="space-y-4 md:space-y-5">
                {matchs.slice(0,3).map((match, id) => {
                  const hasJoined = joined.some(j => j === match._id || j._id === match._id);
                  return (
                    <div
                      key={id}
                      className="rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-5 md:p-6 border border-white/10
                      shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-[#e50914]/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xl font-black text-white tracking-tight">
                              {match.game}
                            </h4>
                          </div>
                          <p className="text-xs text-[#00e5ff] font-semibold uppercase tracking-wider">
                            {match.mode}
                          </p>
                        </div>

                        <span className="inline-block px-3 py-1 rounded-lg bg-[#e50914]/20 border border-[#e50914]/50 text-[#ff6b6b] font-black text-xs uppercase tracking-wider">
                          {match.time}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                        <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Map</p>
                          <p className="text-sm font-bold text-white">{match.map}</p>
                        </div>

                        <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Players</p>
                          <p className="text-sm font-bold text-[#00e5ff]">
                            {match.joined}/{match.total}
                          </p>
                        </div>

                        <div className="bg-gray-900/60 rounded-xl p-3 border border-white/5">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Prize</p>
                          <p className="text-sm font-bold text-[#e50914]">{match.prize}</p>
                        </div>
                      </div>

                      <button
                        disabled={hasJoined || match.status !== "upcomming"}
                        onClick={e => {
                          e.stopPropagation();
                          handlejoin(match);
                        }}
                        className={`w-full py-2 rounded-lg text-sm font-bold uppercase ${hasJoined
                          || match.status !== "upcomming"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#e50914] to-red-700 text-white"
                          }`}
                      >
                        {match.status === "upcomming"
                          ? hasJoined
                            ? "Joined"
                            : "Join"
                          : "Not available"}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
