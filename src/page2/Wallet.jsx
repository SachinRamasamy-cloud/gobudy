import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Keep if Reveal relies on it, but ensure motion components inside are removed if they cause issues.
import { addPayment, updUser, getUserById } from '../../server/server';
import Reveal from "../Reveal"; // Assuming this is your custom animation wrapper
import { Link } from 'react-router-dom';

export default function Wallet() {
    const [Minput, setInput] = useState('');
    const [fee, setFee] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);

    // 20% fee
    useEffect(() => {
        const amount = Number(Minput) || 0;
        const calcFee = Math.floor(amount * 0.2);
        const calcTotal = amount + calcFee;
        setFee(calcFee);
        setTotal(calcTotal);
    }, [Minput]);

    // Logic to load user and set interval for updates (5 seconds)
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


    // adding money 
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

        const safeFee = Number(fee) || 0;
        const safeTotal = Number(total) || amount + safeFee;
        const paymentData = {
            userId: user._id.toString(),
            amount,
            fee: safeFee,
            total: safeTotal,
            Status: "pending",
            type: "credit",
            title: `Deposit ₹${amount}`,
            date: new Date().toISOString(),
        };

        try {
            const res = await addPayment(paymentData);
            const savedPayment = res.data;
            const latestUserRes = await getUserById(user._id);
            const latestUser = latestUserRes.data;
            const updatedTransactions = [...(latestUser.transaction || []), savedPayment];
            const updatedUser = {
                ...latestUser,
                transaction: updatedTransactions,
            };
            await updUser(user._id, updatedUser);

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
    const currentBalance = user?.wallet ?? 0; 

    return (
        <div className="relative bg-[#0d0d0d] min-h-screen text-white pb-20">

            <Reveal>
                {/* Header Section */}
                <div className="relative z-10 py-12 px-6 md:px-10 max-w-7xl mx-auto">
                    <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">
                        Wallet Management
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                        Add <span className="text-[#e50914]">Balance</span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
                        Top up your wallet to join tournaments and purchase items.
                    </p>
                </div>
            </Reveal>

            <div className="max-w-7xl mx-auto px-6 md:px-10 z-10 relative">

                <Reveal>
                    <div className="mb-12">

                        <div className="flex flex-col lg:flex-row gap-6 p-8 bg-[#1a1a1a] rounded-3xl shadow-2xl border border-white/5">

                            {/* 1. Wallet Balance Display */}
                            <div className="flex flex-col justify-center items-center lg:items-start p-4 lg:pr-8 border-b lg:border-b-0 lg:border-r border-white/10 lg:w-1/3">
                                <p className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                                    <i className="fa-solid fa-wallet text-blue-400"></i>
                                    Current Balance
                                </p>
                                {/* Updated to use actual state/prop */}
                                <h2 className="text-5xl md:text-6xl font-extrabold text-white">
                                    ₹{currentBalance.toLocaleString('en-IN')}
                                </h2>
                            </div>

                            {/* 2. Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center lg:justify-end gap-4 pt-4 lg:pt-0 lg:flex-1">

                                {/* Withdraw Button (Secondary Action) */}
                                <Link
                                    to="/withdraw"
                                    className="w-full sm:w-auto flex justify-center items-center gap-3 px-6 py-3 rounded-xl 
                                           bg-gray-700 hover:bg-gray-600 transition-colors duration-300 font-bold text-white text-lg shadow-md"
                                >
                                    <i className="fa-solid fa-money-bill-transfer text-xl"></i>
                                    <span>Withdraw Funds</span>
                                </Link>

                            </div>

                        </div>
                    </div>
                </Reveal>
                <Reveal>
                    {/* Quick Select */}
                    <div
                        className="bg-gray-900/80 rounded-3xl mb-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                    >
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-black mb-8 tracking-tight border-b border-white/10 pb-4">
                                Choose or Enter Amount
                            </h2>

                            {/* Quick Select */}
                            <div className="mb-10">
                                <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">Quick Select</p>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                    {quickAmounts.map((amt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedAmount(amt); setInput(amt.replace('₹', '')); }}
                                            className={`h-20 md:h-24 rounded-xl font-black text-base md:text-lg transition-all duration-300 border-2 shadow-lg hover:scale-[1.03]
                                                ${selectedAmount === amt
                                                    ? 'bg-[#e50914] border-[#e50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.6)]' // Selected Style
                                                    : 'border-white/20 bg-gray-900/60 text-white hover:border-[#e50914]/50' // Default Style
                                                }`}
                                        >
                                            {amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:flex lg:gap-8">

                                
                                <div className="space-y-3 mb-8 lg:mb-0 lg:w-1/2">
                                    <label htmlFor="customAmount" className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                                        Or Enter Custom Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-xl">₹</span>
                                        <input
                                            id="customAmount"
                                            type="number" // Changed to number for mobile keyboard, though Minput is text state
                                            value={Minput}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="2000"
                                            className="w-full border-2 border-white/20 bg-gray-900/60 text-white pl-10 pr-4 py-4 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e50914]/50 focus:border-[#e50914] transition-all duration-300 font-medium text-lg"
                                        />
                                    </div>
                                    <p className="text-gray-500 text-xs font-medium">Fee: 20% | Minimum deposit: ₹100</p>
                                </div>

                                {/* Summary (LG: 1/2 width) */}
                                <div className="lg:w-1/2">
                                    <div className="rounded-2xl bg-gray-800/80 px-6 py-6 space-y-4 border border-white/10">
                                        <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-2">Payment Summary</h3>

                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-400 font-medium">Amount</p>
                                            <p className="font-black text-lg">₹{Minput || 0}</p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-400 font-medium">Processing Fee (20%)</p>
                                            <p className="font-semibold text-red-400">₹{fee}</p>
                                        </div>

                                        <div className="h-px bg-white/10"></div>

                                        <div className="flex justify-between items-center pt-2">
                                            <p className="font-black text-xl text-white">Total Charge</p>
                                            <p className="text-[#00e5ff] font-black text-3xl">₹{total}</p>
                                        </div>
                                    </div>
                                </div>

                            </div> {/* End Custom/Summary Flex */}

                            {/* Payment Button */}
                            <button
                                className="w-full mt-8 bg-[#e50914] hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 text-lg uppercase tracking-wider disabled:bg-gray-600 disabled:shadow-none"
                                onClick={handleAddMoney}
                                disabled={total <= 0}
                            >
                                Continue to Payment
                            </button>

                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    {/* Transaction History (Refined Design) */}
                    <div className="overflow-x-auto relative z-10 mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                            Transaction <span className="text-[#e50914]">History</span>
                        </h2>

                        {/* Table starts here */}
                        <div className="overflow-hidden rounded-2xl shadow-xl border border-white/5">
                            <table className="min-w-full text-left border-collapse bg-[#1a1a1a] text-white">
                                <thead className="bg-[#0d0d0d] sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3 text-gray-400 uppercase text-xs font-semibold tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-gray-400 uppercase text-xs font-semibold tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-gray-400 uppercase text-xs font-semibold tracking-wider text-right">Amount</th>
                                        <th className="px-6 py-3 text-gray-400 uppercase text-xs font-semibold tracking-wider text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions
                                        .slice()
                                        .reverse()
                                        .map((item, index) => {
                                            let bgColor = "";
                                            let textColor = "";
                                            let icon = "";
                                            let statusClass = "";

                                            switch (item.type?.toLowerCase()) {
                                                case "credit":
                                                    bgColor = "bg-green-500/20";
                                                    textColor = "text-green-400";
                                                    icon = "fa-arrow-down";
                                                    break;
                                                case "debit":
                                                    bgColor = "bg-red-500/20";
                                                    textColor = "text-red-400";
                                                    icon = "fa-arrow-up";
                                                    break;
                                                case "withdraw":
                                                    bgColor = "bg-blue-500/20";
                                                    textColor = "text-blue-400";
                                                    icon = "fa-money-bill-transfer";
                                                    break;
                                                default:
                                                    bgColor = "bg-gray-500/20";
                                                    textColor = "text-gray-400";
                                                    icon = "fa-circle";
                                            }

                                            // Status badge styling
                                            if (item.status?.toLowerCase() === "approved") {
                                                statusClass = "bg-green-600/80 text-white";
                                            } else if (item.status?.toLowerCase() === "pending") {
                                                statusClass = "bg-yellow-500/80 text-gray-900";
                                            } else {
                                                statusClass = "bg-red-600/80 text-white";
                                            }


                                            return (
                                                <tr
                                                    key={index}
                                                    className="border-b border-white/5 hover:bg-gray-800/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-black ${bgColor} ${textColor}`}
                                                        >
                                                            <i className={`fa-solid ${icon}`}></i>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-base text-white">{item.title}</span>
                                                            <span className="text-xs text-gray-500 capitalize">{item.type || "N/A"}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400 text-sm">
                                                        {new Date(item.date).toLocaleString()}
                                                    </td>
                                                    <td className={`px-6 py-4 font-black text-lg text-right ${item.type === "credit" ? "text-green-400" : "text-white"}`}>
                                                        {item.type === "credit" ? '+' : '-'}₹{item.amount.toLocaleString()}
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 text-center"
                                                    >
                                                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full ${statusClass}`}>
                                                            {item.status || "Pending"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}