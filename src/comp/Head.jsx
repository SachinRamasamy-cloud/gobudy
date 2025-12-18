import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "../../server/server";
import { UserContext } from "./UserContext";

export default function Head() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const currentBalance = user?.wallet ?? 0;
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tournaments", path: "/tournaments" },
    { label: "Videos", path: "/all-video" },
    { label: "Top Games", path: "/top-players" },
    { label: "Wallet", path: "/add-balance" }
  ];

  const LoadUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await getUserById(userId);
      setUser(res?.data || {});
    } catch (err) {
      console.log("Failed to load user:", err);
    }
  };
  useEffect(() => {
    LoadUser();
    const interval = setInterval(() => {
      LoadUser();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 bg-[#0d0d0d]/95"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto w-full">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.button
            className="text-xl text-white md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </motion.button>

          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">
              Go<span className="text-[#e50914]">Budy</span>
            </h1>
          </Link>
        </div>

        {/* CENTER NAV */}
        <nav className="hidden lg:flex gap-6 flex-1 justify-center">
          {navItems.map((item) => {
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
          <Link
            to="/add-balance"
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40
            border border-white/10 hover:border-[#e50914]/60 transition-all"
          >
            <i className="fa-solid fa-wallet text-[#e50914]"></i>
            <span className="font-bold">
              ₹{currentBalance.toLocaleString('en-IN')}
            </span>
            <span className="text-[#e50914] font-black text-lg leading-none">+</span>
          </Link>

          <button className="relative p-2 rounded-lg hover:bg-white/5">
            <i className="fa-solid fa-bell"></i>
            <span className="absolute -top-1 -right-1 bg-[#e50914] text-white text-[10px] font-bold px-1 rounded-full">
              7
            </span>
          </button>


          <div
            onClick={toggleDropdown}
            className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/054/555/561/small/a-man-wearing-headphones-and-sunglasses-is-wearing-a-hoodie-free-vector.jpg"
              className="w-10 h-10 rounded-full border border-[#e50914]/40 object-cover"
              alt="profile"
            />
            <div className="hidden md:block">
              <span className="text-sm font-bold">{user.name ?? "User"}</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* Dropdown Items */}
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-0">
              Account settings
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">
              Support
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-2">
              License
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
