// import React from 'react'

// export default function Videos() {
//     return (
//         <div className=" py-4 bg-black">
//             {/* head */}
//             <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
//                 {/* title */}
//                 <div>
//                     <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
//                         Featured
//                         <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
//                             Videos
//                         </span>
//                     </h1>
//                     <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
//                         Join upcoming tournaments and compete for prizes
//                     </p>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 py-8 justify-items-center">

//                 <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden">
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
//                             alt="Valorant Tournament"
//                             className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-xl"
//                         />
//                         <div className="absolute bottom-1 right-3">
//                             <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
//                                 12.45
//                             </span>
//                         </div>
//                     </div>

//                     {/* content section */}
//                     <div className="p-5 space-y-4">
//                         <div>
//                             <h2 className="text-xl font-semibold text-white">
//                                 Summer Championship
//                             </h2>
//                             <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Aug 15, 2025</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden rounded-xl">
//                         {/* Image */}
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
//                             alt="Valorant Tournament"
//                             className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
//                         />
//                         {/* Play Button Overlay */}
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                             <button className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 transform scale-90 group-hover:scale-100">
//                                 <i className="fa-solid fa-play text-xl"></i>
//                             </button>
//                         </div>


//                         {/* Bottom Right Duration Label */}
//                         <div className="absolute bottom-2 right-3">
//                             <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
//                                 12:45
//                             </span>
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-5 space-y-3">
//                         <div>
//                             <h2 className="text-xl font-semibold text-white">
//                                 Summer Championship
//                             </h2>
//                             <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Aug 15, 2025</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden">
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
//                             alt="Valorant Tournament"
//                             className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-xl"
//                         />
//                         <div className="absolute bottom-1 right-3">
//                             <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
//                                 12.45
//                             </span>
//                         </div>
//                     </div>

//                     {/* content section */}
//                     <div className="p-5 space-y-4">
//                         <div>
//                             <h2 className="text-xl font-semibold text-white">
//                                 Summer Championship
//                             </h2>
//                             <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Aug 15, 2025</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden rounded-xl">
//                         {/* Image */}
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
//                             alt="Valorant Tournament"
//                             className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
//                         />
//                         {/* Play Button Overlay */}
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                             <button className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 transform scale-90 group-hover:scale-100">
//                                 <i className="fa-solid fa-play text-xl"></i>
//                             </button>
//                         </div>


//                         {/* Bottom Right Duration Label */}
//                         <div className="absolute bottom-2 right-3">
//                             <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
//                                 12:45
//                             </span>
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-5 space-y-3">
//                         <div>
//                             <h2 className="text-xl font-semibold text-white">
//                                 Summer Championship
//                             </h2>
//                             <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Aug 15, 2025</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div >
//     )
// }
import React, { useEffect, useState } from "react";

const ACCENT = "#E50914"; // red accent
const SECONDARY = "#3B82F6"; // blue secondary
const BG = "#0d0d0d"; // section background as requested
const FALLBACK =
  "https://via.placeholder.com/800x450.png?text=Video+Thumbnail+Unavailable";

const videos = [
  {
    id: 1,
    title: "Summer Championship — Finals",
    date: "Aug 15, 2025",
    duration: "12:45",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    tag: "VOD",
  },
  {
    id: 2,
    title: "Clutch Plays — Highlight Reel",
    date: "Jul 02, 2025",
    duration: "08:20",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    tag: "HIGHLIGHT",
  },
  {
    id: 3,
    title: "Pro Tips — 1v3 Retakes",
    date: "Jun 18, 2025",
    duration: "05:50",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    tag: "GUIDE",
  },
  // add more items as needed
];

export default function Videos() {
  const [active, setActive] = useState(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openVideo = (v) => setActive(v);
  const closeVideo = () => setActive(null);

  const onImgError = (e) => {
    e.currentTarget.src = FALLBACK;
  };

  return (
    <section
      className="py-6"
      style={{ background: BG }}
      aria-labelledby="videos-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 px-6 md:px-10">
        <div>
          <h2
            id="videos-heading"
            className="text-2xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Featured
            <span
              className="ml-2"
              style={{
                color: ACCENT,
                textShadow: "0 0 10px rgba(229,9,20,0.6)",
              }}
            >
              Videos
            </span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
            Join upcoming tournaments, study top plays, and watch match highlights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#all-videos"
            className="text-sm text-white/80 px-3 py-2 rounded-md border border-white/6 hover:bg-white/3 transition"
          >
            View all
          </a>
          <a
            href="#submit"
            className="text-sm text-white px-3 py-2 rounded-md"
            style={{
              background: `linear-gradient(90deg, ${ACCENT}, rgba(229,9,20,0.85))`,
              boxShadow: `0 8px 30px rgba(229,9,20,0.14)`,
            }}
          >
            Submit Clip
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-10 pb-10 justify-items-center">
        {videos.map((v) => (
          <article
            key={v.id}
            className="group w-full max-w-[404px] rounded-xl overflow-hidden transform transition-all duration-300"
            aria-labelledby={`video-${v.id}-title`}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/20">
              {/* thumbnail */}
              <img
                src={v.thumb}
                alt={`${v.title} thumbnail`}
                loading="lazy"
                onError={onImgError}
                className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* top-left tag */}
              <div
                className="absolute left-3 top-3 px-3 py-1 rounded-md text-xs font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}, rgba(229,9,20,0.95))`,
                  color: "white",
                  boxShadow: "0 6px 24px rgba(229,9,20,0.12)",
                }}
              >
                {v.tag}
              </div>

              {/* center play */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <button
                  type="button"
                  onClick={() => openVideo(v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openVideo(v);
                  }}
                  className="pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition transform scale-95 group-hover:scale-105 focus:outline-none"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 12px 40px rgba(229,9,20,0.2)`,
                  }}
                  aria-label={`Play ${v.title}`}
                >
                  <i className="fa-solid fa-play" />
                </button>
              </div>

              {/* bottom-right duration */}
              <div className="absolute bottom-3 right-3">
                <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                  {v.duration}
                </span>
              </div>

              {/* subtle gradient overlay for legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.45) 100%)",
                }}
              />
            </div>

            {/* content */}
            <div className="p-5 space-y-3 bg-transparent">
              <h3
                id={`video-${v.id}-title`}
                className="text-xl font-semibold text-white"
              >
                {v.title}
              </h3>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span
                  className="flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  <i className="fa-regular fa-calendar" style={{ color: SECONDARY }} />
                  <span className="text-white/80">{v.date}</span>
                </span>

                <span className="ml-auto text-xs text-white/50 hidden sm:inline">
                  {/* example metadata */}
                  24.8k views
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Video Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${active.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeVideo}
          />
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
            <header className="flex items-center justify-between px-4 py-2 border-b border-white/6">
              <h4 className="text-white font-semibold">{active.title}</h4>
              <button
                onClick={closeVideo}
                aria-label="Close player"
                className="text-white/90 p-2 rounded hover:bg-white/5 focus:outline-none"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </header>

            <div className="bg-black">
              <video
                src={active.src}
                controls
                autoPlay
                className="w-full h-[60vh] bg-black object-cover"
              >
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
