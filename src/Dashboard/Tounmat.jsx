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
import { FaGamepad, FaTimes } from "react-icons/fa";

export default function Tounmat() {
    const ACCENT = "#E50914"; // red accent
    const SECONDARY = "#3B82F6"; // blue secondary
    const BG = "#0d0d0d"; //bg color



    const [tournaments, setTournaments] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");
    const [mode, setMode] = useState("create"); // "create" or "join"

    const [user, setUser] = useState(null);
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
                    <Link to="/tournaments">
                        <p
                            className="text-sm text-white/90 px-5 py-2.5 rounded-lg border border-[#e50914]/30 hover:border-[#e50914] hover:bg-[#e50914]/10 transition-all font-semibold"
                        >
                            View all →
                        </p>

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
                                // const hasJoined = joined.some(j => j === t._id || j._id === t._id);
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
