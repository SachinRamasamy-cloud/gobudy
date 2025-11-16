import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Tournaments() {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    return prev;
                }

                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                >
                    <source
                        src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.webm`}
                        type="video/mp4"
                    />
                </video>

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                
                {/* Animated glow effect */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        boxShadow: [
                            "0 0 60px rgba(229,9,20,0.1)",
                            "0 0 80px rgba(229,9,20,0.15)",
                            "0 0 60px rgba(229,9,20,0.1)",
                        ],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-12">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-4 py-2 bg-gradient-to-r from-[#e50914] to-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                            ⚡ Featured Tournament 2025
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white leading-tight mb-6"
                        style={{
                            textShadow: "0 0 30px rgba(229,9,20,0.6), 0 0 60px rgba(229,9,20,0.3)",
                        }}
                    >
                        GoBudy
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 mt-2"
                        >
                            Valorant Cup
                        </motion.span>
                        <span className="block text-gray-300 text-4xl sm:text-5xl md:text-6xl mt-3">2025</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-300 mt-8 max-w-2xl text-lg md:text-xl leading-relaxed tracking-wide font-light"
                    >
                        Climb the ranks. <span className="text-[#00e5ff] font-semibold">Conquer the arena.</span> Claim your <span className="text-red-500 font-semibold">glory</span>.
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex gap-3 sm:gap-4 justify-center w-full mt-12 flex-wrap"
                    >
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Minutes", value: timeLeft.minutes },
                            { label: "Seconds", value: timeLeft.seconds },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.08, y: -5 }}
                                className="text-center bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md border border-red-600/50 hover:border-red-500 rounded-xl px-4 sm:px-5 md:px-6 py-4 sm:py-5 shadow-[0_0_25px_rgba(229,9,20,0.3)] hover:shadow-[0_0_35px_rgba(229,9,20,0.5)] transition-all w-20 sm:w-24 md:w-28 lg:w-32"
                            >
                                <motion.h1
                                    key={`${item.label}-${item.value}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-black drop-shadow-[0_0_10px_rgba(229,9,20,0.6)]"
                                >
                                    {String(item.value).padStart(2, "0")}
                                </motion.h1>
                                <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest mt-2 font-semibold">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(229,9,20,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 sm:px-16 py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white shadow-[0_0_25px_rgba(229,9,20,0.4)] hover:from-red-500 hover:to-red-600 transition-all duration-300 tracking-wide uppercase text-sm sm:text-base flex items-center justify-center gap-3"
                        >
                            Register Now
                            <i className="fa-solid fa-arrow-right text-sm"></i>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,229,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 sm:px-16 py-4 rounded-xl font-bold bg-transparent border-2 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:bg-[#00e5ff]/10 transition-all duration-300 tracking-wide uppercase text-sm sm:text-base flex items-center justify-center gap-3"
                        >
                            Learn More
                            <i className="fa-solid fa-info text-sm"></i>
                        </motion.button>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Scroll to explore</p>
                        <i className="fa-solid fa-chevron-down text-red-500 text-lg block"></i>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
