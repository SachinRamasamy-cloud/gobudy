import React from 'react'

export default function Wallet() {
    const transactions = [
        { title: "Wallet Top-up", date: "2024-01-15 14:30", amount: "+₹100.00", status: "Completed", type: "credit" },
        { title: "Valorant Championship Entry", date: "2024-01-14 10:15", amount: "₹25.00", status: "Completed", type: "debit" },
        { title: "Tournament Prize - 1st Place", date: "2024-01-13 18:45", amount: "+₹250.00", status: "Completed", type: "credit" },
        { title: "Wallet Top-up", date: "2024-01-13 09:20", amount: "+₹50.00", status: "Pending", type: "credit" },
        { title: "CS:GO Tournament Entry", date: "2024-01-11 16:30", amount: "₹15.00", status: "Completed", type: "debit" },
    ]

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 px-6 md:px-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Add <span className="text-red-600">Balance</span>
                    </h1>
                    <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
                        Top up your wallet to join tournaments and purchase items.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 md:px-10">
                <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6 shadow-lg border border-red-500/40">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-wallet text-white text-xl"></i>
                        <p className="text-gray-200 text-sm">Current Balance</p>
                    </div>
                    <h1 className="text-4xl font-semibold mt-3">₹2500</h1>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-coins text-green-500 text-xl"></i>
                        <p className="text-gray-200 text-sm">Total Deposits</p>
                    </div>
                    <h1 className="text-4xl font-semibold mt-3">₹2500</h1>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-money-bill-transfer text-blue-500 text-xl"></i>
                        <p className="text-gray-200 text-sm">Total Spent</p>
                    </div>
                    <h1 className="text-4xl font-semibold mt-3">₹2500</h1>
                </div>
            </div>

            <div className="bg-gray-900 rounded-2xl mx-6 md:mx-10 my-10 border border-gray-800 shadow-xl">
                <div className="p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6">
                        Select <span className="text-red-600">Amount</span>
                    </h1>

                    <h2 className="text-gray-400 text-sm mb-3">Quick Select</h2>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full mb-8">
                        {["₹100", "₹150", "₹200", "₹300", "₹500", "₹1000"].map((amt, i) => (
                            <div
                                key={i}
                                className="flex justify-center items-center h-20 rounded-lg text-lg font-semibold
                                           border border-gray-700 bg-gray-800 text-white
                                           hover:bg-red-600 hover:border-red-500 transition-all duration-200 cursor-pointer"
                            >
                                {amt}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="customAmount" className="text-gray-400 text-sm">
                            Or Enter Custom Amount
                        </label>
                        <input
                            id="customAmount"
                            type="text"
                            placeholder="₹2000"
                            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <p className="text-gray-500 text-sm">Minimum deposit: ₹100</p>
                    </div>

                    <div className="rounded-lg bg-gray-800 px-4 py-4 space-y-3 mb-8 border border-gray-700">
                        <div className="flex justify-between">
                            <p className="text-gray-400">Amount</p>
                            <p>₹400</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Processing Fee</p>
                            <p>₹10</p>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <p>Total</p>
                            <p className="text-red-500">₹410</p>
                        </div>
                    </div>

                    <button className="w-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md">
                        Continue to Payment
                    </button>
                </div>
            </div>

            <div className="bg-gray-900/70 mx-6 md:mx-10 rounded-2xl p-8 border border-gray-800 shadow-xl mt-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Payment <span className="text-red-600">Methods</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: "Credit/Debit Card", desc: "Visa, Master, Amex" },
                        { name: "PayPal", desc: "Fast & secure" },
                        { name: "Cryptocurrency", desc: "BTC, ETH, USDT" },
                        { name: "Bank Transfer", desc: "1-3 days" }
                    ].map((method, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-gray-800 hover:border hover:border-red-600 rounded-lg px-5 py-4 transition-all duration-200"
                        >
                            <i className="fa-solid fa-credit-card text-red-500 text-xl"></i>
                            <div>
                                <h1 className="font-semibold">{method.name}</h1>
                                <p className="text-gray-500 text-sm">{method.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-6 md:mx-10 mt-10 mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Transaction <span className="text-red-600">History</span>
                    </h1>
                    <button className="text-red-500 text-sm font-semibold hover:underline">
                        View All
                    </button>
                </div>

                <div className="space-y-4 pb-6">
                    {transactions.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-800/70 hover:bg-gray-800 transition-all duration-200 px-5 py-4 rounded-lg border border-gray-700/60"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${item.type === "credit"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    <i
                                        className={`fa-solid ${item.type === "credit"
                                            ? "fa-arrow-down"
                                            : "fa-arrow-up"
                                            }`}
                                    ></i>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base">{item.title}</h2>
                                    <p className="text-gray-500 text-sm">{item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p
                                    className={`font-semibold text-base ${item.type === "credit"
                                        ? "text-green-400"
                                        : "text-white"
                                        }`}
                                >
                                    {item.amount}
                                </p>
                                <p
                                    className={`text-sm ${item.status === "Completed"
                                        ? "text-green-500"
                                        : "text-yellow-400"
                                        }`}
                                >
                                    {item.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
