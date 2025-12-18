import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllPayments, getAllUsers, getAllMatches, getAllVideos, getAllTournaments } from "../../server/server";

export default function AdmDash() {
    const [data, setData] = useState({
        videos: [],
        tournaments: [],
        users: [],
        matches: [],
        payments: [],
        reels: []
    })
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('users')
    useEffect(() => {
        const loadData = async () => {
            try {
                const [videoRes, tournRes, userRes, matchres, payres] = await Promise.all([
                    getAllVideos(),
                    getAllTournaments(),
                    getAllUsers(),
                    getAllMatches(),
                    getAllPayments()
                ]);

                console.log("Videos:", videoRes);
                console.log("Tournaments:", tournRes);
                console.log("Users:", userRes);
                console.log("Payments:", payres);
                console.log("Match:", matchres);

                const getSafeArray = (res) => {
                    if (!res) return [];
                    if (Array.isArray(res)) return res;
                    if (res.data) {
                        if (Array.isArray(res.data)) return res.data;
                        if (res.data.data && Array.isArray(res.data.data)) return res.data.data;
                    }
                    return [];
                };

                setData({
                    videos: getSafeArray(videoRes),
                    tournaments: getSafeArray(tournRes),
                    users: getSafeArray(userRes),
                    payments: getSafeArray(payres),
                    reels: [],
                    matches: getSafeArray(matchres)
                });
            } catch (error) {
                console.error("Failed to load admin stats", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Card configuration
    const statCards = [
        { id: 'users', title: 'Total Users', count: data.users.length, icon: 'fa-users', color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'tournaments', title: 'Tournaments', count: data.tournaments.length, icon: 'fa-trophy', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { id: 'videos', title: 'Videos', count: data.videos.length, icon: 'fa-video', color: 'text-red-600', bg: 'bg-red-50' },
        { id: 'reels', title: 'Reels', count: data.reels.length, icon: 'fa-film', color: 'text-pink-600', bg: 'bg-pink-50' },
        { id: 'matches', title: 'Matches', count: data.matches.length, icon: 'fa-gamepad', color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'payments', title: 'Payments', count: data.payments.length, icon: 'fa-credit-card', color: 'text-green-600', bg: 'bg-green-50' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    }

    // Helper to truncate long text
    const truncate = (str, n = 20) => str?.length > n ? str.substr(0, n - 1) + "..." : str;

    // Table Row Renderers
    const renderTableContent = () => {
        const currentData = data[activeTab] || [];

        if (currentData.length === 0) {
            return (
                <div className="p-10 text-center text-gray-400">
                    <i className="fa-solid fa-folder-open text-4xl mb-3 opacity-30"></i>
                    <p>No records found.</p>
                </div>
            )
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            {activeTab === 'users' && <>
                                <Th>User</Th><Th>Email</Th><Th>Balance</Th><Th>Role</Th>
                            </>}
                            {activeTab === 'tournaments' && <>
                                <Th>Title</Th><Th>Game</Th><Th>Entry Fee</Th><Th>Prize</Th><Th>Date</Th>
                            </>}
                            {activeTab === 'videos' && <>
                                <Th>Title</Th><Th>Category</Th><Th>Views</Th>
                            </>}
                            {activeTab === 'reels' && <>
                                <Th>Caption</Th><Th>Author</Th><Th>Likes</Th>
                            </>}
                            {activeTab === 'payments' && <>
                                <Th>ID</Th><Th>Amount</Th><Th>Type</Th><Th>Status</Th>
                            </>}
                            {activeTab === 'matches' && <>
                                <Th>Match Name</Th><Th>game</Th><Th>Players</Th><Th>Prize Pool</Th><Th>Status</Th>
                            </>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentData.map((item, idx) => (
                            <tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
                                {activeTab === 'users' && <>
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {(item.username || item.name || '?')[0].toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900">{item.username || item.name}</span>
                                        </div>
                                    </Td>
                                    <Td>{item.email}</Td>
                                    <Td><span className="font-mono text-green-600">₹{item.wallet || 0}</span></Td>
                                    <Td><Badge color={item.isAdmin ? 'red' : 'blue'}>{item.isAdmin ? 'Admin' : 'User'}</Badge></Td>
                                </>}

                                {activeTab === 'tournaments' && <>
                                    <Td><span className="font-medium text-gray-900">{truncate(item.title, 30)}</span></Td>
                                    <Td>{item.game}</Td>
                                    <Td>{Number(item.fee) > 0 ? `₹${item.fee}` : <span className="text-green-600">Free</span>}</Td>
                                    <Td>{item.prize}</Td>
                                    <Td>{new Date(item.date).toLocaleDateString()}</Td>
                                </>}

                                {activeTab === 'videos' && <>
                                    <Td><span className="font-medium text-gray-900">{truncate(item.title, 40)}</span></Td>
                                    <Td>{item.tag || 'General'}</Td>
                                    <Td>{item.views || 0}</Td>
                                </>}

                                {activeTab === 'reels' && <>
                                    <Td>{truncate(item.caption || item.title, 40)}</Td>
                                    <Td>{item.author || 'Unknown'}</Td>
                                    <Td>{item.likes || 0}</Td>
                                </>}

                                {activeTab === 'payments' && <>
                                    <Td className="font-mono text-xs text-gray-500">#{item.id}</Td>
                                    <Td className="font-bold">₹{item.amount}</Td>
                                    <Td><span className="capitalize">{item.type || 'transaction'}</span></Td>
                                    <Td><Badge color={item.status === 'success' ? 'green' : 'yellow'}>{item.status}</Badge></Td>
                                </>}

                                {activeTab === 'matches' && <>
                                    <Td>{item.name}</Td>
                                    <Td>{item.game || 'TBA'}</Td>
                                    <Td>{item.joined || 'TBA'}/{item.total || 'TBA'}</Td>
                                    <Td>{item.prize || 'TBA'}</Td>
                                    <Td><Badge color="gray">{item.status || 'Pending'}</Badge></Td>
                                </>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <section className='min-h-screen bg-gray-50 p-6 md:p-10 font-sans'>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Dashboard Overview</h1>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'
                >
                    {statCards.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            onClick={() => setActiveTab(item.id)}
                            className={`bg-white rounded-2xl p-6 shadow-sm border cursor-pointer transition-all ${activeTab === item.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1'>{item.title}</p>
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {loading ? <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" /> : item.count}
                                    </h2>
                                </div>
                                <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tabbed Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                    {/* Tabs Header */}
                    <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50 px-2">
                        {['users', 'tournaments', 'videos', 'reels', 'matches', 'payments'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-semibold capitalize transition-all relative whitespace-nowrap
                                    ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Table Content */}
                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTableContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// Reusable Styled Components
const Th = ({ children }) => (
    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b border-gray-100">
        {children}
    </th>
)

const Td = ({ children, className = "" }) => (
    <td className={`px-6 py-4 text-sm text-gray-700 border-b border-gray-50 ${className}`}>
        {children}
    </td>
)

const Badge = ({ color, children }) => {
    const colors = {
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
        blue: 'bg-blue-100 text-blue-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        gray: 'bg-gray-100 text-gray-600'
    }
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>
            {children}
        </span>
    )
}
