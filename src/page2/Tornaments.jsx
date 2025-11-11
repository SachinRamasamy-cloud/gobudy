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
            <section className="relative h-[600px] w-full overflow-hidden bg-black">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source
                        src={`${import.meta.env.BASE_URL}videos/37585-414024825_medium.mp4`}
                        type="video/mp4"
                    />
                </video>
                {/* 
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/95" /> */}

                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide uppercase text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.4)] animate-fadeIn">
                        GoBudy <span className="text-red-500">Valorant Cup</span> 2025
                    </h1>

                    <p className="text-gray-300 mt-6 max-w-2xl text-base md:text-lg leading-relaxed tracking-wide">
                        Climb the ranks. <span className="text-red-500">Conquer the arena.</span> Claim your glory.
                    </p>

                    <div className="flex gap-4 justify-center w-full mt-8">
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Minutes", value: timeLeft.minutes },
                            { label: "Seconds", value: timeLeft.seconds },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="
  text-center bg-gray-900/80 border border-red-600 rounded-lg 
  px-4 py-3 shadow-[0_0_20px_rgba(255,0,0,0.25)] backdrop-blur-sm 
  transition-transform duration-300 hover:scale-105 
  w-20 sm:w-24 md:w-28 
"
                            >
                                <h1 className="text-red-500 text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_0_10px_rgba(255,0,0,0.4)]">                                    {item.value}
                                </h1>
                                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mt-1">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            className="px-12 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_0_25px_rgba(255,0,0,0.4)]
                         hover:from-red-500 hover:to-red-600 hover:scale-105 transition-all duration-300 tracking-wide uppercase"
                        >
                            Register Now
                            <i className="fa-solid fa-arrow-right ml-3 text-sm"></i>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
