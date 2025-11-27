import React, { useEffect, useState } from "react";
import { getAllPayments, getPaymentById, getUserById, updUser, updPayment } from "../../server/server";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  // Fetch all payment requests
  const loadPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data);
      console.log(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let initial
    loadPayments();
        initial = setInterval(loadPayments, 5000);
        return () => clearInterval(initial);
  }, []);

  const handleApprove = async (paymentId) => {
    try {
      const payRes = await getPaymentById(paymentId);
      const payment = payRes.data;

      const userRes = await getUserById(payment.userId);
      const user = userRes.data;

      const updatedWallet = user.wallet + payment.amount;
      
      const updatedTransactions = (user.transaction || []).map(txn =>
        txn._id === payment._id
          ? { ...txn, status: "approved" } // update only the status
          : txn // keep old transactions as-is
      );

      await updUser(user._id, {
        ...user,
        wallet: updatedWallet,
        transaction: updatedTransactions,
      });

      // Optionally also update payment document in backend
      await updPayment(payment._id, { ...payment, Status: "approved" });

      alert("Payment Approved & Transaction Recorded!");
      loadPayments();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Approval failed");
    }
  };

  const Th = ({ children }) => (
    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
      {children}
    </th>
  )

  const Td = ({ children }) => (
    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-50">
      {children}
    </td>
  )

  return (

    <div className="p-6 min-h-screen bg-white font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage eSports payments</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Payment
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Amount & Fee</Th>
                <Th>Date</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No tournaments found. Create one to get started.</td>
                </tr>
              ) : (
                payments.reverse().map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                    <Td>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-bold text-gray-900">{t.title || "Untitled Tournament"}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {t._id}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                        {t.type}
                      </span>
                    </Td>
                    <Td>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500 uppercase">Amount</div>
                        <div className="font-bold text-green-600">{t.amount || '₹0'}</div>
                        <div className="text-xs text-gray-400">Fee: {Number(t.fee) > 0 ? `₹${t.fee}` : 'Free'}</div>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2 text-gray-600">
                        <i className="fa-regular fa-calendar text-xs"></i>
                        <span>{t.date ? new Date(t.date).toLocaleDateString() : 'TBA'}</span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        {t.Status === "pending" ? (
                          <button
                            onClick={() => handleApprove(t._id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-gray-500">Approved</span>
                        )}
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default AdminPayments;
