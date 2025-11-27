import Reveal from "../Reveal";
import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Topgm() {
  const games = [
    {
      name: "BGMI",
      type: "Battle Royale",
      members: "334,670",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qgH2OVdFP7YZ7XDEKMNbYJhZaNbW4DfNfA&s",
    },
    {
      name: "Free Fire",
      type: "Battle Royale",
      members: "33,670",
      img: "https://i.pinimg.com/736x/a3/56/33/a35633f4678e1475f3277d25f4733259.jpg",
    },
    {
      name: "Apex Legends",
      type: "Battle Royale",
      members: "33,467",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42kgeZm7lCykdYGc5o3djXvt9y0JgdeLGHQ&s",
    },
    {
      name: "Valorant",
      type: "FPS",
      members: "54,670",
      img: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6",
    },
    {
      name: "League of Legends",
      type: "MOBA",
      members: "34,690",
      img: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/leagueoflegends.png",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10">
      <Reveal>
        {/* Header */}
        <div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p className="text-[#00e5ff] text-sm font-semibold uppercase tracking-widest mb-2">Top Picks</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Featured{" "}
              <span className="text-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                Games
              </span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-xl">Explore the most competitive gaming titles with thousands of active players</p>
          </div>

          <div className="flex gap-3">
            {/* Left Button */}
            <button
              onClick={() => scroll(-300)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(229,9,20,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left text-white font-bold"></i>
            </button>

            {/* Right Button */}
            <button
              onClick={() => scroll(300)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(229,9,20,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right text-white font-bold"></i>
            </button>
          </div>
        </div>
      </Reveal>
      <Reveal>
        {/* Horizontal Scroll */}
        <div
          className="w-full flex gap-6 overflow-x-auto px-2 hide-scrollbar snap-x snap-mandatory"
        >
          {games.map((gm, i) => (
            <div
              key={i}
              className="relative w-[260px] sm:w-[300px] h-[360px] rounded-2xl overflow-hidden 
              shadow-[0_0_30px_rgba(0,0,0,0.5)] 
              bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-md border border-white/10 hover:border-[#e50914]/50 flex-shrink-0 snap-center transition-all"
            >
              {/* Image */}
              <img
                src={gm.img}
                alt={gm.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/80"></div>

              {/* Overlay Box */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent"
              >
                <p className="text-[#00e5ff] text-xs font-bold uppercase tracking-widest mb-2">{gm.type}</p>

                <h2 className="text-lg font-bold text-white mb-3 leading-tight">{gm.name}</h2>

                <p
                  className="text-sm text-gray-300 flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-group text-[#e50914] font-bold"></i>
                  <span className="font-semibold">{gm.members}</span> players
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section >
  );
}
