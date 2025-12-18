import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getTournamentById,
    updTournament,
    getUserById,
    updUser,
    getAllTournaments
} from "../../server/server.js";
import { FaGamepad, FaTimes } from "react-icons/fa";
import Reveal from "../Reveal.jsx";

export default function Tdet() {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [tournaments, setTournaments] = useState(null);
    const [showPlayers, setShowPlayers] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [rules, setrule] = useState(false)
    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");
    const [mode, setMode] = useState("create"); // "create" or "join"

    const [user, setUser] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const joined = user?.joined || [];
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

    useEffect(() => {
        getTournamentById(id).then(res => setTournament(res.data));
    }, [id]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const localUser = JSON.parse(storedUser);

        getUserById(localUser._id)
            .then(res => {
                setUser({
                    ...res.data,
                    joined: res.data.joined || [],
                    wallet: res.data.wallet || 0,
                });
            })
            .catch(err => console.log("User fetch failed", err));
    }, []);

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

            // setTournaments((prev) => prev.map((m) => (m._id === selectedMatch._id ? updatedMatch : m)));
            setUser(updatedUser);

            alert(mode === "join" ? "Joined team successfully!" : "Team created & joined successfully!");
            handleCloseModal();
        } catch (err) {
            console.log(err);
            alert("Failed to join match");
        }
    };

    if (!tournament) {
        return <div className="text-center text-gray-500">Loading tournament...</div>;
    }


    const info = [
        { label: "Prize Pool", value: `₹${tournament.prize}` },
        { label: "Entry Fee", value: `₹${tournament.fee}` },
        { label: "Team / Mode", value: tournament.mode },
        { label: "Date", value: tournament.date },
        { label: "Time", value: tournament.time || "4:00 PM IST" },
        { label: "Total Players", value: `${tournament.joined} / ${tournament.total}` },
    ];

    const progress = (tournament.joined / tournament.total) * 100;

    return (
        <section className="px-6 md:px-12 py-14 bg-[#0d0d0d] min-h-screen text-white">

            {/* BACK */}
            <button
                onClick={() => window.history.back()}
                className="mb-10 text-sm px-4 py-2 border border-white/20 rounded-lg hover:border-white/40 transition"
            >
                ← Back
            </button>

            <Reveal>
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT IMAGE */}
                    <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                        <img
                            src={tournament.img}
                            className="w-full h-[380px] object-cover"
                            alt="Tournament"
                        />
                    </div>

                    {/* RIGHT DETAILS */}
                    <div className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                {tournament.name}
                            </h1>
                            <span className="block text-2xl text-[#E50914] mt-1 font-semibold">
                                {tournament.game}
                            </span>

                            {/* Tag */}
                            <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-md bg-[#3B82F6]">
                                {tournament.mode}
                            </span>
                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {info.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gray-900/50 rounded-xl border border-white/10"
                                >
                                    <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-1">
                                        {item.label}
                                    </p>
                                    <h3 className="text-lg font-semibold">{item.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {tournament.desc ||
                                "A competitive esports tournament where players battle for rankings and glory."}
                        </p>
                    </div>
                </div>
            </Reveal>
            <Reveal>
                {/* PROGRESS */}
                <div className="mt-14 bg-gray-900/60 border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-400 text-xs uppercase font-semibold">
                            Registration Progress
                        </p>
                        <span className="text-[#E50914] text-sm font-bold">
                            {progress.toFixed(0)}%
                        </span>
                    </div>

                    <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="absolute left-0 h-full bg-gradient-to-r from-red-600 to-red-800"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                {tournament.status === "upcomming" && (
                    <div className="mt-10 bg-gray-900/60 border border-white/10 rounded-xl">
                        <button
                            onClick={() => setShowPlayers(!showPlayers)}
                            className="w-full text-left px-6 py-4 text-white font-semibold flex justify-between"
                        >
                            Joined Teams
                            <span>{showPlayers ? "▲" : "▼"}</span>
                        </button>

                        {showPlayers && (
                            <div className="px-6 pb-4">
                                {tournament.teams && tournament.teams.length > 0 ? (
                                    <ul className="space-y-2">
                                        {tournament.teams.map((uid, idx) => (
                                            <li key={idx} className="text-gray-300 text-sm border-b border-white/10 pb-2">
                                                Teams: {uid.teamName}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm">No players have joined yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Reveal>
            <Reveal>
                {/* BUTTONS */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4  mb-10">
                    <button
                        onClick={() => {
                            handleOpenModal(tournament);
                        }}
                        disabled={user && tournament.teams.some(team => team.members.includes(user._id))}
                        className={`
            w-full 
            py-3 
            px-6 
            font-extrabold 
            text-lg 
            rounded-xl 
            shadow-2xl 
            transition-all 
            duration-200 
            active:scale-[0.98]
            sm:flex-1 /* This ensures equal width with the second button */
            ${user && tournament.teams.some(team => team.members.includes(user._id))
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed shadow-none"
                                : "bg-red-600 hover:bg-red-700 shadow-red-800/50 text-white"
                            } 
        `}
                    >
                        {user && tournament.teams.some(team => team.members.includes(user._id)) ?
                            <i className="fa-solid fa-check mr-2"></i> :
                            <i className="fa-solid fa-plus-circle mr-2"></i>
                        }
                        {
                            tournament.status === "finished"
                                ? "Tournament Finished"
                                : tournament.status === "ongoing"
                                    ? "Tournament Ongoing"
                                    : user && tournament.teams.some(team => team.members.includes(user._id))
                                        ? "Joined"
                                        : "Register Now"
                        }

                    </button>

                    <button
                        onClick={() => setrule(true)}
                        className="
            sm:flex-1 
            py-3 
            px-6 
            rounded-xl 
            bg-transparent 
            border-2 
            border-white/20 
            hover:bg-white/10 
            hover:border-white/40
            text-white 
            font-semibold 
            tracking-wide 
            text-sm 
            uppercase
            transition-all 
            duration-200
        "
                    >
                        {/* Font Awesome Icon */}
                        <i className="fa-solid fa-book-open mr-2"></i>
                        View Rules
                    </button>
                </div>
            </Reveal>
            <Reveal>
                {/* Header */}
                <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
                >
                    <div>
                        <h2
                            id="videos-heading"
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                        >
                            Tournment
                            <span
                                className="ml-3 block md:inline text-red-600"
                            >
                                Highlight
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-3 max-w-2xl">Watch live esports action and never miss a moment from your favorite tournaments</p>
                    </div>
                </div>
            </Reveal>
            {/* Grid */}
            <Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {tournament.video.map((v, i) => (
                        <article
                            key={v.id}
                            className="group w-full rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer"
                            aria-labelledby={`video-${v.id}-title`}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-white/10 hover:border-[#e50914]/50 shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all">
                                {/* thumbnail */}
                                <img
                                    src={v.thumb}
                                    className="w-full h-[240px] object-cover transition-transform duration-500"
                                />

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60"></div>

                                {/* center play button */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition-all duration-300"
                                    aria-hidden
                                >
                                    <button
                                        type="button"
                                    >
                                        <i className="fa-solid fa-play ml-1 text-lg" />
                                    </button>
                                </div>

                                {/* bottom-right duration */}
                                <div
                                    className="absolute bottom-4 right-4"
                                >
                                    <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-white/10">
                                        {v.duration}
                                    </span>
                                </div>
                                <div
                                    className="absolute top-4 right-4"
                                >
                                    <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 bg-red-500 rounded-lg shadow-lg border border-white/10">
                                        {v.tag}
                                    </span>
                                </div>

                            </div>

                            {/* content */}
                            <div
                                className="p-6 space-y-4 bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-sm"
                            >
                                <h3
                                    id={`video-${v.id}-title`}
                                    className="text-lg font-bold text-white leading-snug group-hover:text-[#e50914] transition-colors"
                                >
                                    {v.title}
                                </h3>

                                <div
                                    className="flex items-center justify-between gap-2 text-xs text-gray-300 pt-2"
                                >
                                    <span className="flex items-center gap-2 font-medium">
                                        <i className="fa-regular fa-calendar" style={{ color: "#00e5ff" }} />
                                        <span className="text-white/80">{v.date}</span>
                                    </span>

                                    <span className="hidden sm:flex items-center gap-1 text-[#00e5ff] font-semibold">
                                        <i className="fa-solid fa-eye text-xs" /> 24.8k
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Reveal>
            <Reveal>
                {/* Heading unchanged: Clear and punchy */}
                <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-10 mb-12"
                >
                    <div>
                        <h2
                            id="videos-heading"
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                        >
                            Top Ranking
                            <span className="ml-3 block md:inline text-red-600">
                                Team
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    <div className="flex justify-center items-end min-h-[420px] relative p-6 md:w-1/2 md:pr-6">
                        {tournament.status === "finished" && (
                            <div className="flex items-end justify-center gap-6 md:gap-10 w-full">

                                {tournament.teams
                                    .filter(team => team.rank <= 3)
                                    .sort((a, b) => a.rank - b.rank)
                                    .map((team) => {

                                        const isMyTeam = team.members?.includes(user?._id);

                                        const rankHeight =
                                            team.rank === 1
                                                ? "h-[260px]"
                                                : team.rank === 2
                                                    ? "h-[200px]"
                                                    : "h-[150px]";

                                        const rankStyle =
                                            team.rank === 1
                                                ? "bg-red-700/70 border-yellow-400 shadow-xl shadow-red-900/40"
                                                : team.rank === 2
                                                    ? "bg-gray-700/70 border-gray-400"
                                                    : "bg-gray-800/70 border-amber-600";

                                        const rankNumberColor =
                                            team.rank === 1
                                                ? "text-yellow-400 text-5xl"
                                                : "text-gray-300 text-3xl";


                                        return (
                                            <div
                                                key={team._id}
                                                className={`relative text-white flex flex-col items-center justify-end rounded-xl p-4
                transition-all duration-300 hover:scale-[1.03]
                w-28 sm:w-36 md:w-40
                ${rankHeight}
                ${rankStyle}
                border-4
                ${isMyTeam ? "ring-4 ring-green-400 scale-105" : ""}
              `}
                                                style={{ order: team.rank === 1 ? 2 : team.rank === 2 ? 1 : 3 }}
                                            >
                                                {/* My Team Badge */}
                                                {isMyTeam && (
                                                    <span className="absolute -top-3 text-xs bg-green-500 text-black px-2 py-1 rounded font-bold">
                                                        MY TEAM
                                                    </span>
                                                )}

                                                {/* Rank */}
                                                <h1 className={`font-extrabold mb-2 flex items-center justify-center ${rankNumberColor}`}>
                                                    {team.rank === 1 && (
                                                        <i className="fa-solid fa-trophy text-yellow-400 text-4xl"></i>
                                                    )}

                                                    {team.rank === 2 && (
                                                        <i className="fa-solid fa-medal text-gray-300 text-3xl"></i>
                                                    )}

                                                    {team.rank === 3 && (
                                                        <i className="fa-solid fa-medal text-amber-500 text-3xl"></i>
                                                    )}
                                                </h1>


                                                {/* Team Name */}
                                                <h3 className="text-center font-bold text-sm sm:text-base px-1">
                                                    {team.teamName}
                                                </h3>

                                                {/* Subtitle */}
                                                <p className={`text-xs mt-1`}>
                                                    Rank {team.rank}
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2 md:pl-4 mt-8 md:mt-0">
                        {tournament.status === "finished" && (
                            <>
                                <h3 className="text-xl font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">
                                    Remaining Ranks
                                </h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">

                                    {tournament.teams
                                        .filter(team => team.rank > 3)
                                        .sort((a, b) => a.rank - b.rank)
                                        .map((team) => {
                                            const isMyTeam = team.members?.includes(user?._id);
                                            return (
                                                <div
                                                    key={team._id}
                                                    className={`flex items-center p-3 rounded-lg transition duration-200 border-l-4
          ${isMyTeam
                                                            ? "bg-green-700/40 border-green-400 ring-2 ring-green-400"
                                                            : "bg-gray-800/50 hover:bg-gray-700/60 border-red-600"}
        `}
                                                >
                                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-red-600 rounded-full mr-4">
                                                        <span className="text-2xl font-black text-white">{team.rank}</span>
                                                    </div>

                                                    <div>
                                                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                                                            {team.teamName}
                                                            {isMyTeam && (
                                                                <span className="text-xs bg-green-500 text-black px-2 py-0.5 rounded font-bold">
                                                                    MY TEAM
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-400">Position: #{team.rank}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                </div>

                                {tournament.teams.filter(team => team.rank > 3).length === 0 && (
                                    <div className="text-center text-gray-500 py-6 bg-gray-800/50 rounded-lg">
                                        <p>Only the Top 3 teams competed in this tournament.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
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

            {/* rules */}
            {rules && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
                    {/* Modal Container: Center content and give it a white background, shadow, and rounded corners */}
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative transform transition-all duration-300 scale-100">

                        {/* Close Button: Positioned absolutely for standard top-right placement */}
                        <button
                            onClick={() => setrule(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-100"
                            aria-label="Close Rules"
                        >
                            <i className="fa-solid fa-xmark text-xl text-red-500"></i>
                        </button>
                        <div className="border-b pb-3 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <i className="fa-solid fa-scroll text-red-600 mr-3"></i>
                                Tournament Rules
                            </h2>
                        </div>

                        {/* Content Area */}
                        <div className="max-h-96 overflow-y-auto pr-2">
                            {/* Rules content goes here */}
                            <div className="text-gray-700 leading-relaxed">
                                {tournament.Rules}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}
