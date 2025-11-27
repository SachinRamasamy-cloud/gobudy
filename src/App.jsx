import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Head from "./comp/Head";
import Nav from "./comp/Nav";
import Footer from "./comp/Footer";
import Preload from "./comp/Preload";

// Pages / Dashboards
import Hero from "./Dashboard/Hero";
import Topgm from "./Dashboard/Topgm";
import Tounmat from "./Dashboard/Tounmat";
import Players from "./Dashboard/Players";
import Videos from "./Dashboard/Videos";
import Reels from "./Dashboard/Reels";
import Match from "./Dashboard/Match";
import ReelsPage from "./Dashboard/Reelscard";
import Wallet from "./page2/Wallet";
import Toundash from "./Tournament/Toundash";
import Video from "./videos/Video";
import LoginRegister from "./auth/Login";

// Admin Pages
import AdmDash from "./admin/AdmDash";
import Admvid from "./admin/Admvid";
import AdminPayments from "./admin/Addpayment";
import Tdet from "./Tournament/Tdet";
import Live from "./Tournament/Live";

// --- GoToTop Button ---
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

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-100 text-white">
    <header className="p-4 bg-black/50 border-b border-white/10 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#e50914]">Admin Dashboard</h1>
      <button onClick={() => window.history.back()} className="text-sm text-gray-400 hover:text-white">
        Exit
      </button>
    </header>
    <main className="p-4">
      <Outlet />
    </main>
    <footer className="p-4 text-center text-gray-500 text-sm border-t border-white/10 mt-8">
      Admin Panel &copy; {new Date().getFullYear()}
    </footer>
  </div>
);

// --- Main App ---
function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (load) return <Preload />;

  return (
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
        <Route path="/tournament/:id" element={<>
          <Tdet />
          <Live />
        </>} />
        <Route path="/all-video" element={<Video />} />
        <Route path="/login" element={<LoginRegister />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdmDash />} />
        <Route path="videos" element={<Admvid />} />
        <Route path="pay" element={<AdminPayments />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
