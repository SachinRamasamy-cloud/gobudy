import React, { useEffect, useState } from 'react';
import { getAllTournaments, getTournamentById, updTournament, delTournament, updateTournamentStatus, winTournament, addTournament, getUserById, updUser } from '../../server/server';
import { useNavigate } from 'react-router-dom';

// Table header helper
const Th = ({ children, className = "" }) => (
    <th className={`p-4 font-semibold text-gray-600 text-sm ${className}`}>{children}</th>
);

// Table cell helper
const Td = ({ children, className = "" }) => (
    <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

export default function Admtournment() {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [winTeam, setWinTeam] = useState("");
    const [status, setStatus] = useState("");
    const [loadingMatch, setLoadingMatch] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newMatch, setNewMatch] = useState({
        game: "",
        name: "",
        prize: "",
        fee: "",
        total: "",
        joined: "0",
        date: "",
        mode: "",
        status: "upcoming",
        teams: []
    });
    const navigate = useNavigate()
    // save new match
    const saveNewMatch = async () => {
        try {
            // Prepare teams if needed (empty for now)
            const matchData = { ...newMatch, teams: [], joinedP: [] };
            await addTournament(matchData); // make sure addMatch is imported from server
            alert("Match added successfully!");
            setShowAddPopup(false);
            setNewMatch({
                img: "",
                game: "",
                name: "",
                prize: "",
                fee: "",
                total: "",
                joined: "0",
                date: "",
                mode: "",
                status: "upcoming",
                teams: [],
                video: [],
                Rules: ""
            });
            loadMatches(); // refresh the list
        } catch (err) {
            console.error(err);
            alert("Failed to add match");
        }
    };

    // Load all matches
    const loadMatches = async () => {
        try {
            const res = await getAllTournaments();
            setMatches(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadMatches();
    }, []);

    // navigate
    const handleDet = (id) => {
        navigate("/admin/tournament-detail", {
            state: { id }
        });

    }

    // Delete match
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this match?")) return;
        try {
            await delTournament(id);
            setMatches(prev => prev.filter(m => m._id !== id));
            alert("Match deleted");
        } catch (err) {
            console.error(err);
            alert("Failed to delete match");
        }
    };

    // Open match popup
    const handleEditClick = async (matchId) => {
        try {
            setLoadingMatch(true);
            const res = await getTournamentById(matchId);
            const match = res.data;
            setSelectedMatch(match);
            setWinTeam(match.winTeam || "");
            setStatus(match.status || "");
            setShowPopup(true);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch match details");
        } finally {
            setLoadingMatch(false);
        }
    };

    // Close all popups
    const closeAllPopups = () => {
        setShowPopup(false);
        setShowWinnerPopup(false);
        setShowStatusPopup(false);
        setSelectedMatch(null);
        setWinTeam("");
        setStatus("");
    };

    // Save winning team & distribute prize
    const saveWinningTeam = async () => {
        if (!selectedMatch || !winTeam) return alert("Select a winning team");

        try {
            await winTournament(selectedMatch._id, { teamId: winTeam });

            const team = selectedMatch.teams.find(t => t._id === winTeam);
            if (!team) throw new Error("Team not found");

            const userIds = [];
            // if (team.leader) userIds.push(team.leader);
            if (team.members && team.members.length > 0) userIds.push(...team.members);

            const prizeAmount = Number(selectedMatch.prize.replace(/₹/, ""));

            for (let userId of userIds) {
                const res = await getUserById(userId);
                const user = res.data;

                const updatedWallet = (user.wallet || 0) + prizeAmount;
                const newTransaction = {
                    userId: user._id,
                    amount: prizeAmount,
                    type: "credit",
                    date: new Date().toISOString(),
                    status: "approved",
                    title: `Prize for ${selectedMatch.game || selectedMatch.name}`,
                    matchId: selectedMatch._id,
                    _id: Date.now().toString() + user._id
                };

                await updUser(user._id, {
                    wallet: updatedWallet,
                    transaction: [...(user.transaction || []), newTransaction]
                });
            }

            alert("Winning team saved and prize distributed!");
            setShowWinnerPopup(false);
            closeAllPopups();
            loadMatches();

        } catch (err) {
            console.error(err);
            alert("Failed to save winning team or update wallets");
        }
    };

    // Save match status
    const saveStatus = async () => {
        if (!selectedMatch) return;

        try {
            await updateTournamentStatus(selectedMatch._id, { status });
            alert("Match status updated");
            setShowStatusPopup(false);
            closeAllPopups();
            loadMatches();

        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };


    return (
        <div className="p-6 min-h-screen bg-white font-sans">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Match Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage eSports match results and status.</p>
                </div>
                <button
                    onClick={() => setShowAddPopup(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm">
                    Add Match
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <Th>Game</Th>
                                <Th>Mode</Th>
                                <Th>Prize & Fee</Th>
                                <Th>Map</Th>
                                <Th>Time</Th>
                                <Th>Players</Th>
                                <Th>Winning Team</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {matches.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-gray-400">
                                        No tournaments found.
                                    </td>
                                </tr>
                            ) : (
                                matches.reverse().map((t) => (
                                    <tr key={t._id}
                                        className="hover:bg-gray-50 transition-colors group">
                                        <Td>
                                            <div className="flex flex-col">
                                                <p className="font-bold text-[18px]">{t.game || "Untitled"} <span className="text-[15px]">({t.status})</span></p>
                                                <p className="text-xs text-gray-500 mt-1">ID: {t._id}</p>
                                            </div>
                                        </Td>
                                        <Td>
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">{t.mode}</span>
                                        </Td>
                                        <Td>
                                            <div className="space-y-1 text-xs">
                                                <div>Prize: ₹{t.prize || '0'}</div>
                                                <div>Fee: {Number(t.fee) > 0 ? `₹${t.fee}` : 'Free'}</div>
                                            </div>
                                        </Td>
                                        <Td>{t.map || "N/A"}</Td>
                                        <Td>{t.time ? new Date(t.time).toLocaleDateString() : "TBA"}</Td>
                                        <Td>{t.joined}/{t.total}</Td>
                                        <Td>
                                            {t.winTeam
                                                ? t.teams.find(team => team._id === t.winTeam)?.teamName || "N/A"
                                                : "Not set"}
                                        </Td>
                                        <Td>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                                    onClick={() => handleEditClick(t._id)}
                                                >
                                                    {loadingMatch ? 'Loading...' : 'Edit'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(t._id)}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleDet(t._id)}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </Td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {showAddPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-5 w-96">
                                <h2 className="text-xl font-bold mb-4">Add New Match</h2>

                                <div className="space-y-3 text-sm">
                                    <input
                                        type="text"
                                        placeholder="Game"
                                        value={newMatch.game}
                                        onChange={e => setNewMatch({ ...newMatch, game: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Match Name"
                                        value={newMatch.name}
                                        onChange={e => setNewMatch({ ...newMatch, name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Prize"
                                        value={newMatch.prize}
                                        onChange={e => setNewMatch({ ...newMatch, prize: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fee"
                                        value={newMatch.fee}
                                        onChange={e => setNewMatch({ ...newMatch, fee: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Total Players"
                                        value={newMatch.total}
                                        onChange={e => setNewMatch({ ...newMatch, total: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        value={newMatch.date}
                                        onChange={e => setNewMatch({ ...newMatch, date: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Mode"
                                        value={newMatch.mode}
                                        onChange={e => setNewMatch({ ...newMatch, mode: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                        value={newMatch.status}
                                        onChange={e => setNewMatch({ ...newMatch, status: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="finished">Finished</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowAddPopup(false)}>Cancel</button>
                                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg" onClick={saveNewMatch}>Add Match</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Match Popup */}
                    {showPopup && selectedMatch && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-80 rounded-xl shadow-lg p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">{selectedMatch.game}</h2>
                                    <i className="fa-solid fa-xmark cursor-pointer" onClick={closeAllPopups}></i>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm">Choose an action:</p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                                        onClick={() => setShowWinnerPopup(true)}
                                    >
                                        Set Winning Team & Award Prize
                                    </button>
                                    <button
                                        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                                        onClick={() => setShowStatusPopup(true)}
                                    >
                                        Change Status (Current: {selectedMatch.status})
                                    </button>
                                    <div className="flex justify-end mt-2">
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={closeAllPopups}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Winner Popup */}
                    {showWinnerPopup && selectedMatch && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-5 w-96">
                                <h2 className="text-xl font-bold mb-4">Select Winning Team</h2>
                                <label className="block mb-2 text-sm font-medium">Winning Team</label>
                                <select
                                    value={winTeam}
                                    onChange={(e) => setWinTeam(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-sm"
                                >
                                    <option value="">Select Team</option>
                                    {selectedMatch.teams.map(team => (
                                        <option key={team._id} value={team._id}>
                                            {team.teamName} (Leader: {team.leader?.name || "N/A"})
                                        </option>
                                    ))}
                                </select>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowWinnerPopup(false)}>Back</button>
                                    <button
                                        className="px-5 py-2 bg-green-600 text-white rounded-lg"
                                        onClick={saveWinningTeam}
                                        disabled={!winTeam}
                                    >
                                        Save Winner
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Status Popup */}
                    {showStatusPopup && selectedMatch && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-5 w-80">
                                <h2 className="text-xl font-bold mb-4">Change Match Status</h2>
                                <label className="block mb-2 text-sm font-medium">New Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-sm"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowStatusPopup(false)}>Back</button>
                                    <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg" onClick={saveStatus}>Save Status</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
