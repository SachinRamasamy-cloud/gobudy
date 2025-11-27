import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { getUserById } from "../../server/server";
import axios from "axios"

export default function Head({ setIsOpen }) {
  const [user, setUser] = useState({});
  const location = useLocation();

  // FIX: prevent infinite re-render
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tournaments", path: "/tournaments" },
    { label: "Videos", path: "/all-video" },
    { label: "Top Games", path: "/top-players" },
    { label: "Wallet", path: "/add-balance" }

  ];
  console.log("LOCALSTORAGE USER ID =", localStorage.getItem("userId"));

  useEffect(() => {
    let intial;
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const response = await getUserById(userId);
        console.log("Fetched user:", response.data);  // debug
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
     intial = setInterval(fetchUser, 5000);
    return () => clearInterval(intial);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      // className="backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 bg-[#0d0d0d]/95"
      className="
    sticky top-0 z-50
    backdrop-blur-2xl 
    bg-gradient-to-b from-black/40 to-black/10
    border-b border-white/10"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto w-full">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile Menu */}
          <motion.button
            className="text-xl text-white md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </motion.button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">
              Go<span className="text-[#e50914]">Budy</span>
            </h1>
          </Link>
        </div>

        {/* CENTER NAV (fixed alignment) */}
        <nav className="hidden lg:flex gap-6 flex-1 justify-center">
          {navItems.map((item, idx) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3 py-2 text-sm font-semibold relative ${isActive ? "text-[#e50914]" : "text-white hover:text-[#e50914]"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#e50914] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 text-white flex-shrink-0">

          {/* WALLET (with + to add balance) */}
          <Link
            to="/add-balance"
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40
            border border-white/10 hover:border-[#e50914]/60 transition-all"
          >
            <i className="fa-solid fa-wallet text-[#e50914]"></i>
            <span className="font-bold">{user.wallet ?? 0}</span>
            <span className="text-[#e50914] font-black text-lg leading-none">+</span>
          </Link>

          {/* NOTIFICATIONS */}
          <button className="relative p-2 rounded-lg hover:bg-white/5">
            <i className="fa-solid fa-bell"></i>
            <span className="absolute -top-1 -right-1 bg-[#e50914] text-white text-[10px] font-bold px-1 rounded-full">
              7
            </span>
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/default-avatar.png"
              className="w-10 h-10 rounded-full border border-[#e50914]/40 object-cover"
              alt="profile"
            />
            <div className="hidden md:block">
              <span className="text-sm font-bold">{user.name ?? "User"}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
