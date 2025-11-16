// import React from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import './Main.css'

// export default function Match() {

//     return (
//                 <div className=" min-h-screen flex justify-center flex-col sm:flex-row bg-black px-6 py-10 gap-4">
//                     <div className="w-full rounded-2xl bg-gray-800 p-8 border border-gray-700">
//                         <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
//                             Join the <span className="text-red-600">Match</span>
//                         </h1>
//                         <form className="flex flex-col gap-5">
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="game" className="text-gray-400 text-sm">
//                                     Select Game
//                                 </label>
//                                 <select
//                                     id="game"
//                                     className="border border-gray-600 bg-[#1f2937] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 >
//                                     <option value="">Valorant</option>
//                                     <option value="bgmi">BGMI</option>
//                                     <option value="cod">Call of Duty</option>
//                                     <option value="fortnite">Fortnite</option>
//                                 </select>
//                             </div>

//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="username" className="text-gray-400 text-sm">
//                                     Your Username
//                                 </label>
//                                 <input
//                                     id="username"
//                                     type="text"
//                                     placeholder="Enter your in-game username"
//                                     className="border border-gray-600 bg-[#1f2937] text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 />
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <input type="checkbox" id="terms" className="accent-red-600 w-4 h-4" />
//                                 <label htmlFor="terms" className="text-gray-400 text-sm">
//                                     I agree to the{" "}
//                                     <span className="text-red-500 hover:underline cursor-pointer">
//                                         terms and conditions
//                                     </span>
//                                 </label>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="mt-2 w-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white text-lg font-semibold py-3 rounded-md"
//                             >
//                                 Find Match
//                             </button>
//                         </form>
//                     </div>

//                     <div className="w-full rounded-2xl px-8 py-3">
//                         <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
//                             Upcoming <span className="text-red-600">Matches</span>
//                         </h1>

//                         <div className="rounded-lg bg-gray-800 px-5 py-4 hover:border hover:border-red-600 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all duration-300">
//                             <div className="flex justify-between">
//                                 <h1 className="text-white text-lg font-bold">Valorant</h1>
//                                 <h1 className="text-red-500 font-semibold">In 5 minutes</h1>
//                             </div>
//                             <div className="flex justify-between items-center mt-2">
//                                 <div className="flex items-center gap-2">
//                                     <p className="px-2 py-1 rounded-md bg-gray-700 text-gray-300 text-xs sm:text-sm">
//                                         Competitive
//                                     </p>
//                                     <p className="text-gray-300 text-xs sm:text-sm">Ascent</p>
//                                 </div>
//                                 <p className="text-gray-400 text-xs sm:text-sm">8/10 players</p>
//                             </div>

//                             <button className="bg-gray-900 hover:border hover:border-red-600 hover:shadow-[0_0_12px_rgba(255,0,0,0.5)] transition-all duration-200 text-white font-semibold w-full text-center py-3 rounded-md mt-3 text-xs sm:text-sm">
//                                 Join Match
//                             </button>
//                         </div>


//                     </div>
//                 </div>
//     );
// }
import React from "react";
import { motion } from "framer-motion";
import "./Main.css";

export default function Match() {
  return (
    <div className="min-h-screen flex justify-center flex-col md:flex-row px-6 py-12 gap-6">

      {/* LEFT FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl bg-[#0F1115] p-8 border border-gray-700 hover:shadow-[0_0_35px_rgba(255,0,0,0.35)] transition-all duration-300"
      >
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-8 tracking-wide">
          Join the{" "}
          <span className="text-red-500 ">
            Match
          </span>
        </h1>

        <form className="flex flex-col gap-6">
          {/* GAME SELECT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="text-gray-400 text-sm">
              Select Game
            </label>

            <select
              id="game"
              className="border border-gray-600 bg-[#1A1D24] text-white p-3 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 
              hover:border-crayon-blue transition duration-200"
            >
              <option>Valorant</option>
              <option value="bgmi">BGMI</option>
              <option value="cod">Call of Duty</option>
              <option value="fortnite">Fortnite</option>
            </select>
          </div>

          {/* USERNAME */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-400 text-sm">
              Your Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your in-game username"
              className="border border-gray-600 bg-[#1A1D24] text-white p-3 rounded-lg placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 
              hover:border-crayon-blue transition duration-200"
            />
          </div>

          {/* TERMS */}
          <div className="flex items-center gap-2 select-none">
            <input
              type="checkbox"
              id="terms"
              className="accent-red-600 w-4 h-4"
            />
            <label
              htmlFor="terms"
              className="text-gray-400 text-sm cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-crayon-blue hover:underline">
                terms and conditions
              </span>
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-2 w-full bg-red-600 hover:bg-red-700 transition-all duration-200 
            text-white text-lg font-bold py-3 rounded-md shadow-[0_0_12px_rgba(255,0,0,0.6)] hover:shadow-[0_0_18px_rgba(255,0,0,0.8)]"
          >
            Find Match
          </button>
        </form>
      </motion.div>

      {/* RIGHT UPCOMING MATCHES */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full rounded-2xl "
      >
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-8 tracking-wide">
          Upcoming{" "}
          <span className="text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">
            Matches
          </span>
        </h1>

        {/* MATCH CARD */}
        <div className="rounded-lg bg-[#111317] px-5 py-5 
        border border-gray-700 hover:border-red-600 
        hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300">

          <div className="flex justify-between">
            <h1 className="text-white text-lg font-bold">Valorant</h1>
            <h1 className="text-gray-500 font-semibold">In 5 minutes</h1>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <p className="px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs sm:text-sm">
                Competitive
              </p>
              <p className="text-gray-300 text-xs sm:text-sm">Ascent</p>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">8/10 players</p>
          </div>

          <button className="bg-red-600 hover:border hover:border-red-600 hover:shadow-[0_0_12px_rgba(255,0,0,0.5)]
          transition-all duration-200 text-white font-semibold w-full text-center py-3 rounded-md mt-4 text-sm">
            Join Match
          </button>
        </div>
      </motion.div>
    </div>
  );
}
