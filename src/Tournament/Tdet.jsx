import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getTournamentById,
    updTournament,
    getUserById,
    updUser,
    getAllTournaments
} from "../../server/server.js";

export default function Tdet() {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [user, setUser] = useState(null);
    const joined = user?.joined || [];
    const [tournaments, setTournaments] = useState([]);
    const [showPlayers, setShowPlayers] = useState(false);

    useEffect(() => {
        getTournamentById(id).then(res => setTournament(res.data));
        getAllTournaments().then(res => setTournaments(res.data));
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
                item._id === t._id ? { ...item, joinedP: joinedP, joined: t.joined + 1 } : item
            ));

            alert("Joined Successfully!");
        } catch (error) {
            console.log(error);
            alert("Join failed");
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
            <div className="mt-10 bg-gray-900/60 border border-white/10 rounded-xl">
                <button
                    onClick={() => setShowPlayers(!showPlayers)}
                    className="w-full text-left px-6 py-4 text-white font-semibold flex justify-between"
                >
                    Joined Players
                    <span>{showPlayers ? "▲" : "▼"}</span>
                </button>

                {showPlayers && (
                    <div className="px-6 pb-4">
                        {tournament.joinedP && tournament.joinedP.length > 0 ? (
                            <ul className="space-y-2">
                                {tournament.joinedP.map((uid, idx) => (
                                    <li key={idx} className="text-gray-300 text-sm border-b border-white/10 pb-2">
                                        User ID: {uid}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm">No players have joined yet.</p>
                        )}
                    </div>
                )}
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6">
                <button
                    onClick={() => handleJoin(tournament)}
                    disabled={joined.includes(tournament._id)}
                    className={`flex-1 py-4 rounded-xl border border-white/20 text-white font-bold tracking-wide
                        ${joined.includes(tournament._id)
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#E50914] to-red-700 hover:from-red-600 hover:to-red-800"
                        }`}
                >
                    {joined.includes(tournament._id) ? "Joined" : "Join Now"}
                </button>

                <button
                    className="flex-1 py-4 rounded-xl border border-white/20 hover:border-white/40
                               text-white font-bold tracking-wider text-sm uppercase"
                >
                    View Rules
                </button>
            </div>

        </section>
    );
}
