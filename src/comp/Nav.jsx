
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Nav({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation(); // get current URL

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house", path: "/" },
    { name: "Featured Games", icon: "fa-solid fa-gamepad", path: "/featured-games" },
    { name: "Tournaments", icon: "fa-solid fa-trophy", path: "/tournaments" },
    { name: "Best Players", icon: "fa-solid fa-users", path: "/best-players" },
    { name: "Top Videos", icon: "fa-solid fa-video", path: "/top-videos" },
    { name: "Reels", icon: "fa-solid fa-film", path: "/reels" },
    { name: "Join Match", icon: "fa-solid fa-handshake", path: "/join-match" },
    { name: "Settings", icon: "fa-solid fa-gear", path: "/settings" },
  ];

  const handleClick = (item) => {
    navigate(item.path); // navigate to the route
    setIsOpen(false);    // close sidebar
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 flex flex-col p-6 text-white shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-red-500">GoBudy</h1>
              <button onClick={() => setIsOpen(false)}>
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleClick(item)}
                  className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-colors
                    ${location.pathname === item.path
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-500 hover:text-white"}`}
                >
                  <i className={`${item.icon} text-xl`}></i>
                  <span className="text-lg">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}
