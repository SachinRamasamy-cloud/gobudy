import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";
import Matchdet from "./match/Matchdet";
import Match from "./Dashboard/Match";
import Head from "./comp/Head";
import Nav from "./comp/Nav";
import Footer from "./comp/Footer";
import Preload from "./comp/Preload";
import Tdet from "./Tournament/Tdet";
import Live from "./Tournament/Live";
import Toundash from "./Tournament/Toundash";
import Hero from "./Dashboard/Hero";
import Topgm from "./Dashboard/Topgm";
import Tounmat from "./Dashboard/Tounmat";
import Players from "./Dashboard/Players";
import Videos from "./Dashboard/Videos";
import Reels from "./Dashboard/Reels";
import ReelsPage from "./Dashboard/Reelscard";
import Admvid from "./admin/Admvid";
import AdminPayments from "./admin/Addpayment";
import Admmatch from "./admin/Admmatch";
import AdmDash from "./admin/AdmDash";
import Video from "./videos/Video";
import Wallet from "./page2/Wallet";
import LoginRegister from "./auth/Login";
import Landing from "./landing/Landing";
import { FaChartBar, FaVideo, FaUsers, FaTrophy, FaGamepad, FaCreditCard } from "react-icons/fa";
import Withdraw from "./page2/Withdraw";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admredeem from "./admin/Admredeem";
import Admtournment from "./admin/Admtournment";
import Admtorndet from "./admin/Admtorndet";


// Scroll to top button
const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#e50914] to-red-700 text-white font-bold text-lg md:text-xl flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] transition-all duration-300"
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(229,9,20,0.6)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Layouts ---
const UserLayout = () => (
  <>
    <Head />
    <Nav />
    <GoToTopButton />
    <div className="min-h-screen">
      <Outlet />
    </div>
    <Footer />
  </>
);

const AdminLayout = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname.includes(path);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Side Navigation Bar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex-shrink-0"></div>
          <h1 className="text-lg font-bold tracking-tight">
            Admin<span className="text-red-600">Pro</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {/* Dashboard */}
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
              ${isActive("/admin")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaChartBar className={`w-5 h-5 ${isActive("/admin")}`} />
            <span>Dashboard</span>
          </Link>

          {/* Videos */}
          <Link
            to="/admin/videos"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive("/admin/videos")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaVideo className={`w-5 h-5 ${isActive("/admin/videos") ? "text-red-700" : ""}`} />
            <span>Videos</span>
          </Link>

          {/* Payments */}
          <Link
            to="/admin/pay"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive("/admin/pay")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaCreditCard className={`w-5 h-5 ${isActive("/admin/pay") ? "text-red-700" : ""}`} />
            <span>Payments</span>
          </Link>

          {/* Matches */}
          <Link
            to="/admin/match"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive("/admin/match")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaGamepad className={`w-5 h-5 ${isActive("/admin/match") ? "text-red-700" : ""}`} />
            <span>Matches</span>
          </Link>
          {/* redeem */}
          <Link
            to="/admin/redeem"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive("/admin/redeem")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaCreditCard className={`w-5 h-5 ${isActive("/admin/pay") ? "text-red-700" : ""}`} />
            <span>Redeem Codes</span>
          </Link>
          {/* tournament */}

          <Link
            to="/admin/tournment"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive("/admin/tournment")
                ? "bg-red-50 text-red-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <FaTrophy className={`w-5 h-5 ${isActive("/admin/tournment") ? "text-red-700" : ""}`} />
            <span>Tounament</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all"
          >
            Exit Panel
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="text-sm text-slate-500 truncate">
            Welcome back, <span className="font-semibold text-slate-900">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl w-full mx-auto">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Page Overview</h2>
            <p className="text-slate-500 text-sm">
              Manage your video content and tags below.
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 min-h-[50vh]">
            <Outlet />
          </div>

          <footer className="mt-8 sm:mt-12 pb-6 text-center text-slate-400 text-xs uppercase tracking-widest">
            Admin Panel &copy; {new Date().getFullYear()} • Control Center
          </footer>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (load) return <Preload />;

  return (
    <>
      <Routes>
        {/* User Routes */}

        <Route element={<UserLayout />}>
          <Route path="/" element={
            <>
              <Hero />
              <Topgm />
              <Tounmat />
              <Players />
              <Videos />
              {/* <Reels /> */}
              <Match />
            </>
          } />
          <Route path="/reel/:id" element={<ReelsPage />} />
          <Route path="/add-balance" element={<Wallet />} />
          <Route path="/tournaments" element={<Toundash />} />
          <Route path="/match/:matchId" element={<Matchdet />} />
          <Route path="/tournament/:id" element={
            <>
              <Tdet />
              <Live />
            </>
          } />
          <Route path="/all-video" element={<Video />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/login" element={<LoginRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdmDash />} />
          <Route path="videos" element={<Admvid />} />
          <Route path="pay" element={<AdminPayments />} />
          <Route path="match" element={<Admmatch />} />
          <Route path="tournament-detail" element={<Admtorndet />} />
          <Route path="redeem" element={<Admredeem />} />
          <Route path="tournment" element={<Admtournment />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
