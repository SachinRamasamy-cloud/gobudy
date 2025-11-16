// import React, { useRef } from 'react'
// import { motion } from "framer-motion";



// export default function Topgm() {
//     const games = [
//         {
//             name: "BGMI",
//             type: "Battle Royale",
//             members: "334,670",
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qgH2OVdFP7YZ7XDEKMNbYJhZaNbW4DfNfA&s",
//         },
//         {
//             name: "Free Fire",
//             type: "Battle Royale",
//             members: "33,670",
//             img: "https://i.pinimg.com/736x/a3/56/33/a35633f4678e1475f3277d25f4733259.jpg",
//         },
//         {
//             name: "Apex Legends",
//             type: "Battle Royale",
//             members: "33,467",
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42kgeZm7lCykdYGc5o3djXvt9y0JgdeLGHQ&s",
//         },
//         {
//             name: "Valorant",
//             type: "FPS",
//             members: "54,670",
//             img: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6",
//         },
//         {
//             name: "League of Legends",
//             type: "MOBA",
//             members: "34,690",
//             img: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/leagueoflegends.png",
//         },
//     ];
//     const scrollRef = useRef(null);

//     const scroll = (offset) => {
//         if (!scrollRef.current) return;
//         scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
//     };

//     return (
//         <div>
//             {/* ✅ FEATURED GAMES */}
//             <section className="bg-gray-900 py-10">
//                 <div className="flex items-center justify-between px-6 md:px-10 mb-6">
//                     <h2 className="text-3xl md:text-4xl font-bold text-white">
//                         Featured
//                         <span className="text-red-600 ml-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
//                             Games
//                         </span>
//                     </h2>
//                     <div className="flex gap-3">
//                         <button
//                             onClick={() => scroll(-300)}
//                             aria-label="Scroll Left"
//                             className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
//                         >
//                             <i className="fa-solid fa-chevron-left text-white"></i>
//                         </button>
//                         <button
//                             onClick={() => scroll(300)}
//                             aria-label="Scroll Right"
//                             className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
//                         >
//                             <i className="fa-solid fa-chevron-right text-white"></i>
//                         </button>
//                     </div>
//                 </div>

//                 <div
//                     ref={scrollRef}
//                     className="w-full flex gap-6 overflow-x-auto px-8 hide-scrollbar snap-x snap-mandatory"
//                 >
//                     {games.map((gm, i) => (
//                         <motion.div
//                             key={i}
//                             whileHover={{ scale: 1.05 }}
//                             className="relative w-[260px] sm:w-[300px] h-[340px] rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-black/30 snap-center"
//                         >
//                             <img
//                                 src={gm.img}
//                                 alt={gm.name}
//                                 loading="lazy"
//                                 className="w-full h-full object-cover transition-transform duration-500"
//                             />
//                             <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-md rounded-lg p-4 border border-white/10">
//                                 <p className="text-red-500 text-sm font-semibold mb-1">
//                                     {gm.type}
//                                 </p>
//                                 <h2 className="text-xl font-bold text-white">{gm.name}</h2>
//                                 <p className="text-sm text-gray-300 mt-1">
//                                     <i className="fa-solid fa-user-group text-red-500 mr-2"></i>
//                                     {gm.members} players
//                                 </p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </section>

//         </div>
//     )
// }
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

  const scrollRef = useRef(null);
  const scroll = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-[#0d0d0d] dark:bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white">
          Featured{" "}
          <span className="text-[#e50914] drop-shadow-[0_0_10px_rgba(229,9,20,0.7)]">
            Games
          </span>
        </h2>

        <div className="flex gap-3">
          {/* Left Button */}
          <button
            onClick={() => scroll(-300)}
            className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
            >
            <i className="fa-solid fa-chevron-left text-white"></i>
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll(300)}
            className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
            >
            <i className="fa-solid fa-chevron-right text-white"></i>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="w-full flex gap-6 overflow-x-auto px-8 hide-scrollbar snap-x snap-mandatory"
      >
        {games.map((gm, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.06 }}
            className="relative w-[260px] sm:w-[300px] h-[350px] rounded-xl overflow-hidden 
              shadow-[0_0_20px_rgba(0,0,0,0.5)] 
              bg-[#111]/40 backdrop-blur-md border border-white/10 flex-shrink-0 snap-center"
          >
            <img
              src={gm.img}
              alt={gm.name}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Overlay Box */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 dark:bg-black/80 backdrop-blur-lg 
              rounded-xl p-4 border border-white/10">
              <p className="text-white text-sm font-semibold mb-1">{gm.type}</p>

              <h2 className="text-xl font-bold text-white">{gm.name}</h2>

              <p className="text-sm text-gray-300 mt-1">
                <i className="fa-solid fa-user-group text-[#00e5ff] mr-2"></i>
                {gm.members} players
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
