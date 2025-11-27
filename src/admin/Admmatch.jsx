import React, { useEffect, useState } from 'react';
import { getAllMatches, delMatch, winMatch, statMatch, getMatchById, updUser, getUserById } from '../../server/server';

const Th = ({ children, className = "" }) => (
    <th className={`p-4 font-semibold text-gray-600 text-sm ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }) => (
    <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

export default function Admmatch({ users }) {
    const [match, setmatch] = useState([]);
    const [ShowPopup, setShowPopup] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);
    const [showStatusPopup, setShowStatusPopup] = useState(false);

    // Winner state
    const [win1, setWin1] = useState("");
    const [win2, setWin2] = useState("");
    const [win3, setWin3] = useState("");

    // Status state
    const [status, setStatus] = useState("");

    // Load matches
    const loaddata = async () => {
        try {
            const res = await getAllMatches();
            setmatch(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loaddata();
    }, []);

    // Delete match
    const handleDelete = async (id) => {
        await delMatch(id);
        alert("Deleted");
        setmatch(prev => prev.filter(v => v._id !== id));
    };
    const [loadingMatch, setLoadingMatch] = useState(false);


    // const saveWinners = async () => {
    //     if (!selectedMatch) return;

    //     try {
    //         // 1️⃣ Update match winners
    //         await winMatch(selectedMatch._id, { win1, win2, win3 });

    //         // 2️⃣ Find the winner users
    //         const winnerIds = [win1, win2, win3].filter(Boolean);
    //         const winnerUsers = winnerIds
    //             .map(idOrName => selectedMatch.joinedP.find(u => u._id === idOrName || u.name === idOrName))
    //             .filter(Boolean);

    //         // 3️⃣ Update wallets
    //         for (let user of winnerUsers) {
    //             const updatedWallet = (user.wallet || 0) + Number(selectedMatch.prize);
    //             const updatedTransactions = (user.transaction || []).map(txn =>
    //                 txn.amount === Number(selectedMatch.prize) && txn.userId === user._id
    //                     ? { ...txn, status: "approved" } // update the transaction
    //                     : txn
    //             );

    //             await updUser(user._id, {
    //                 ...user,
    //                 wallet: updatedWallet,
    //                 transaction: updatedTransactions,
    //             });

    //         }

    //         // 4️⃣ Close popups and reload
    //         setShowWinnerPopup(false);
    //         setShowPopup(false);
    //         loaddata();

    //     } catch (err) {
    //         console.error("Failed to save winners or update wallets:", err);
    //         alert("Failed to save winners or update wallets");
    //     }
    // };


    // Save status

    const saveWinners = async () => {
        if (!selectedMatch) return;

        try {
            // 1️⃣ Update match winners
            await winMatch(selectedMatch._id, { win1, win2, win3 });

            // 2️⃣ Collect the selected winner IDs
            const winnerIds = [win1, win2, win3].filter(Boolean);

            // 3️⃣ Map input values to actual user objects in joinedP
            const winnerUsers = winnerIds
                .map(idOrName => selectedMatch.joinedP.find(u => u._id === idOrName || u.name === idOrName))
                .filter(Boolean); // remove any unmatched

            // 4️⃣ Update wallets and transactions
            for (let user of winnerUsers) {
                const updatedWallet = (user.wallet || 0) + Number(selectedMatch.prize);
                const newTransaction = {
                    userId: user._id,
                    amount: Number(selectedMatch.prize),
                    type: "credit",
                    date: new Date().toISOString(),
                    fee: 0, // or any fee if needed
                    total: Number(selectedMatch.prize), // or include fee
                    status: "approved",
                    title: `Prize for ${selectedMatch.name}`,
                    matchId: selectedMatch._id,
                    _id: new Date().getTime().toString(), // temporary ID if needed
                };
                
                const updatedTransactions = [...(user.transaction || []), newTransaction];
                // Update user in database
                await updUser(user._id, {
                    ...user,
                    wallet: updatedWallet,
                    transaction: updatedTransactions,
                });
            }

            // 5️⃣ Close popups and reload data
            setShowWinnerPopup(false);
            setShowPopup(false);
            loaddata();

        } catch (err) {
            console.error("Failed to save winners or update wallets:", err);
            alert("Failed to save winners or update wallets");
        }
    };

    const saveStatus = async () => {
        if (!selectedMatch) return;
        try {
            await statMatch(selectedMatch._id, { status });
            setShowStatusPopup(false);
            setShowPopup(false);
            loaddata();
        } catch (err) {
            console.error("Failed to save status:", err);
            alert("Failed to save status");
        }
    };
    const handleEditClick = async (matchId) => {
        try {
            setLoadingMatch(true); // start loading
            const res = await getMatchById(matchId); // fetch populated match
            console.log("Fetched match:", res.data); // debug: check what comes
            setSelectedMatch(res.data);
            setShowPopup(true);
        } catch (err) {
            console.error("Failed to fetch match:", err);
        } finally {
            setLoadingMatch(false); // stop loading
        }
    };

    return (
        <div>
            <div className="p-6 min-h-screen bg-white font-sans">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
                        <p className="text-gray-500 text-sm mt-1">Create and manage eSports videos</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Add Video
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <Th>Game</Th>
                                    <Th>Mode</Th>
                                    <Th>Prize & fee</Th>
                                    <Th>Map</Th>
                                    <Th>Time</Th>
                                    <Th>Players</Th>
                                    <Th>Winners</Th>
                                    <Th className="text-right">Actions</Th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {match.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="p-8 text-center text-gray-400">
                                            No tournaments found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    match.reverse().map((t) => (
                                        <tr key={t._id} className="hover:bg-gray-50 transition-colors group">
                                            <Td>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="font-bold text-[18px] text-gray-900">
                                                            {t.game || "Untitled Tournament"} <span className='text-[15px]'>({t.status})</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">ID: {t._id}</p>
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td>
                                                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                                                    {t.mod}
                                                </span>
                                            </Td>
                                            <Td>
                                                <div className="space-y-1">
                                                    <div className="text-xs font-medium text-gray-500 uppercase">Prize</div>
                                                    <div className="font-bold text-green-600">{t.prize || '₹0'}</div>
                                                    <div className="text-xs text-gray-400">Fee: {Number(t.fee) > 0 ? `₹${t.fee}` : 'Free'}</div>
                                                </div>
                                            </Td>
                                            <Td>
                                                <span className="px-2.5 py-1 text-gray-700 rounded-md text-xs font-semibold">{t.map}</span>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <i className="fa-regular fa-calendar text-xs"></i>
                                                    <span>{t.time ? new Date(t.time).toLocaleDateString() : 'TBA'}</span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <span className="px-2.5 py-1 text-gray-700 rounded-md text-xs font-semibold">{t.joined}/{t.total}</span>
                                            </Td>
                                            <Td>
                                                <div className="flex flex-col gap-2 justify-center">
                                                    <h1 className="px-2.5 py-1 text-gray-700 rounded-md text-xs font-semibold">
                                                        <span className='font-bold text-black'>Winner 1:</span> {t.win1 ? t.win1 : "not set"}
                                                    </h1>
                                                    <h1 className="px-2.5 py-1 text-gray-700 rounded-md text-xs font-semibold">
                                                        <span className='font-bold text-black'>Winner 2:</span> {t.win2 ? t.win2 : "not set"}
                                                    </h1>
                                                    <h1 className="px-2.5 py-1 text-gray-700 rounded-md text-xs font-semibold">
                                                        <span className='font-bold text-black'>Winner 3:</span> {t.win3 ? t.win3 : "not set"}
                                                    </h1>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                                        onClick={() => handleEditClick(t._id)}
                                                    >
                                                        Edit or Add
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(t._id)}
                                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </Td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Common Popup */}
                        {ShowPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white w-80 rounded-xl shadow-lg p-5">
                                    <div className="flex justify-end">
                                        <i className="fa-regular fa-close text-black cursor-pointer" onClick={() => setShowPopup(false)}></i>
                                    </div>
                                    <h2 className="text-xl font-semibold text-black">Edit Match</h2>
                                    <p className='text-gray-600 mb-4 text-sm'>Choose an option: Add winner or Change Status</p>
                                    <div className="flex flex-col gap-3">
                                        {/* Add Winner Option */}
                                        <button
                                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                            onClick={() => {
                                                setShowWinnerPopup(true);
                                            }}
                                        >
                                            Add Winner
                                        </button>

                                        {/* Change Status Option */}
                                        <button
                                            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                            onClick={() => {
                                                setShowStatusPopup(true);
                                            }}
                                        >
                                            Change Status
                                        </button>

                                        {/* Close Button */}
                                        <div className="flex justify-end">
                                            <button
                                                className="w-fit px-2 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                                                onClick={() => setShowPopup(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add Winner Popup */}
                        {/* Winner Popup */}
                        {showWinnerPopup && selectedMatch && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl shadow-lg p-5 w-96 text-black">
                                    <h2 className="text-xl font-bold mb-4">Select Winners</h2>

                                    {/* First Winner */}
                                    <label className="block mb-2">First Winner</label>
                                    <select
                                        className="w-full p-2 border rounded mb-3"
                                        value={win1}
                                        onChange={(e) => setWin1(e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {[...new Map(selectedMatch.joinedP.map(u => [u._id, u])).values()].map((u) => (
                                            <option key={u._id} value={u._id}>
                                                {u.name} ({u._id})
                                            </option>
                                        ))}
                                    </select>

                                    {/* Second Winner */}
                                    <label className="block mb-2">Second Winner</label>
                                    <select
                                        className="w-full p-2 border rounded mb-3"
                                        value={win2}
                                        onChange={(e) => setWin2(e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {selectedMatch.joinedP?.map((u) => (
                                            <option key={u._id} value={u._id}>
                                                {u.name} ({u._id})
                                            </option>
                                        ))}
                                    </select>

                                    {/* Third Winner */}
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-4"
                                            placeholder="Select User"
                                            value={win3}
                                            onChange={(e) => setWin3(e.target.value)}
                                            onFocus={(e) => e.target.setAttribute("list", `users-${selectedMatch._id}`)}
                                        />

                                        <datalist id={`users-${selectedMatch._id}`}>
                                            {selectedMatch.joinedP?.map((u) => (
                                                <option key={u._id} value={u._id}>
                                                    {u.name}
                                                </option>
                                            ))}
                                        </datalist>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-gray-300 rounded"
                                            onClick={() => setShowWinnerPopup(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                            onClick={saveWinners}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Status Popup */}
                        {showStatusPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl shadow-lg p-5 w-80">
                                    <h2 className="text-xl font-bold mb-4">Change Match Status</h2>

                                    <select
                                        className="w-full p-2 border rounded mb-4"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="finished">Finished</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-gray-300 rounded"
                                            onClick={() => setShowStatusPopup(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                                            onClick={saveStatus}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
