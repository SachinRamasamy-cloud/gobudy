import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addPayment, updUser, getUserById } from '../../server/server';

export default function Wallet() {
    const [Minput, setInput] = useState('');
    const [fee, setFee] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);

    // console.log("LOCALSTORAGE USER ID =", localStorage.getItem("userId"));
    // console.log("LOCALSTORAGE USER  =", localStorage.getItem("user"));
    // Update fee & total when input changes
    useEffect(() => {
        const amount = Number(Minput) || 0;
        const calcFee = Math.floor(amount * 0.2);
        const calcTotal = amount + calcFee;
        setFee(calcFee);
        setTotal(calcTotal);
    }, [Minput]);
    useEffect(() => {
        let intervalId;

        const loadUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser?._id) return;

            try {
                const res = await getUserById(storedUser._id);
                const freshUser = res.data;

                if (JSON.stringify(freshUser.transaction) !== JSON.stringify(user?.transaction)) {
                    setUser(freshUser);
                    setTransactions(freshUser.transaction || []);
                    localStorage.setItem("user", JSON.stringify(freshUser));
                }
            } catch (err) {
                console.error("Failed to load user/transactions", err);
            }
        };

        loadUser();
        intervalId = setInterval(loadUser, 5000);
        return () => clearInterval(intervalId);

    }, [user]);


    // Handle adding money
    const handleAddMoney = async () => {
        if (!user?._id) {
            alert("User not logged in");
            return;
        }

        const amount = Number(Minput);
        if (!amount || amount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        // Safely calculate fee and total
        const safeFee = Number(fee) || 0;
        const safeTotal = Number(total) || amount + safeFee;

        // Build payload
        const paymentData = {
            userId: user._id.toString(),
            amount,
            fee: safeFee,
            total: safeTotal,
            Status: "pending", // lowercase for consistency
            type: "credit",
            title: `Deposit ₹${amount}`,
            date: new Date().toISOString(),
        };

        try {
            // 1. Add payment in backend
            const res = await addPayment(paymentData);
            const savedPayment = res.data;

            // 2. Fetch latest user from backend to avoid overwriting old transactions
            const latestUserRes = await getUserById(user._id);
            const latestUser = latestUserRes.data;

            // 3. Append new payment safely
            const updatedTransactions = [...(latestUser.transaction || []), savedPayment];

            // 4. Update user in backend
            const updatedUser = {
                ...latestUser,
                transaction: updatedTransactions,
            };
            await updUser(user._id, updatedUser);

            // 5. Update frontend state + localStorage
            setUser(updatedUser);
            setTransactions(updatedTransactions);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Request sent to admin. Wait for approval.");
            setInput("");
            setSelectedAmount(null);
        } catch (err) {
            console.error("Payment error:", err);
            alert("Request failed. Please try again.");
        }
    };


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
                    <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">
                        Wallet Management
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                        Add <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">Balance</span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
                        Top up your wallet to join tournaments and purchase items.
                    </p>
                </div>
            </motion.div>

            {/* Quick Select & Custom Amount */}
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

                    {/* Quick Select */}
                    <div className="mb-8">
                        <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-4">Quick Select</p>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                            {quickAmounts.map((amt, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => { setSelectedAmount(amt); setInput(amt.replace('₹', '')); }}
                                    className={`h-20 md:h-24 rounded-xl font-black text-base md:text-lg transition-all duration-300 border-2 ${selectedAmount === amt
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

                    {/* Custom Amount */}
                    <div className="space-y-3 mb-8">
                        <label htmlFor="customAmount" className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest">
                            Or Enter Custom Amount
                        </label>
                        <motion.input
                            id="customAmount"
                            type="text"
                            value={Minput}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="₹2000"
                            className="w-full border-2 border-white/20 bg-gray-900/60 text-white px-4 py-4 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914] transition-all duration-300 font-medium text-lg"
                            whileFocus={{ scale: 1.02 }}
                        />
                        <p className="text-gray-400 text-xs font-medium">Minimum deposit: ₹100</p>
                    </div>

                    {/* Summary */}
                    <motion.div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 px-6 md:px-8 py-6 md:py-8 space-y-4 mb-8 border border-white/10">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 font-medium">Amount</p>
                            <p className="font-black text-lg">₹{Minput}</p>
                        </div>
                        <div className="h-px bg-white/10"></div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 font-medium">Processing Fee</p>
                            <p className="font-semibold">₹{fee}</p>
                        </div>
                        <div className="h-px bg-white/10"></div>
                        <div className="flex justify-between items-center pt-2">
                            <p className="font-black text-lg">Total</p>
                            <p className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent font-black text-2xl">₹{total}</p>
                        </div>
                    </motion.div>

                    <motion.button
                        className="w-full bg-gradient-to-r from-[#e50914] to-[#ff6b6b] hover:from-[#d40812] hover:to-[#ff4444] text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 text-lg uppercase tracking-tight"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddMoney}
                    >
                        Continue to Payment
                    </motion.button>
                </div>
            </motion.div>

            {/* Transaction History */}
            <div className="overflow-x-auto relative z-10 max-w-7xl mx-auto px-6 md:px-10 mb-16">
                <h1 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                    Transaction <span className="bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent">History</span>
                </h1>

                <motion.table
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full text-left border-collapse bg-gray-900/60 rounded-2xl overflow-hidden"
                >
                    <thead className="bg-gray-900/80">
                        <tr>
                            <th className="px-6 py-3 text-gray-400 uppercase text-sm font-medium">Title</th>
                            <th className="px-6 py-3 text-gray-400 uppercase text-sm font-medium">Date</th>
                            <th className="px-6 py-3 text-gray-400 uppercase text-sm font-medium">Amount</th>
                            <th className="px-6 py-3 text-gray-400 uppercase text-sm font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.reverse().map((item, index) => (
                            <motion.tr
                                key={index}
                                className="border-b border-white/10 hover:bg-gray-800/50 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full font-black ${item.type === "credit"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-[#e50914]"
                                        }`}>
                                        <i className={`fa-solid ${item.type === "credit" ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
                                    </div>
                                    <span className="font-black text-base">{item.title}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">{new Date(item.date).toLocaleString()}</td>
                                <td className={`px-6 py-4 font-black ${item.type === "credit" ? "text-green-400" : "text-white"}`}>
                                    ₹{item.amount}
                                </td>
                                <td
                                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${item.status?.toLowerCase() === "approved" ? "text-green-500" : "text-yellow-400"
                                        }`}
                                >
                                    {item.status || "Pending"}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </div>
        </div>
    );
}
