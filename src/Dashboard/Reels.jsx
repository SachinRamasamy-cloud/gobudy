import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Reels() {
  const scrollgm = useRef();
  const scroll = (offset) => {
    scrollgm.current.scrollBy({ left: offset, behavior: "smooth" });
  };
  const navigate = useNavigate();

  const gmcards = [
    {
      name: "Bgmi",
      type: "Battle Royale",
      members: "334,670",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qgH2OVdFP7YZ7XDEKMNbYJhZaNbW4DfNfA&s",
      video: "https://www.youtube.com/embed/NBzaosLXo7Q",
    },
    {
      name: "Valorant",
      type: "FPS",
      members: "54,670",
      img: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6",
      video: "https://www.youtube.com/embed/Jg0LxJ5c6vI",
    },
    {
      name: "Fortnite",
      type: "Battle Royale",
      members: "93,470",
      img: "https://cdn1.epicgames.com/offer/fn/EN_FNFigment_37-00_C1S6_EGS_Launcher_KeyArt_Blade_1200x1600_1200x1600-47bcc2460eec25bf410a71d3449585d2?resize=1&w=360&h=480&quality=medium",
      video: "https://www.youtube.com/embed/Dt4zvJNXbdI",
    },
    {
      name: "Dota 2",
      type: "MOBA",
      members: "634,908",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhXVUmwPMR7iigYfwZyjEfRpyaWs615Vsog&s",
      video: "https://www.youtube.com/embed/VjFZz0F8S2g",
    },
    {
      name: "Bgmi",
      type: "Battle Royale",
      members: "334,670",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qgH2OVdFP7YZ7XDEKMNbYJhZaNbW4DfNfA&s",
      video: "https://www.youtube.com/embed/NBzaosLXo7Q",
    },
    {
      name: "Valorant",
      type: "FPS",
      members: "54,670",
      img: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6",
      video: "https://www.youtube.com/embed/Jg0LxJ5c6vI",
    },
    {
      name: "Fortnite",
      type: "Battle Royale",
      members: "93,470",
      img: "https://cdn1.epicgames.com/offer/fn/EN_FNFigment_37-00_C1S6_EGS_Launcher_KeyArt_Blade_1200x1600_1200x1600-47bcc2460eec25bf410a71d3449585d2?resize=1&w=360&h=480&quality=medium",
      video: "https://www.youtube.com/embed/Dt4zvJNXbdI",
    },
    {
      name: "Dota 2",
      type: "MOBA",
      members: "634,908",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhXVUmwPMR7iigYfwZyjEfRpyaWs615Vsog&s",
      video: "https://www.youtube.com/embed/VjFZz0F8S2g",
    },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative bg-[#0d0d0d] py-16 px-6 md:px-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-[#0d0d0d] to-gray-950/50 pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        className="relative z-10 flex flex-row items-start md:items-center justify-between mb-12 gap-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Gaming Collection</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Gaming
            <span className="ml-3 bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
              Reels
            </span>
          </h2>
        </div>

        {/* Scroll buttons */}
        <motion.div 
          className="flex gap-2 sm:gap-4 flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.button
            onClick={() => scroll(-300)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex items-center justify-center cursor-pointer
                hover:border-[#e50914]/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300 group shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fa-solid fa-chevron-left text-white text-lg group-hover:text-[#00e5ff] transition-colors"></i>
          </motion.button>
          <motion.button
            onClick={() => scroll(300)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 flex items-center justify-center cursor-pointer
                hover:border-[#e50914]/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300 group shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fa-solid fa-chevron-right text-white text-lg group-hover:text-[#00e5ff] transition-colors"></i>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Game cards carousel */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="w-full overflow-x-auto flex gap-6 md:gap-8 px-2 snap-x snap-mandatory hide-scrollbar"
          ref={scrollgm}
        >
          {gmcards.map((gm, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative w-[240px] h-[340px] rounded-2xl overflow-hidden group flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, translateY: -8 }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-950/80 z-10" />
              
              {/* Image */}
              <img
                src={gm.img}
                alt={gm.name}
                className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 ${hovered === idx ? "opacity-0 scale-105" : "opacity-100"
                  }`}
              />

              {/* Hover video */}
              {hovered === idx && (
                <motion.video
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <source src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.mp4`} type="video/mp4" />
                </motion.video>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/95 z-20" />

              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-5 z-30 flex flex-col justify-end h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {/* Type badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
                  <p className="text-xs uppercase tracking-widest text-[#00e5ff] font-bold">
                    {gm.type}
                  </p>
                </div>

                {/* Game name */}
                <p className="text-xl font-black text-white mb-2 tracking-tight">
                  {gm.name}
                </p>

                {/* Engagement stats */}
                <motion.p 
                  className="text-sm text-gray-200 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-[#00e5ff]/30">
                    <i className="fa-solid fa-fire text-[#e50914] text-sm"></i>
                    <span className="text-white font-bold">
                      {Math.floor(
                        Math.random() * (10000000 - 100000) + 100000
                      ).toLocaleString()}
                    </span>
                  </span>
                </motion.p>
              </motion.div>
            </motion.div>
          ))}

          {/* View More card */}
          <motion.div
            onClick={() => navigate("/reels")}
            className="relative w-[240px] h-[340px] rounded-2xl flex-shrink-0 overflow-hidden flex flex-col items-center justify-center cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: gmcards.length * 0.08 }}
            whileHover={{ scale: 1.05, translateY: -8 }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-950/80 group-hover:from-[#e50914]/20 group-hover:to-[#e50914]/5 transition-all duration-500" />
            <div className="absolute inset-0 border border-[#e50914]/40 group-hover:border-[#e50914]/100 transition-all duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <i className="fa-solid fa-arrow-right text-4xl bg-gradient-to-r from-[#e50914] to-[#ff6b6b] bg-clip-text text-transparent"></i>
              </motion.div>
              <p className="text-xl font-black tracking-tight text-white group-hover:text-[#e50914] transition-colors">
                View More
              </p>
              <p className="text-xs text-[#00e5ff] font-semibold uppercase tracking-wider mt-2">
                Explore Collection
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
