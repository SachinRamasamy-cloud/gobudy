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

    const [tournaments, setTournaments] = useState([])
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState("All");
    const [join, setjoin] = useState(false)
    const joined = user?.joined || [];


    const progress = (tournaments.joined / tournaments.total) * 100;
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // videos to show
    const current = tournaments.slice(firstIndex, lastIndex);

    // total pages
    const totalPages = Math.ceil(tournaments.length / itemsPerPage);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");
    const [mode, setMode] = useState("create"); // "create" or "join"

    const [selectedMatch, setSelectedMatch] = useState(null);


    const handleOpenModal = (matchObj) => {
        setSelectedMatch(matchObj);
        setIsModalOpen(true);
        setStep(1);
        setTeamName("");
        setTeamCode("");
        setMode("create");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStep(1);
        setTeamName("");
        setTeamCode("");
        setMode("create");
        setSelectedMatch(null);
    };

    // Load user
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const localUser = JSON.parse(storedUser);

        getUserById(localUser._id)
            .then((res) => {
                const safeUser = {
                    ...res.data,
                    joined: res.data.joined || [],
                    wallet: res.data.wallet || 0,
                };
                setUser(safeUser);
            })
            .catch((err) => console.log("User fetch failed", err));
    }, []);

    // Load matches
    const loadData = async () => {
        const res = await getAllTournaments();
        setTournaments(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    // JOIN / CREATE TEAM LOGIC
    const handleJoin = async () => {
        if (!selectedMatch) return alert("Tournment not selected!");

        // Wallet check
        if (user.wallet < Number(selectedMatch.fee)) {
            return alert("Not enough wallet balance");
        }

        const updatedMatch = { ...selectedMatch };
        const updatedUser = { ...user, joined: [...user.joined, selectedMatch._id], wallet: user.wallet - Number(selectedMatch.fee) };

        if (mode === "join") {
            if (!teamCode.trim()) return alert("Enter team code");

            const team = updatedMatch.teams.find((t) => t.teamCode === teamCode.toUpperCase());
            if (!team) return alert("Invalid team code");
            if (team.isFull) return alert("Team is full");

            if (team.members.includes(user._id)) return alert("You already joined this team");

            team.members.push(user._id);
            if (team.members.length >= 5) team.isFull = true; // max team size
        } else {
            // Create new team
            if (!teamName.trim()) return alert("Enter team name");

            const newTeam = {
                teamName,
                leader: user._id,
                members: [user._id],
                teamCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
                isFull: false,
            };

            updatedMatch.teams.push(newTeam);
        }

        updatedMatch.joined = Number(updatedMatch.joined) + 1;

        try {
            await updTournament(updatedMatch._id, updatedMatch);
            await updUser(user._id, updatedUser);

            setTournaments((prev) => prev.map((m) => (m._id === selectedMatch._id ? updatedMatch : m)));
            setUser(updatedUser);

            alert(mode === "join" ? "Joined team successfully!" : "Team created & joined successfully!");
            handleCloseModal();
        } catch (err) {
            console.log(err);
            alert("Failed to join match");
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
                {tournaments.length === 0 ? (
                    <div className="flex text-center text-white justify-center">
                        No Tournament right now
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {current.map((t, i) => {

                            // ✅ FIX: logic must be here, NOT inside JSX
                            const hasJoined = joined.some(j => j === t._id || j?._id === t._id);

                            return (
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
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

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

                                        <p className="text-gray-300 text-xs flex items-center gap-2 font-medium">
                                            <i className="fa-regular fa-calendar text-[#00e5ff] text-xs"></i>
                                            <span>{t.date} · 4:00 PM IST</span>
                                        </p>

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

                                        <div>
                                            <p className="text-gray-400 text-xs">
                                                <span className="text-[#00e5ff] font-semibold">Mode:</span> {t.mode}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                <span className="text-[#00e5ff] font-semibold">Entry Fee:</span> ₹{t.fee}
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide">Registration</p>
                                            <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-red-600 to-red-800"
                                                    style={{ width: `${(t.joined / t.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-2 mt-4">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleOpenModal(t);
                                                }}
                                                disabled={user && t.teams.some(team => team.members.includes(user._id))}
                                                className={`w-full py-2 font-black rounded-lg transition-all active:scale-[0.98] shadow-lg ${user && t.teams.some(team => team.members.includes(user._id))
                                                    ? "bg-gray-500 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700 shadow-red-900/20"
                                                    } text-white`}
                                            >
                                                {user && t.teams.some(team => team.members.includes(user._id)) ? "Joined" : "Register"}
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/tournament/${t._id}`);
                                                }}
                                                className="w-full py-2 rounded-lg font-bold text-xs uppercase tracking-wide
                                    bg-black/40 hover:bg-black/60 text-white border border-white/20 transition"
                                            >
                                                Details
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}


                {/* Pages */}
                < div className="flex justify-center gap-3 mt-12" >

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
            {/* Modal */}
            {isModalOpen && selectedMatch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-8 relative shadow-2xl">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>

                        {step === 1 ? (
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaGamepad size={30} />
                                </div>
                                <h3 className="text-2xl font-black mb-2">Join Confirmation</h3>
                                <p className="text-neutral-400 mb-8 text-sm">
                                    Review match rules before confirming your registration.
                                </p>
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-900/40"
                                >
                                    Confirm Registration
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex gap-4 mb-6">
                                    <button
                                        className={`flex-1 py-2 rounded-xl font-bold ${mode === "create" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400"
                                            }`}
                                        onClick={() => setMode("create")}
                                    >
                                        Create Team
                                    </button>
                                    <button
                                        className={`flex-1 py-2 rounded-xl font-bold ${mode === "join" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400"
                                            }`}
                                        onClick={() => setMode("join")}
                                    >
                                        Join Team
                                    </button>
                                </div>

                                {mode === "create" ? (
                                    <div className="mb-6">
                                        <label className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block tracking-widest">
                                            Enter Squad Name
                                        </label>
                                        <input
                                            type="text"
                                            autoFocus
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            placeholder="E.g. RED_ZONE_ELITE"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <label className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block tracking-widest">
                                            Enter Team Code
                                        </label>
                                        <input
                                            type="text"
                                            autoFocus
                                            value={teamCode}
                                            onChange={(e) => setTeamCode(e.target.value)}
                                            placeholder="E.g. ABC123"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                )}
                                {/* 
                            <button
                              onClick={handleJoin}
                              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all disabled:opacity-30 disabled:grayscale"
                            >
                              Finalize Entry
                            </button> */}
                                <button
                                    onClick={handleJoin}
                                    disabled={
                                        (mode === "create" && !teamName.trim()) ||
                                        (mode === "join" && !teamCode.trim()) ||
                                        selectedMatch.teams.some(team => team.members.includes(user._id))
                                    }
                                    className={`w-full py-4 ${selectedMatch.teams.some(team => team.members.includes(user._id))
                                        ? "bg-green-600 hover:bg-green-600"
                                        : "bg-blue-600 hover:bg-blue-700"
                                        } text-white font-black rounded-xl transition-all disabled:opacity-30 disabled:grayscale`}
                                >
                                    {selectedMatch.teams.some(team => team.members.includes(user._id)) ? "Joined" : "Finalize Entry"}
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </section >
    )
}
