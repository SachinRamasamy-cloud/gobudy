import Reveal from "../Reveal";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import {
    getAllTournaments,
    updTournament,
    getUserById,
    updUser
} from '../../server/server.js'
import { Link, useNavigate } from "react-router-dom";

export default function Tounmat() {
    const ACCENT = "#E50914"; // red accent
    const SECONDARY = "#3B82F6"; // blue secondary
    const BG = "#0d0d0d"; //bg color



    const [tournaments, setTournaments] = useState([])
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState("All");
    const [join, setjoin] = useState(false)
    const joined = user?.joined || [];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const localUser = JSON.parse(storedUser);
        console.log(localUser._id)
        getUserById(localUser._id)
            .then(res => {
                // ensure joined exists
                const safeUser = {
                    ...res.data,
                    joined: res.data.joined || [], // default empty array
                    wallet: res.data.wallet || 0,  // default 0 if missing
                };
                setUser(safeUser);
            })
            .catch(err => console.log("User fetch failed", err));
    }, []);

    useEffect(() => {
    }, []);

    // Load tournaments
    useEffect(() => {
        getAllTournaments()
            .then(res => {
                const upcomming = res.data.filter((t) => t.status === "upcomming");
                setTournaments(upcomming);
            })
            .catch(err => console.log("Tournaments fetch failed", err));
    }, []);


    // // JOIN TOURNAMENT
    const handleJoin = async (t) => {

        const hasJoined = t.joinedP.some(p => String(p._id) === String(user._id));
        if (hasJoined) {
            alert("Already joined this tournament");
            return;
        }

        if (user.wallet < t.fee) {
            alert("Not enough wallet balance");
            return;
        }

        const updatedTournament = {
            ...t,
            joined: t.joined + 1,
            joinedP: [...t.joinedP.map(p => p._id || p), user._id]
        };

        const updatedUser = {
            ...user,
            wallet: user.wallet - t.fee,
            joined: [...user.joined, t._id]
        };

        try {
            await updUser(user._id, updatedUser);
            await updTournament(t._id, updatedTournament);

            setUser(updatedUser);
            setTournaments(prev =>
                prev.map(item => item._id === t._id ? updatedTournament : item)
            );

            alert("Joined Successfully!");
        } catch (error) {
            console.log("failed problem", error);
            alert("Join failed");
        }
    };

    const navigate = useNavigate();

    return (
        <section className='py-16 px-6 md:px-10'>
            {/* header */}
            <Reveal>
                <div
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
                    <Link to="/tournaments">
                        <a
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm text-white/90 px-5 py-2.5 rounded-lg border border-[#e50914]/30 hover:border-[#e50914] hover:bg-[#e50914]/10 transition-all font-semibold"
                        >
                            View all →
                        </a>

                    </Link>
                </div>
            </Reveal>
            <Reveal>
                {tournaments.length === 0 ? (
                    <div className="flex text-center text-white flex justify-center">No Tournament right now</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            {tournaments.slice(0, 3).map((t, i) => {
                                const hasJoined = joined.some(j => j === t._id || j._id === t._id);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => navigate(`/tournament/${t._id}`)}
                                        className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-white/10 cursor-pointer"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative h-[150px] overflow-hidden">
                                            <img
                                                src={t.img}
                                                alt={t.game}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                                            <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold bg-[#00e5ff]">
                                                {t.game}
                                            </span>
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-5 space-y-3">
                                            <h3 className="text-lg font-bold text-white">{t.name}</h3>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
                                                    <p className="text-gray-400 text-xs uppercase">Prize</p>
                                                    <h4 className="text-white font-bold text-lg">₹{t.prize}</h4>
                                                </div>

                                                <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
                                                    <p className="text-gray-400 text-xs uppercase">Players</p>
                                                    <h4 className="text-white font-bold text-lg">
                                                        {t.joined}/{t.total}
                                                    </h4>
                                                </div>
                                            </div>

                                            <p className="text-gray-400 text-xs uppercase">
                                                Entry Fee: <span className="text-white font-bold">₹{t.fee}</span>
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 pt-2">
                                                <button
                                                    disabled={hasJoined || t.status !== "upcomming"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleJoin(t);
                                                    }}
                                                    className={`w-full py-2 rounded-lg text-sm font-bold uppercase ${hasJoined || t.status !== "upcomming"
                                                        ? "bg-gray-500 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-[#e50914] to-red-700 text-white"
                                                        }`}
                                                >
                                                    {t.status === "upcomming"
                                                        ? hasJoined
                                                            ? "Joined"
                                                            : "Join"
                                                        : "Not available"}
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/tournament/${t._id}`);
                                                    }}
                                                    className="w-full py-2 rounded-lg text-sm font-bold uppercase bg-black/40 text-white border border-white/20"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </>
                )}
            </Reveal>

        </section >
    )
}
