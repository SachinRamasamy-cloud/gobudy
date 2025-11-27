import React, { useEffect, useState } from "react";

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
        <section className="relative bg-black text-white min-h-screen flex items-center px-6 lg:px-20 py-16 overflow-hidden">

            {/* RED NEON BACKLIGHT */}
            <div className="absolute inset-0 bg-red-600 opacity-[0.15] blur-[180px] animate-pulseSlow pointer-events-none" />

            {/* GRID WRAPPER */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                {/* LEFT SECTION */}
                <div className="fade-in-up space-y-8">

                    {/* Badge */}
                    <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                        ⚡ Featured Tournament 2025
                    </span>

                    {/* Title */}
                    <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
                        GoBudy
                        <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mt-3">
                            Valorant Cup
                        </span>
                        <span className="block text-gray-300 text-3xl sm:text-4xl mt-2">
                            2025
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="max-w-xl text-gray-300 text-lg leading-relaxed fade-in-up delay-200">
                        Climb the ranks. <span className="text-cyan-400 font-semibold">Conquer the arena.</span>  
                        Claim your <span className="text-red-500 font-semibold">glory</span>.
                    </p>

                    {/* Countdown */}
                    <div className="flex gap-4 mt-8 fade-in-up delay-300 flex-wrap">
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Minutes", value: timeLeft.minutes },
                            { label: "Seconds", value: timeLeft.seconds },
                        ].map((i, idx) => (
                            <div
                                key={idx}
                                className="text-center bg-gradient-to-br from-gray-900 to-gray-800 border border-red-600/40 backdrop-blur-xl rounded-xl px-6 py-5 w-24 hover:scale-105 transition-transform shadow-[0_0_25px_rgba(229,9,20,0.3)]"
                            >
                                <h2 className="text-3xl font-black text-red-500 ">
                                    {String(i.value).padStart(2, "0")}
                                </h2>
                                <p className="text-sm uppercase tracking-widest text-gray-300 mt-1 font-semibold">
                                    {i.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 fade-in-up delay-500 mt-12">

                        <button className="px-14 py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white  transition-all tracking-widest uppercase">
                            Register Now
                        </button>

                        <button className="px-14 py-4 rounded-xl font-bold border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all uppercase tracking-widest">
                            Watch Live
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION — VIDEO */}
                <div className="relative fade-in-up delay-300 flex justify-center">

                    <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden  border border-red-700/40 animate-glowRed">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source
                                src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.webm`}
                                type="video/mp4"
                            />
                        </video>
                    </div>

                </div>
            </div>
        </section>
    );
}
