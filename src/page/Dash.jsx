
import React, { useRef } from "react";
import './Card3.css'
import { useScrollAnimation } from "../Scroll";

export default function Dash() {

    const scrollgm = useRef()

    const scroll = (offset) => {
        scrollgm.current.scrollBy({
            left: offset,
            behavior: "smooth", 
        });
    };
    const gmcards = [
        {
            name: "Bgmi",
            type: "BAttle Royale",
            members: "334,670",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qgH2OVdFP7YZ7XDEKMNbYJhZaNbW4DfNfA&s"
        }, {
            name: "Free Fire",
            type: "BAttle Royale",
            members: "33,670",
            img: "https://i.pinimg.com/736x/a3/56/33/a35633f4678e1475f3277d25f4733259.jpg"
        }, {
            name: "Apex",
            type: "BAttle Royale",
            members: "33,467",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42kgeZm7lCykdYGc5o3djXvt9y0JgdeLGHQ&s"
        }, {
            name: "Valorant",
            type: "FPS",
            members: "54,670",
            img: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6"
        }, {
            name: "League of Legends",
            type: "MOBA",
            members: "34,690",
            img: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/leagueoflegends.png"
        }, {
            name: "Fortnite",
            type: "BAttle Royale",
            members: "93,470",
            img: "https://cdn1.epicgames.com/offer/fn/EN_FNFigment_37-00_C1S6_EGS_Launcher_KeyArt_Blade_1200x1600_1200x1600-47bcc2460eec25bf410a71d3449585d2?resize=1&w=360&h=480&quality=medium"
        }, {
            name: "Dota 2",
            type: "MOBA",
            members: "634,908",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhXVUmwPMR7iigYfwZyjEfRpyaWs615Vsog&s"
        }
    ]

    return (
        <>
            <section className="relative h-screen w-full overflow-hidden">

                {/* BG Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                    <source src="/videos/37585-414024825_medium.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

                {/* contemt */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 animate-fadeIn">

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide uppercase text-white drop-shadow-lg">
                        Compete Across Every Arena
                    </h1>

                    <p className="text-gray-300 mt-5 max-w-2xl text-sm md:text-lg leading-relaxed">
                        Join tournaments, climb the rankings, and prove your skill in every game.
                    </p>

                    {/* buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-3 rounded-lg font-semibold bg-red-600 text-white shadow-lg
                        hover:shadow-red-500/50 hover:scale-105 hover:bg-red-700
                        transition-all duration-300 tracking-wide">
                            Join Now
                            <i className="fa-solid fa-arrow-right ml-4"></i>
                        </button>

                        <button className="px-10 py-3 rounded-lg font-semibold border-2 
                        border-gray-400 text-gray-200 backdrop-blur-sm
                        hover:border-red-600 hover:text-white hover:shadow-red-500/50 hover:scale-105
                        transition-all duration-300 tracking-wide">
                            View Leaderboard
                        </button>
                    </div>

                </div>
            </section>

            {/* fetured games */}
            <div className="bg-gray-800 py-4">
                {/* head */}
                <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
                    {/* title */}
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                            Featured
                            <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
                                Games
                            </span>
                        </h1>

                    </div>
                    {/* buttons */}
                    <div className="flex gap-2 sm:gap-4">
                        <div
                            onClick={() => scroll(-300)}
                            className="w-11 h-11 rounded-full bg-gray-900 hover:bg-red-600 
                 flex items-center justify-center 
                 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]
                 transition-all duration-200 cursor-pointer"
                        >
                            <i className="fa-solid fa-chevron-left text-white text-lg"></i>
                        </div>

                        <div
                            onClick={() => scroll(300)}
                            className="w-11 h-11 rounded-full bg-gray-900 hover:bg-red-600 
                 flex items-center justify-center 
                 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]
                 transition-all duration-200 cursor-pointer"
                        >
                            <i className="fa-solid fa-chevron-right text-white text-lg"></i>
                        </div>
                    </div>
                </div>

                {/* game cards */}
                <div className=" my-4">
                    <div className="w-full overflow-x-auto flex animate-fadeUp gap-5 px-8 snap-x snap-mandatory hide-scrollbar"

                        ref={scrollgm}>
                        {gmcards.map((gm, idx) => {
                            const [ref, visible] = useScrollAnimation();

                            return (
                                <div
                                    key={idx}
                                    ref={ref}
                                    className="relative w-[280px] h-[360px] rounded-xl overflow-hidden group shadow-lg flex-shrink-0 transition-transform duration-500"
                                    style={{
                                        opacity: visible ? 1 : 0,             // start fully hidden
                                        transform: visible ? "translateY(0)" : "translateY(20px)",
                                        animation: visible ? `fadeInUp 0.8s ease-out forwards` : "none",
                                        animationDelay: `${idx * 150}ms`,
                                    }}
                                >
                                    <img
                                        src={gm.img}
                                        alt={gm.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300">
                                        <p className="text-red-500 text-sm font-semibold mb-1">{gm.type}</p>
                                        <h2 className="text-xl font-bold text-white mb-1">{gm.name}</h2>
                                        <p className="text-sm text-gray-300 flex items-center gap-2">
                                            <i className="fa-solid fa-user-group text-white"></i>
                                            <span className="text-white font-semibold">{gm.members} players</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div >


            {/* fetured turnaments */}
            <div className=" py-4 bg-black">
                {/* head */}
                <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
                    {/* title */}
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                            Featured
                            <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
                                Tournaments
                            </span>
                        </h1>
                        <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
                            Join upcoming tournaments and compete for prizes
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 py-8 justify-items-center">

    <div className="group w-full max-w-[404px] bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-red-500/20 hover:scale-105 duration-300">
                        <div className="relative overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                                alt="Valorant Tournament"
                                className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                    Valorant
                                </span>
                            </div>
                        </div>

                        {/* content section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Summer Championship
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span>Aug 15, 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm font-semibold mt-3">
                                <div>
                                    <p className="text-gray-400 mb-1 tracking-wide">PRIZE POOL</p>
                                    <h3 className="text-green-400 text-lg">$5,000</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 mb-1 tracking-wide">PARTICIPANTS</p>
                                    <h3 className="text-white text-lg">24/32</h3>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors">
                                Join Tournament
                            </button>
                        </div>
                    </div>
                
    <div className="group w-full max-w-[404px] bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-red-500/20 hover:scale-105 duration-300">
                        <div className="relative overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                                alt="Valorant Tournament"
                                className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                    Valorant
                                </span>
                            </div>
                        </div>

                        {/* content section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Summer Championship
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span>Aug 15, 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm font-semibold mt-3">
                                <div>
                                    <p className="text-gray-400 mb-1 tracking-wide">PRIZE POOL</p>
                                    <h3 className="text-green-400 text-lg">$5,000</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 mb-1 tracking-wide">PARTICIPANTS</p>
                                    <h3 className="text-white text-lg">24/32</h3>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors">
                                Join Tournament
                            </button>
                        </div>
                    </div>
                
    <div className="group w-full max-w-[404px] bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-red-500/20 hover:scale-105 duration-300">
                        <div className="relative overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                                alt="Valorant Tournament"
                                className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                    Valorant
                                </span>
                            </div>
                        </div>

                        {/* content section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Summer Championship
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span>Aug 15, 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm font-semibold mt-3">
                                <div>
                                    <p className="text-gray-400 mb-1 tracking-wide">PRIZE POOL</p>
                                    <h3 className="text-green-400 text-lg">$5,000</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 mb-1 tracking-wide">PARTICIPANTS</p>
                                    <h3 className="text-white text-lg">24/32</h3>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors">
                                Join Tournament
                            </button>
                        </div>
                    </div>
                
    <div className="group w-full max-w-[404px] bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-red-500/20 hover:scale-105 duration-300">
                        <div className="relative overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                                alt="Valorant Tournament"
                                className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                    Valorant
                                </span>
                            </div>
                        </div>

                        {/* content section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Summer Championship
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span>Aug 15, 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm font-semibold mt-3">
                                <div>
                                    <p className="text-gray-400 mb-1 tracking-wide">PRIZE POOL</p>
                                    <h3 className="text-green-400 text-lg">$5,000</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 mb-1 tracking-wide">PARTICIPANTS</p>
                                    <h3 className="text-white text-lg">24/32</h3>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors">
                                Join Tournament
                            </button>
                        </div>
                    </div>
                
    <div className="group w-full max-w-[404px] bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-red-500/20 hover:scale-105 duration-300">
                        <div className="relative overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                                alt="Valorant Tournament"
                                className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                    Valorant
                                </span>
                            </div>
                        </div>

                        {/* content section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Summer Championship
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span>Aug 15, 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm font-semibold mt-3">
                                <div>
                                    <p className="text-gray-400 mb-1 tracking-wide">PRIZE POOL</p>
                                    <h3 className="text-green-400 text-lg">$5,000</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 mb-1 tracking-wide">PARTICIPANTS</p>
                                    <h3 className="text-white text-lg">24/32</h3>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg mt-4 transition-colors">
                                Join Tournament
                            </button>
                        </div>
                    </div>
                
                </div>
            </div >
        </>
    );
}  

