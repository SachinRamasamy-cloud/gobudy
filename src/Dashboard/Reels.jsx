import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-[#0d0d0d] py-6">
      {/* Header */}
      <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Gaming
            <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
              Reels
            </span>
          </h1>
        </div>

        <div className="flex gap-2 sm:gap-4">
          <div
            onClick={() => scroll(-300)}
            className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
          >
            <i className="fa-solid fa-chevron-left text-white text-lg"></i>
          </div>
          <div
            onClick={() => scroll(300)}
            className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center cursor-pointer
                hover:bg-[#E50914] hover:border-[#E50914] hover:scale-105 transform transition-all focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2"
          >
            <i className="fa-solid fa-chevron-right text-white text-lg"></i>
          </div>
        </div>
      </div>

      {/* Game cards */}
      <div className="my-4">
        <div
          className="w-full overflow-x-auto flex animate-fadeUp gap-5 px-8 snap-x snap-mandatory hide-scrollbar"
          ref={scrollgm}
        >
          {gmcards.map((gm, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative w-[240px] h-[330px] rounded-2xl overflow-hidden group flex-shrink-0 
              bg-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.05)] 
              transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,0,0,0.4)]"
            >
              <img
                src={gm.img}
                alt={gm.name}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${hovered === idx ? "opacity-0" : "opacity-100"
                  }`}
              />

              {hovered === idx && (
                <video
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                  <source src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.mp4`} type="video/mp4" />
                </video>
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 z-20" />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transition-all duration-300 group-hover:translate-y-[-4px]">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://via.placeholder.com/24/ff0000/000000?text=G"
                    alt="game icon"
                    className="w-6 h-6 rounded-full border border-red-600/50 object-cover shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                  />
                  <p className="text-xs uppercase tracking-wide text-white font-semibold">
                    {gm.type}
                  </p>
                </div>

                <p className="text-lg font-bold text-white  mb-1">
                  {gm.name}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <i className="fa-solid fa-heart text-[#3B82F6] text-base "></i>
                  <span className="text-white font-semibold tracking-wide">
                    {Math.floor(
                      Math.random() * (10000000 - 100000) + 100000
                    ).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          ))}

          <div
            onClick={() => navigate("/reels")}
            className="relative w-[240px] h-[330px] rounded-2xl flex-shrink-0 bg-gray-900 border border-red-600/40 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-red-700/40 hover:scale-105 transition-all duration-300 group"
          >
            <i className="fa-solid fa-arrow-right text-3xl mb-3 group-hover:translate-x-1 transition-transform"></i>
            <p className="text-xl font-bold tracking-wide">View More</p>
          </div>
        </div>
      </div>
    </div>
  );
}
