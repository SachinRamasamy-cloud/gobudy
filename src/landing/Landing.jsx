import React from "react";
import { 
    FaTrophy, FaWallet, FaBolt, FaUsers, 
    FaMousePointer, FaPlay, FaGamepad, 
    FaChevronRight, FaGlobe, FaShieldAlt, FaStar,
    FaApple, FaGooglePlay, FaUserCheck, FaLock 
} from "react-icons/fa";

const LandingPage = () => {
    return (
        <div className="bg-[#050505] text-white font-sans overflow-x-hidden">
            
            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <div className="text-2xl font-bold cursor-pointer tracking-tight">
                        GO<span className="text-[#e50914]">BUDY</span>
                    </div>
                    <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-400 uppercase tracking-wider">
                        <a href="#work" className="hover:text-[#e50914] transition">Protocol</a>
                        <a href="#why" className="hover:text-[#e50914] transition">Trust</a>
                        <a href="#stats" className="hover:text-[#e50914] transition">Network</a>
                    </div>
                </div>
                <button className="bg-[#e50914] px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#ff1e2b] transition">Login</button>
            </nav>

            {/* HERO */}
            <header className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#e50914]/10 z-0"></div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        DOMINATE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#ff6b6b]">THE ARENA</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium mb-12">Play. Compete. Earn.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-[#e50914] px-12 py-4 font-bold text-lg uppercase hover:bg-white hover:text-black transition-all shadow-lg">
                            Play Now
                        </button>
                        <button className="bg-white/10 border border-white/20 px-12 py-4 font-bold text-lg uppercase hover:bg-[#00e5ff]/20 hover:border-[#00e5ff] transition-all">
                            Get the App
                        </button>
                    </div>
                </div>
            </header>

            {/* LIVE STATS */}
            <section id="stats" className="bg-[#e50914]/10 py-10">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-black text-center font-bold">
                    <div>
                        <div className="text-3xl md:text-4xl">1.2M+</div>
                        <div className="text-xs md:text-sm uppercase tracking-wide">Users Joined</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl">450K</div>
                        <div className="text-xs md:text-sm uppercase tracking-wide">Matches Played</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl">$12.4M</div>
                        <div className="text-xs md:text-sm uppercase tracking-wide">Prizes Paid</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl">14K+</div>
                        <div className="text-xs md:text-sm uppercase tracking-wide flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span> Online Now
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section id="why" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-16 text-center md:text-left">WHY CHOOSE <span className="text-[#e50914]">GOBUDY</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[ 
                            { icon: <FaBolt />, title: "Instant Withdrawals", desc: "UPI, Bank, and Paytm payouts processed in 1-5 mins." },
                            { icon: <FaShieldAlt />, title: "Anti-Cheat Guard", desc: "Kernel-level protection ensuring 100% fair gameplay." },
                            { icon: <FaTrophy />, title: "24/7 Tournaments", desc: "Open arenas every hour. Never miss your shot." },
                            { icon: <FaWallet />, title: "Earn Real Money", desc: "Turn your skills into currency. Secure global wallet." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/5 border-l-4 border-[#e50914] hover:bg-white/10 transition rounded-lg">
                                <div className="text-3xl text-[#e50914] mb-4">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="work" className="py-24 bg-black/50 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-16">THREE STEPS TO <span className="text-[#00e5ff]">GLORY</span></h2>
                    <div className="flex flex-col md:flex-row justify-center gap-12">
                        {[
                            { title: "Create ID", desc: "Verify your operator credentials" },
                            { title: "Join Arena", desc: "Match into custom lobbies" },
                            { title: "Withdraw Winnings", desc: "Instant sync to your vault" }
                        ].map((step, i) => (
                            <div key={i} className="flex-1">
                                <div className="w-20 h-20 bg-[#0d0d0d] border-2 border-[#e50914] mx-auto flex items-center justify-center mb-6">
                                    <span className="text-2xl font-bold">{i + 1}</span>
                                </div>
                                <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                                <p className="text-gray-400 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* APP PREVIEW */}
            <section className="py-24 px-6 bg-black/40">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="w-full aspect-[9/16] max-w-[280px] mx-auto bg-gray-800 rounded-3xl border-8 border-black shadow-xl overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="App" />
                        </div>
                    </div>
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold mb-4">BUILT FOR <span className="text-[#00e5ff]">MOBILE</span></h2>
                        <p className="text-gray-400 mb-6 text-lg">Download the GOBUDY App to play custom 1v1 rooms, track live stats, and withdraw winnings instantly.</p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition"><FaApple size={20} /> App Store</button>
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition"><FaGooglePlay size={18} /> Google Play</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* PLAYER REVIEWS */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">OPERATOR <span className="text-[#e50914]">FEEDBACK</span></h2>
                    <p className="text-gray-400 mt-2 text-sm">Real Winnings from the GOBUDY Collective</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[ 
                        { name: "ProOperator_88", win: "₹12,400", text: "Joined a pub match and walked away with 10k in under an hour. Payout was instant via Paytm." },
                        { name: "ShadowSnipe", win: "₹24,000", text: "The anti-cheat on this platform is legit. You finally feel like you're playing against real humans." },
                        { name: "ArenaKing", win: "₹8,500", text: "Used GOBUDY to sharpen my team skills. The leaderboard system keeps me coming back every day." }
                    ].map((card, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-lg border-t-2 border-[#00e5ff]">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold">?</div>
                                <div>
                                    <div className="font-bold">{card.name}</div>
                                    <div className="text-[10px] text-[#e50914] font-bold tracking-wide">Total Won: {card.win}</div>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">"{card.text}"</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECURITY BADGES */}
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap justify-around gap-8 opacity-50">
                <div className="flex items-center gap-3 text-xs font-bold tracking-wide"><FaShieldAlt className="text-[#e50914]" /> Anti-Cheat Secure</div>
                <div className="flex items-center gap-3 text-xs font-bold tracking-wide"><FaUserCheck className="text-[#00e5ff]" /> 100% Fair Play</div>
                <div className="flex items-center gap-3 text-xs font-bold tracking-wide"><FaLock /> 256-Bit SSL Encrypted</div>
            </div>

            {/* FOOTER */}
            <footer className="pt-16 pb-12 px-6 border-t border-white/10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="text-2xl font-bold uppercase mb-4">GO<span className="text-[#e50914]">BUDY</span></div>
                        <p className="text-gray-400 text-xs leading-relaxed">Elite decentralized platform for digital combat sport. Unauthorized transmission prohibited.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-4">Directives</h4>
                        <ul className="space-y-2 text-[10px] text-gray-400">
                            <li><a href="#" className="hover:text-red-600 transition">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-red-600 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-red-600 transition">Refund Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-4">Transmission</h4>
                        <ul className="space-y-2 text-[10px] text-gray-400">
                            <li><a href="#" className="hover:text-[#00e5ff] transition">support@gobudy.com</a></li>
                            <li><a href="#" className="hover:text-[#00e5ff] transition">Discord</a></li>
                            <li><a href="#" className="hover:text-[#00e5ff] transition">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-4">Payment Options</h4>
                        <div className="flex items-center gap-4 opacity-50">
                            <img src="https://logodownload.org/wp-content/uploads/2019/06/paytm-logo.png" className="h-4" alt="Paytm" />
                            <img src="https://logodownload.org/wp-content/uploads/2021/03/upi-logo.png" className="h-4" alt="UPI" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
