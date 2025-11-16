import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Wallet() {
    const [selectedAmount, setSelectedAmount] = useState(null);

    const transactions = [
        { title: "Wallet Top-up", date: "2024-01-15 14:30", amount: "+₹100.00", status: "Completed", type: "credit" },
        { title: "Valorant Championship Entry", date: "2024-01-14 10:15", amount: "-₹25.00", status: "Completed", type: "debit" },
        { title: "Tournament Prize - 1st Place", date: "2024-01-13 18:45", amount: "+₹250.00", status: "Completed", type: "credit" },
        { title: "Wallet Top-up", date: "2024-01-13 09:20", amount: "+₹50.00", status: "Pending", type: "credit" },
        { title: "CS:GO Tournament Entry", date: "2024-01-11 16:30", amount: "-₹15.00", status: "Completed", type: "debit" },
    ]

    const quickAmounts = ["₹100", "₹150", "₹200", "₹300", "₹500", "₹1000"];
    const paymentMethods = [
        { name: "Credit/Debit Card", desc: "Visa, Master, Amex", icon: "fa-credit-card" },
        { name: "PayPal", desc: "Fast & secure", icon: "fa-paypal" },
        { name: "Cryptocurrency", desc: "BTC, ETH, USDT", icon: "fa-bitcoin" },
        { name: "Bank Transfer", desc: "1-3 days", icon: "fa-building" }
    ];

    return (
        <div className="relative bg-[#0d0d0d] min-h-screen text-white">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between py-12 px-6 md:px-10 max-w-7xl mx-auto"
            >
                <div>
                    <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">💰 Wallet Management</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                        Add <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">Balance</span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
                        Top up your wallet to join tournaments and purchase items.
                    </p>
                </div>
            </motion.div>

            {/* Balance Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 md:px-10 max-w-7xl mx-auto mb-12">
                {[
                    { icon: "fa-wallet", label: "Current Balance", amount: "₹2500", gradient: "from-[#e50914] to-[#ff6b6b]" },
                    { icon: "fa-coins", label: "Total Deposits", amount: "₹2500", gradient: "from-green-600 to-emerald-700" },
                    { icon: "fa-money-bill-transfer", label: "Total Spent", amount: "₹2500", gradient: "from-blue-600 to-cyan-700" }
                ].map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`rounded-2xl bg-gradient-to-br ${card.gradient} p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10`}
                        whileHover={{ scale: 1.02, y: -4 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <i className={`fa-solid ${card.icon} text-xl`}></i>
                            </motion.div>
                            <p className="text-white/80 text-sm font-semibold">{card.label}</p>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{card.amount}</h1>
                    </motion.div>
                ))}
            </div>

            {/* Select Amount Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 bg-gradient-to-b from-gray-900/80 to-gray-950/80 rounded-3xl mx-6 md:mx-10 mb-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] backdrop-blur-sm max-w-7xl mx-auto"
            >
                <div className="p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                        Select <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">Amount</span>
                    </h1>

                    <div className="mb-8">
                        <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-4">Quick Select</p>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                            {quickAmounts.map((amt, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setSelectedAmount(amt)}
                                    className={`h-20 md:h-24 rounded-xl font-black text-base md:text-lg transition-all duration-300 border-2 ${
                                        selectedAmount === amt
                                            ? 'bg-gradient-to-br from-[#e50914] to-[#ff6b6b] border-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.6)] scale-105'
                                            : 'border-white/20 bg-gray-900/60 text-white hover:border-[#e50914]/50'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {amt}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <label htmlFor="customAmount" className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest">
                            Or Enter Custom Amount
                        </label>
                        <motion.input
                            id="customAmount"
                            type="text"
                            placeholder="₹2000"
                            className="w-full border-2 border-white/20 bg-gray-900/60 text-white px-4 py-4 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914] transition-all duration-300 font-medium text-lg"
                            whileFocus={{ scale: 1.02 }}
                        />
                        <p className="text-gray-400 text-xs font-medium">Minimum deposit: ₹100</p>
                    </div>

                    {/* Summary */}
                    <motion.div
                        className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 px-6 md:px-8 py-6 md:py-8 space-y-4 mb-8 border border-white/10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 font-medium">Amount</p>
                            <p className="font-black text-lg">₹400</p>
                        </div>
                        <div className="h-px bg-white/10"></div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 font-medium">Processing Fee</p>
                            <p className="font-semibold">₹10</p>
                        </div>
                        <div className="h-px bg-white/10"></div>
                        <div className="flex justify-between items-center pt-2">
                            <p className="font-black text-lg">Total</p>
                            <p className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent font-black text-2xl">₹410</p>
                        </div>
                    </motion.div>

                    <motion.button
                        className="w-full bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444] text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 text-lg uppercase tracking-tight"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        💳 Continue to Payment
                    </motion.button>
                </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 bg-gradient-to-b from-gray-900/80 to-gray-950/80 mx-6 md:mx-10 rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] backdrop-blur-sm max-w-7xl mx-auto mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                    Payment <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">Methods</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentMethods.map((method, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-4 bg-gray-900/60 hover:bg-gray-900/80 border border-white/10 hover:border-[#e50914]/50 rounded-2xl px-6 py-5 transition-all duration-300 group cursor-pointer"
                            whileHover={{ scale: 1.02, x: 4 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#e50914]/20 to-[#ff6b6b]/20 flex items-center justify-center group-hover:from-[#e50914]/40 group-hover:to-[#ff6b6b]/40 transition-all">
                                <i className={`fa-brands ${method.icon} text-[#e50914] text-lg`}></i>
                            </div>
                            <div>
                                <h3 className="font-black text-base group-hover:text-[#e50914] transition-colors">{method.name}</h3>
                                <p className="text-gray-400 text-sm font-medium">{method.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 mb-16"
            >
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Transaction <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">History</span>
                    </h1>
                    <motion.button
                        className="text-[#00e5ff] text-sm font-black hover:text-[#e50914] transition-colors uppercase tracking-widest"
                        whileHover={{ scale: 1.05, x: 4 }}
                    >
                        View All →
                    </motion.button>
                </div>

                <div className="space-y-3">
                    {transactions.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex justify-between items-center bg-gradient-to-r from-gray-900/60 to-gray-950/60 hover:from-gray-900/80 hover:to-gray-950/80 px-6 py-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <motion.div
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-black ${
                                        item.type === "credit"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-[#e50914]"
                                    }`}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <i
                                        className={`fa-solid ${
                                            item.type === "credit" ? "fa-arrow-down" : "fa-arrow-up"
                                        }`}
                                    ></i>
                                </motion.div>
                                <div>
                                    <h2 className="font-black text-base group-hover:text-[#e50914] transition-colors">{item.title}</h2>
                                    <p className="text-gray-500 text-sm font-medium">{item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p
                                    className={`font-black text-base ${
                                        item.type === "credit" ? "text-green-400" : "text-white"
                                    }`}
                                >
                                    {item.amount}
                                </p>
                                <p
                                    className={`text-xs font-bold uppercase tracking-wider ${
                                        item.status === "Completed"
                                            ? "text-green-500"
                                            : "text-yellow-400"
                                    }`}
                                >
                                    {item.status}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
