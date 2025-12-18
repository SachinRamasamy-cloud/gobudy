import React, { useContext, useState } from "react";
import { UserContext } from "../comp/UserContext";
import { getUserById } from "../../server/server";
import { Link } from "react-router-dom";

export default function Hero() {

  const { user, setUser } = useContext(UserContext);

  const LoadUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await getUserById(userId);
      setUser(res?.data || {});
      console.log("API RESPONSE:", res.data);

    } catch (err) {
      console.log("Failed to load user:", err);
    }
  };

  const currentBalance = user?.wallet ?? 0;


  const upcomingTournament = {
    name: "Winter Clash Series",
    date: "Jan 15, 2026",
    time: "20:00 IST",
    prize: "₹50,000",
    status: "Registration Open",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?q=80&w=1200&auto=format&fit=crop",
  };

  return (
    <section className="relative py-12 bg-black overflow-hidden border-b border-gray-800">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">

        {/* Top Section: Greeting + Wallet + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">

          {/* Greeting */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-black text-white leading-snug">
                Welcome back, <span className="text-red-500">
                  {user?.name}</span>.
              </h1>
              <p className="text-gray-400 text-lg mt-3 max-w-sm">
                Quick access to your funds and primary actions. Everything you need in one place.
              </p>
            </div>
          </div>

          {/* Wallet Tile */}
          <div className="flex items-center">
            <div
              className="
                w-full p-6 rounded-2xl
                bg-gray-800/70 backdrop-blur-sm
                border border-gray-700
                shadow-lg shadow-black/50
                hover:bg-gray-800 transition-all
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  Wallet Balance
                </p>
                <Link to="/withdraw">
                  <span className="text-2xl text-cyan-400">
                    <i className="fa-solid fa-money-bill-transfer text-xl"></i>
                  </span>
                </Link>
              </div>

              <p className="text-4xl font-bold text-cyan-400 mt-4">
                ₹{currentBalance.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 justify-center">
            <a
              href="#"
              className="
                px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700
                text-white font-bold text-sm uppercase text-center
                shadow-md shadow-red-900/40 transition-all
              "
            >
              Update Profile
            </a>

            <Link
              to="/add-balance"
              className="
                px-6 py-3 rounded-xl border border-cyan-500/40
                text-cyan-300 font-semibold text-sm uppercase text-center
                bg-gray-900 hover:bg-gray-800
                shadow-md shadow-black/40 transition-all
              "
            >
              View Wallet
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12" />

        {/* Tournament Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Poster */}
          <div className="w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJombAn3KnI5mxryqTmsTh4G5DShDByRc7g&s"
              alt="Tournament"
              className="
                w-full h-72 object-cover rounded-2xl
                shadow-2xl border border-red-600/40
              "
            />
          </div>

          {/* Event Card */}
          <div
            className="
              p-6 md:p-8 rounded-2xl
              bg-gray-900/70 backdrop-blur-md
              border border-gray-800
              shadow-xl shadow-black/40
              transition-all hover:bg-gray-900
            "
          >
            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
              Event Alert
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1 leading-tight">
              {upcomingTournament.name}
            </h2>

            <p className="text-gray-400 mt-2 text-md">
              {upcomingTournament.date} •{" "}
              <span className="text-cyan-400">{upcomingTournament.time}</span>
            </p>

            <div className="mt-6 border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-500 uppercase tracking-widest">
                Guaranteed Prize Pool
              </p>
              <p className="text-4xl font-black text-cyan-400 mt-1">
                {upcomingTournament.prize}
              </p>
            </div>

            <a
              href="#"
              className="
                mt-8 px-6 py-3 block rounded-xl
                bg-red-600 hover:bg-red-700
                text-white font-bold text-sm uppercase text-center
                shadow-lg shadow-red-900/40 transition-all
              "
            >
              {upcomingTournament.status}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
