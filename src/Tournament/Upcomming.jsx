import Reveal from "../Reveal";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import {
    getAllTournaments,
    updTournament,
    getUserById,
    updUser
} from '../../server/server.js'
import { useNavigate } from "react-router-dom";

export default function Tounmat() {
    const ACCENT = "#E50914"; // red accent
    const SECONDARY = "#3B82F6"; // blue secondary
    const BG = "#0d0d0d"; //bg color


    const [tournaments, setTournaments] = useState([]);
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState("All");
    const [join, setjoin] = useState(false)
    const joined = user?.joined || [];


    const progress = (tournaments.joined / tournaments.total) * 100;
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const localUser = JSON.parse(storedUser);

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
        getAllTournaments().then(res => setTournaments(res.data));
    }, []);
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // videos to show
    const current = tournaments.slice(firstIndex, lastIndex);

    // total pages
    const totalPages = Math.ceil(tournaments.length / itemsPerPage);


    const handleJoin = async (t) => {
    if (!user) return alert("User not loaded");

    // Check if already joined
    const hasJoined = user.joined.some(j => j._id === t._id || j === t._id);
    if (hasJoined) return alert("Already joined");

    if (user.wallet < t.fee) return alert("Not enough balance");

    // Update joinedP in tournament
    const joinedP = Array.isArray(t.joinedP) ? t.joinedP.map(String) : [];
    if (!joinedP.includes(String(user._id))) joinedP.push(String(user._id));

    try {
        // Update backend
        const updatedUser = {
            ...user,
            wallet: user.wallet - t.fee,
            joined: [...user.joined, t._id]  // <-- push only ID
        };

        const updatedTournament = {
            joined: t.joined + 1,
            joinedP
        };

        await updUser(user._id, updatedUser);
        await updTournament(t._id, updatedTournament);

        setUser(updatedUser);
        setTournaments(prev => prev.map(item =>
            item._id === t._id ? {...item, joinedP: joinedP, joined: t.joined + 1} : item
        ));

        alert("Joined Successfully!");
    } catch (error) {
        console.log(error);
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

                </div>
            </Reveal>
            <Reveal>
                {/* grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {current.map((t, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/tournament/${t._id}`)}
                            className="cursor-pointer w-full rounded-2xl overflow-hidden
                 bg-[#0f0f0f] border border-white/10 shadow-lg hover:border-[#e50914]/40 
                 transition-all duration-300"
                        >
                            {/* IMAGE */}
                            <div className="relative h-[220px] overflow-hidden">
                                <img
                                    src={t.img}
                                    alt={t.game}
                                    className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                                />

                                {/* Dark Bottom Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

                                {/* GAME TAG */}
                                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-lg
                         bg-[#e50914] text-white shadow-md">
                                    {t.game}
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div className="p-5 space-y-4">

                                <h3 className="text-lg font-bold text-white leading-tight">
                                    {t.name}
                                </h3>

                                {/* DATE */}
                                <p className="text-gray-300 text-xs flex items-center gap-2 font-medium">
                                    <i className="fa-regular fa-calendar text-[#00e5ff] text-xs"></i>
                                    <span>{t.date} · 4:00 PM IST</span>
                                </p>

                                {/* GRID STATS */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-900/40 rounded-lg border border-white/10">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">Prize</p>
                                        <h4 className="text-white text-lg font-semibold">₹{t.prize}</h4>
                                    </div>

                                    <div className="p-3 bg-gray-900/40 rounded-lg border border-white/10">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">Players</p>
                                        <h4 className="text-white text-lg font-semibold">{t.joined}/{t.total}</h4>
                                    </div>
                                </div>

                                {/* Mode & Fee */}
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        <span className="text-[#00e5ff] font-semibold">Mode:</span> {t.mode}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        <span className="text-[#00e5ff] font-semibold">Entry Fee:</span> ₹{t.fee}
                                    </p>
                                </div>

                                {/* PROGRESS BAR */}
                                <div className="mt-2">
                                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide">Registration</p>
                                    <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 to-red-800"
                                            style={{ width: `${(t.joined / t.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* BUTTONS */}
                                <div className="grid grid-cols-2 gap-3 pt-2 mt-4">

                                    <button
                                        disabled={joined.includes(t.id)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleJoin(t);
                                        }}
                                        className={`
              w-full py-4 rounded-lg font-bold text-xs uppercase tracking-wide
              transition-all duration-300
              ${joined.includes(t._id)
                                                ? "bg-gray-500 text-white cursor-not-allowed"
                                                : "bg-gradient-to-r from-[#e50914] to-red-700 hover:from-red-600 hover:to-red-800 text-white"}
            `}
                                    >
                                        {joined.includes(t._id) ? "Joined" : "Join"}
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/tournament/${t.id}`);
                                        }}
                                        className="w-full py-2 rounded-lg font-bold text-xs uppercase tracking-wide
                       bg-black/40 hover:bg-black/60 text-white border border-white/20 transition"
                                    >
                                        Details
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Pages */}
                <div className="flex justify-center gap-3 mt-12">

                    {/* Prev */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                    >
                        Prev
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg font-semibold ${currentPage === i + 1
                                ? "bg-red-600 text-white shadow-lg"
                                : "bg-gray-900 text-gray-300 border border-gray-700"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                    >
                        Next
                    </button>
                </div>

            </Reveal>
        </section >
    )
}
