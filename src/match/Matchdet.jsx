import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming React Router
import { getMatchById } from '../../server/server';

const Matchdet = () => {
    // Get the match ID from the URL parameters (e.g., /match/692895c42127a636ec78ad4d)
    const { matchId } = useParams();
    console.log("match id",matchId);

    // Replace with your actual user context hook
    const user =  localStorage.getItem("userId"); // Placeholder for current user

    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. Data Fetching ---
    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                // Use 'matchId' here, matching the variable from useParams()
                const response = await getMatchById(matchId);
                setMatch(response.data);
                console.log(match);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching match details:", err);
                setError("Failed to load match details. Please check the match ID.");
                setLoading(false);
            }
        };

        if (matchId) {
            fetchMatchDetails();
        }
    }, [matchId]); // Dependency array is correct
    // --- 2. Calculated States ---
    if (loading) return <div className="text-white text-center py-10">Loading Match Details...</div>;
    if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
    if (!match) return <div className="text-white text-center py-10">Match not found.</div>;

    // Check if the current user has joined
    const userIsJoined = match.teams.some(team =>
        team.members.map(m => m._id.toString()).includes(user)
    );

    // Find the current user's team (if joined)
    const userTeam = match.teams.find(team =>
        team.members.map(m => m._id.toString()).includes(user)
    );

    // Determine max members per team based on the match mode
    const maxMembersPerTeam = match.mod === 'duo' ? 2 : (match.mod === 'squad' ? 4 : 1);


    // --- 3. Component Rendering ---
    return (
        <div className="container mx-auto p-4 md:p-8 text-white">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{match.game} - {match.mod.toUpperCase()}</h1>
            <p className="text-lg text-[#00e5ff] font-semibold mb-6">Match ID: {match._id}</p>

            {/* Match Summary & User Status */}
            <div className="bg-gray-900/80 p-6 rounded-xl mb-8 border border-white/10 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-b border-white/10 pb-4 mb-4">
                    <div>
                        <p className="text-gray-400 uppercase text-xs font-semibold">Status</p>
                        <p className="text-xl font-bold text-yellow-400">{match.status.toUpperCase()}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 uppercase text-xs font-semibold">Prize Pool</p>
                        <p className="text-xl font-bold text-[#ff6b6b]">${match.prize}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 uppercase text-xs font-semibold">Time</p>
                        <p className="text-xl font-bold">{new Date(match.time).toLocaleString()}</p>
                    </div>
                </div>

                {userIsJoined && userTeam ? (
                    <div className="text-center bg-green-900/30 p-4 rounded-lg border border-green-600/50">
                        <p className="text-lg font-black text-green-400 mb-2">✅ YOU ARE JOINED!</p>
                        <p className="text-sm">Team: <span className="font-bold">{userTeam.teamName}</span></p>
                        {userTeam.teamCode && (
                            <p className="text-sm">Invite Code: <span className="font-bold text-[#00e5ff]">{userTeam.teamCode}</span> (Share this with your teammates)</p>
                        )}
                        <p className="text-sm mt-1">Roster: {userTeam.members.length}/{maxMembersPerTeam}</p>
                    </div>
                ) : (
                    <div className="text-center p-4">
                        <p className="text-yellow-500 font-semibold">You have not joined this match.</p>
                        {/* You would place a button here to redirect to your join modal or page */}
                    </div>
                )}
            </div>

            {/* Team Roster Table */}
            <h2 className="text-2xl font-bold mb-4">Team Roster ({match.joinedCount} / {match.total} Slots)</h2>
            <div className="bg-gray-900/80 rounded-xl overflow-hidden border border-white/10">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-gray-800/80">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leader</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Members ({maxMembersPerTeam} Max)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {match.teams.length > 0 ? (
                            match.teams.map((team, index) => (
                                <tr key={team._id} className={team.members.map(m => m._id.toString()).includes(user._id) ? "bg-green-900/20" : "hover:bg-gray-800/50"}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                                        {team.teamName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {team.leader ? team.leader.username : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {/* Since team.members is populated, we can map over usernames */}
                                        {team.members.map(member => member.username).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${team.members.length === maxMembersPerTeam
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {team.members.length === maxMembersPerTeam ? 'Full' : 'Incomplete'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    No teams have joined this match yet. Be the first!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add logic to display empty slots if you choose */}

        </div>
    );
};

export default Matchdet;