import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllVideos, getTournamentById, getUserById, updateTournamentStatus, winTournament } from "../../server/server";

export default function Admtorndet() {
  const [detial, setdetial] = useState(null)
  const location = useLocation();
  const { id } = location.state || {};

  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [showvideoPopup, setShowvideoPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [winTeam, setWinTeam] = useState("");
  const [video, setvideo] = useState("");
  const [status, setStatus] = useState("");
  const [loadingMatch, setLoadingMatch] = useState(false);
  console.log(id)

  const loaddata = async () => {
    try {
      const result = await getTournamentById(id)
      setdetial(result.data)
    }
    catch (err) {
      console.error("fetching detial err", err)
    }
  }
  const loadvideo = async () => {
    try {
      const result = await getAllVideos()
      setvideo(result.data)
    }
    catch (err) {
      console.error("fetching detial err", err)
    }
  }

  useEffect(() => {
    if (!id) return;
    loaddata();
  }, [id]);
  console.log(detial)

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
      loaddata();

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
      loaddata();

    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };
  // Delete match
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await delTournament(id);
      alert("Match deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete match");
    }
  };

  if (!detial) {
    return <div className="p-10">Loading...</div>;
  }
  return (
    <div className="w-full min-h-screen bg-white text-black px-2 sm:px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Tournament Detail
        </h1>
        <p className="text-sm text-gray-500">
          View and manage tournament information
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image */}
        <div className="relative h-[320px] rounded-xl overflow-hidden shadow-lg">
          <img
            src=""
            alt=""
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {detial.game || "name not found"}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-6 shadow-md">
          <div>
            <h2 className="text-2xl font-semibold">
              {detial.name || "no name"}
            </h2>
            <p className="mt-2 text-lg font-medium text-gray-700">
              Prize Pool: {detial.prize || "no prize"}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-500">Mode</p>
                <p className="font-semibold">{detial.mode}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-semibold">{detial.date}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => handleEditClick(detial._id)}
              className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:opacity-90">
              Edit
            </button>
            <button
              onClick={() => handleDelete(detial._id)}
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:opacity-90">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-500">Entry Fee</p>
          <p className="text-2xl font-bold">₹{detial.fee}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-500">Players</p>
          <p className="text-2xl font-bold">{detial.joined}/{detial.total}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-2xl font-bold text-red-600">{detial.status || "Not updated"} </p>
        </div>
      </div>

      {/* Rules */}
      <div className="mt-8 bg-black text-white rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3">Rules</h3>
        <p className="text-sm leading-relaxed text-gray-300">
          {detial.Rules}
        </p>
      </div>

      {/* Teams */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Teams</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Team Card */}
          {detial.teams.map((t, i) => {
            return (
              <div key={i} className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-lg">{t.teamName || "no name"}</h4>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    Rank {t.rank || "not set"}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium text-black">Leader:</span>{" "}
                    {t.leader?.name || "Not Assigned"}
                    {t.leader?._id && (
                      <span className="text-xs text-gray-400 ml-2">
                        id: {t.leader._id}
                      </span>
                    )}
                  </p>

                  <p>
                    <span className="font-medium text-black">Members:</span>{" "}
                    {t.members?.length || 0}
                  </p>
                  <p>
                    <span className="font-medium text-black">Team Code:</span>{" "}
                    {t.teamCode}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

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
              <button
                className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                onClick={() => setShowvideoPopup(true)}
              >
                Add Video
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

      {/* video Popup */}
      {showvideoPopup && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-5 w-96">
            <h2 className="text-xl font-bold mb-4">Select Winning Team</h2>
            <label className="block mb-2 text-sm font-medium">Winning Team</label>
            <select
              value={video}
              onChange={(e) => setvideo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-sm"
            >
              <option value="">Select Team</option>
              {video.map(team => (
                <option key={team._id} value={team._id}>
                  {team.title} (Tag: {team.tag || "N/A"})
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
                Add Video
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
  );
}
