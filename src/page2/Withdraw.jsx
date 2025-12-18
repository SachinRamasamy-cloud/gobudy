import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkStock, getRedeemCodeByPrice, getUserById, SendMail, updateWallet, updUser } from "../../server/server";

export default function Withdraw() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [withdrawDetails, setWithdrawDetails] = useState(null);
  const [userInput, setUserInput] = useState("");

  // --- Data (LOGIC PRESERVED) ---
  const gameUC = [
    {
      name: "BGMI",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PCZrnHg01LbYDVk58EjMcUhS8pCjZWFAA&s",
      currency: [
        { label: "UC", amount: 60, cost: 70 },
        { label: "UC", amount: 300, cost: 430 },
        { label: "UC", amount: 600, cost: 830 },
        { label: "Royal Pass", amount: 360, cost: 400, special: true },
      ],
    },
    {
      name: "Free Fire",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQKYuIERqAZ8SJ3gWNtTbTuUW5MKNPX3Pmw&s",
      currency: [
        { label: "Diamonds", amount: 50, cost: 50 },
        { label: "Diamonds", amount: 100, cost: 90 },
        { label: "Diamonds", amount: 520, cost: 480 },
        { label: "Elite Pass", amount: 499, cost: 550, special: true },
      ],
    },
  ];

  const paymentMethods = {
    upi: [
      { title: "UPI 10hr", min: 10, cost: 20, fee: "0%" },
      { title: "UPI 16hrs", min: 50, cost: 60, fee: "0%" },
      { title: "UPI Instant", min: 100, cost: 120, fee: "10%" },
      { title: "UPI 24hrs", min: 500, cost: 550, fee: "0%" },
    ],
    crypto: [
      { coin: "USDT", network: "TRC20", minWithdrawal: "5", fee: "1 USDT", cost: 90 },
      { coin: "USDT", network: "ERC20", minWithdrawal: "10", fee: "5 USDT", cost: 440 },
      { coin: "BTC", network: "Bitcoin", minWithdrawal: "0.0005", fee: "0.0001 BTC", cost: 5000 },
    ],
    playstore: [
      { value: 50, fee: 10, cost: 40 },
      { value: 100, fee: 10, cost: 90 },
      { value: 500, fee: 20, cost: 480 },
    ],
  };
  const [user, setUser] = useState(null);

  // Logic to load user 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const localUser = JSON.parse(storedUser);
    console.log(localUser._id)
    getUserById(localUser._id)
      .then(res => {
        const safeUser = {
          ...res.data,
          wallet: res.data.wallet || 0,
        };
        setUser(safeUser);
        console.log("email", user.email);

      })
      .catch(err => console.log("User fetch failed", err));
  }, []);



  // Logic for withdrawal
  const handleWithdraw = async (w) => {
    const cost = Number(w.cost.replace(/[^\d.-]/g, ""));

    if (user.wallet < cost) {
      toast.warning("Not enough wallet balance");
      return;
    }

    const paymentData = {
      amount: cost,
      type: "debit",
      title: `Withdraw via ${w.method}`,
      date: new Date().toISOString(),
      status: "approved",
      receive: w.receive,
    };

    const newWalletBalance = user.wallet - cost;

    try {
      let redeemCode = null;
      const isPlayStore = w.method.toLowerCase().includes("play store");

      if (isPlayStore) {
        console.log("User email:", user.email);
        if (!user?.email) {
          console.error("User email not found");
          return;
        }
        const res = await getRedeemCodeByPrice(w.rawValue, user.email);
        redeemCode = res.data.code;
      }

      await SendMail({
        to: user.email,
        subject: `${isPlayStore ? "Withdraw SucessFully" : "Action Required: Your Withdrawal Request is Being Processed"}`,
        message: `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #f8f8f8; padding: 10px 0; text-align: center; border-bottom: 1px solid #ddd; }
            .details-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .details-table th, .details-table td { padding: 8px; text-align: left; border-bottom: 1px solid #eee; }
            .details-table th { background-color: #f2f2f2; font-weight: bold; }
            .important { margin-top: 20px; padding: 10px; background-color: #fffbe6; border-left: 4px solid #ffeb3b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>${isPlayStore ? "Redemption Code Issued Successfully" : "Withdrawal Request Received"}</h2>
            </div>

            <p>Dear ${user.name},</p>

            ${isPlayStore ? `
                <p>We confirm that your request for a <span class="font-bold">${w.method}</span> redemption has been successfully processed. Your redemption code is provided below in the Withdrawal Details section and is ready for immediate use.</p>
            ` : `
                <p>We confirm that your recent withdrawal request has been successfully received and is now being processed by our team. You will receive a separate notification once the funds have been disbursed to your account.</p>
            `}

            <h3>Withdrawal Details:</h3>
            <table class="details-table">
                <tr>
                    <th>Withdrawal Method:</th>
                    <td>${w.method}</td>
                </tr>
                <tr>
                    <th>Amount:</th>
                    <td>${w.receive}</td>
                </tr>
                <tr>
                    <th>Account:</th>
                    <td>${userInput}</td>
                </tr>
                ${isPlayStore ? `
                <tr>
                    <th>Redemption Code:</th>
                    <td style="font-weight: bold; color: #007bff;">${redeemCode}</td>
                </tr>` : ""}
            </table>

            <div class="important">
                ${isPlayStore ? `
                    **Action Required:** Please use this code immediately, as codes may have an expiration date.
                ` : `
                    **Please Note:** Processing times can vary based on the selected method. Please allow the standard business days for the transfer to be finalized.
                `}
            </div>

            <p>Thank you for your continued trust in our service. If you have any questions, please do not hesitate to contact our support team.</p>

            <p>
                Sincerely,<br>
                The [Your Company Name] Team
            </p>
        </div>
    </body>
    </html>
`,
      });

      const latestUserRes = await getUserById(user._id);
      const latestUser = latestUserRes.data;

      const updatedTransactions = [
        ...(latestUser.transaction || []),
        paymentData
      ];

      const finalUser = {
        ...latestUser,
        wallet: newWalletBalance,
        transaction: updatedTransactions
      };

      await updUser(user._id, finalUser);

      setUser(finalUser);
      toast.success("Withdrawal Successfully Submitted");

    } catch (err) {
      console.log(err);
      toast.error("Failed to process withdrawal");
    }
  };

  const openPopup = async (details) => {
    const res = await checkStock(details.rawValue); // call API
    if (!res.data.inStock) {
      toast.error("This card is out of stock");
      return;
    }
    setWithdrawDetails(details);
    setUserInput("");
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setWithdrawDetails(null);
    setUserInput("");
  };

  const formatAmount = (num) => {
    const parsedNum = typeof num === 'string' ? num.replace(/[^\d.-]/g, "") : num;
    return Number(parsedNum).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };


  return (
    <section className="bg-[#0d0d0d] min-h-screen text-white p-4 md:p-10 max-w-7xl mx-auto">

      {/* Header */}
      <header className="mb-12 border-b border-white/10 pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#e50914] flex items-center gap-3">
          <i className="fa-solid fa-money-bill-transfer"></i>
          Withdraw Funds
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Choose your preferred method to cash out or purchase in-game currency using your app balance.
        </p>
        {/* Current Balance Display */}
        <div className="mt-4 p-3 bg-[#1a1a1a] rounded-xl inline-block border border-white/10">
          <span className="text-sm font-semibold text-gray-400 uppercase mr-2">Your Balance:</span>
          <span className="text-2xl font-black text-[#00e5ff]">₹{formatAmount(user?.wallet ?? 0)}</span>
        </div>
      </header>

      {/* Game UC Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-[#e50914] pl-4 text-white">
          Game Currency Top-Up
        </h2>
        {gameUC.map((game) => (
          <div key={game.name} className="mb-8 p-6 bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10">
            <div className="flex items-center mb-6 border-b border-white/10 pb-3">
              <img src={game.icon} alt={game.name} className="h-10 w-10 rounded-full mr-3 object-cover border-2 border-[#e50914]" />
              <h3 className="text-2xl font-bold text-white">{game.name} Packs</h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {game.currency.map((item) => (
                <div
                  key={item.label + item.amount}
                  className={`relative min-w-[180px] p-5 rounded-xl flex-shrink-0 cursor-pointer transition duration-300 hover:scale-[1.03] text-center
                    ${item.special
                      ? "bg-red-900/40 border-2 border-[#e50914] shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                      : "bg-zinc-800 border border-zinc-700 hover:border-[#e50914]/70"
                    }`}
                  onClick={() => openPopup({
                    cost: `₹${item.cost}`,
                    receive: `${item.amount} ${item.label}`,
                    method: `${game.name} - ${item.label}`,
                    description: `Purchase ${item.amount} ${item.label} for ₹${item.cost} App Balance.`,
                    note: item.special ? "Special Pass. Ensure Player ID is correct." : "Game currency top-up. Delivery may take up to 24 hours."
                  })}
                >
                  {item.special && <span className="absolute top-0 right-0 text-xs bg-red-600 text-white font-bold px-3 py-1 rounded-tr-xl rounded-bl-xl">SPECIAL</span>}

                  <div className="text-3xl font-black mb-1 text-white">{item.amount}</div>
                  <div className="text-sm font-semibold text-gray-400 uppercase mb-3">{item.label}</div>

                  <div className="text-lg font-bold text-[#e50914]">{`Cost: ₹${item.cost}`}</div>
                  <div className="text-xs text-gray-500">{`You save 10%`}</div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Play Store */}
      <div className="mb-10 p-6 bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
          <i className="fa-brands fa-google-play"></i> Play Store Gift Cards
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {paymentMethods.playstore.map((item) => (
            <div
              key={item.value}
              className="min-w-[180px] p-5 rounded-xl flex-shrink-0 cursor-pointer bg-zinc-800 border border-zinc-700 hover:border-[#e50914]/70 transition duration-300 hover:scale-[1.03] text-center"
              onClick={() => openPopup({
                cost: `${formatAmount(item.cost)} APP B.`,
                receive: `₹${formatAmount(item.value)} Gift Card`,
                method: `Play Store (₹${item.value})`,
                description: `Receive ₹${item.value} Google Play Card for ${formatAmount(item.cost)} App Balance.`,
                note: `Processing Fee: ₹${item.fee}. Code sent instantly to email.`,
                rawValue: item.value
              })}
            >
              <div className="text-2xl font-black mb-1 text-white">{`₹${formatAmount(item.value)}`}</div>
              <div className="text-sm text-gray-400 uppercase mb-3">Gift Card Value</div>

              <div className="text-sm font-bold text-[#e50914]">{`Cost: ₹${formatAmount(item.cost)}`}</div>
              <div className="text-xs text-gray-500 mt-1">{`Discount: ₹${item.fee}`}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm mt-14 border-t border-white/10 pt-5">
        <p>Withdrawal terms apply. Ensure all account details are correct before confirmation. Funds are deducted instantly.</p>
      </footer>

      {/* Withdrawal Popup (Refined Design) */}
      {isPopupOpen && withdrawDetails && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border-2 border-[#e50914] rounded-xl max-w-sm w-full p-6 shadow-[0_0_30px_rgba(229,9,20,0.6)] animate-fade-in">
            <h3 className="text-3xl font-bold text-[#e50914] mb-4 border-b border-white/10 pb-2">Final Confirmation</h3>
            <div className="space-y-4 text-gray-300">

              {/* Summary Details */}
              <div className="p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                <p className="flex justify-between items-center"><span className="font-semibold text-gray-400">Method:</span><span className="font-bold text-white">{withdrawDetails.method}</span></p>
                <p className="flex justify-between items-center"><span className="font-semibold text-gray-400">Receive:</span><span className="font-bold text-[#00e5ff] text-xl">{withdrawDetails.receive}</span></p>
                <p className="flex justify-between items-center border-t border-zinc-700 mt-2 pt-2"><span className="font-semibold text-white">Cost (App Balance):</span><span className="font-black text-[#e50914] text-2xl">{withdrawDetails.cost}</span></p>
              </div>

              <p className="text-sm text-gray-400">{withdrawDetails.description}</p>

              {/* Input Field */}
              <div>
                <label className="font-semibold text-white block mb-2 text-sm">Enter ID/Address <span className="text-[#e50914]">*</span></label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="UID, UPI ID, or Wallet Address"
                  className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] outline-none transition"
                />
              </div>

              {/* Important Note */}
              <p className="text-xs border-t border-zinc-800 pt-3 text-red-300">
                <span className="font-bold block mb-1">NOTE:</span>
                {withdrawDetails.note}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between gap-3">
              <button onClick={closePopup} className="flex-1 bg-zinc-700 text-white py-3 rounded-lg hover:bg-zinc-600 transition font-semibold">
                Cancel
              </button>
              <button
                disabled={!userInput.trim()}
                onClick={() => {
                  handleWithdraw(withdrawDetails)
                  closePopup();
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition text-lg ${userInput.trim()
                  ? "bg-[#e50914] text-white hover:bg-red-700 shadow-md shadow-red-500/50"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  }`}
              >
                Confirm Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}