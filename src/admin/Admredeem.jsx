import React, { useEffect, useState } from 'react'
import { getAllRedeem, getRedeemById, delRedeem, getRedeemCodeByPrice, checkStock, addRedeem } from '../../server/server'

const Th = ({ children, className = "" }) => (
    <th className={`p-4 font-semibold text-gray-600 text-sm ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }) => (
    <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

export default function Admredeem() {
    const [redeem, setredeem] = useState([])
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newredeem, setNewredeem] = useState({
        price: "",
        code: "",
        status: "pending",
        ondate: ""
    });
    const loaddata = async () => {
        try {
            const res = await getAllRedeem()
            setredeem(res.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loaddata()
    }, [])

    const handleDelete = async (id) => {
        await delRedeem(id)
        setredeem(prev => prev.filter(v => v._id !== id))
    }
    const saveredeem = async () => {
        try {
            if (!newredeem.price || !newredeem.ondate || !newredeem.code) {
                alert("Please fill all required fields");
                return;
            }

            const payload = {
                price: Number(newredeem.price),
                code: newredeem.code,
                status: "pending",
                ondate: newredeem.ondate || null,
                to: null // important
            };
            await addRedeem(payload);


            alert("Redeem added successfully!");
            setShowAddPopup(false);
            setNewredeem({
                price: "",
                code: "",
                status: "pending",
                ondate: ""
            });
            loaddata();
        } catch (err) {
            console.error(err);
            alert("Failed to add redeem");
        }
    };



    return (
        <div>
            <div className="p-6 min-h-screen bg-white font-sans">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">redeem Management</h2>
                        <p className="text-gray-500 text-sm mt-1">Create and manage eSports redeems</p>
                    </div>
                    <button
                        onClick={() => setShowAddPopup(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Add redeem
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <Th>Price</Th>
                                    <Th>Date</Th>
                                    <Th>Status</Th>
                                    <Th className="text-right">Actions</Th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {redeem.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400">
                                            No redeem found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    redeem.map((t) => (
                                        <tr key={t._id} className="hover:bg-gray-50 transition-colors group">


                                            <Td>
                                                <div>
                                                    <p className="font-bold text-gray-900">₹ {t.price || "Untitled redeem"}</p>
                                                    <p className="text-xs text-gray-500 mt-1">ID: {t._id}</p>
                                                </div>
                                            </Td>

                                            <Td>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <i className="fa-regular fa-calendar text-xs"></i>
                                                    <span>{t.ondate ? new Date(t.ondate).toLocaleDateString() : 'TBA'}</span>
                                                </div>
                                            </Td>

                                            <Td>
                                                <div className="flex justify-center">
                                                    <p className={`font-bold px-3 py-1 rounded text-center ${{
                                                        'used': 'bg-red-100 text-red-600',
                                                        'pending': 'bg-blue-100 text-blue-600',
                                                    }[t.tag?.toLowerCase()] || 'bg-gray-100 text-gray-900'
                                                        }`}>
                                                        {t.status || "No Tag"}
                                                    </p>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex justify-end gap-2">

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
                        {showAddPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl shadow-lg p-5 w-96 text-black">
                                    <h1
                                        className="text-xl font-bold mb-4">Add New Match</h1>

                                    <div className="space-y-3 text-sm">
                                        <input
                                            type="text"
                                            placeholder="redeem Name"
                                            value={newredeem.price}
                                            onChange={e => setNewredeem({ ...newredeem, price: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Image Link"
                                            value={newredeem.code}
                                            onChange={e => setNewredeem({ ...newredeem, code: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="date"
                                            placeholder="Date"
                                            value={newredeem.ondate}
                                            onChange={e => setNewredeem({ ...newredeem, ondate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowAddPopup(false)}>Cancel</button>
                                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg" onClick={saveredeem}>Add Match</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Status Popup */}

                    </div>
                </div>
            </div>
        </div>
    )
}
