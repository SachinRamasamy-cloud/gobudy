import React, { useEffect, useState } from "react";
import Head from "./comp/Head";
import Footer from "./comp/Footer";
import Nav from "./comp/Nav";
import Preload from "./comp/Preload";
import Players from "./Dashboard/Players";
import Videos from "./Dashboard/Videos";
import Reels from "./Dashboard/Reels";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ReelsPage from "./Dashboard/Reelscard";
import Match from "./Dashboard/Match";
import SmoothScroll from "./Scrollsmooth";
import { AnimatePresence, motion } from "framer-motion";
import Wallet from "./page2/Wallet";
import Tornaments from "./Tournament/Tornaments";
import Tounmat from "./Dashboard/Tounmat";
import Hero from "./Dashboard/Hero";
import Topgm from "./Dashboard/Topgm";
import Toundash from "./Tournament/Toundash";
import Video from "./videos/Video";

// Go to Top button component
const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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



function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (load) {
    return <Preload />;
  }

  return (
    <>
      <Head setIsOpen={setNavOpen} />
      <Nav isOpen={navOpen} setIsOpen={setNavOpen} />
      <GoToTopButton />
      <div
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Topgm />
                <Tounmat />
                <Players />
                <Videos />
                <Reels />
                <Match />
                
              </>
            }
          />
          <Route path="/reel/:id" element={<ReelsPage />} />
          <Route path="/add-balance" element={<Wallet />} />
          <Route path="/tournaments" element={<Toundash />} />
          <Route path="/all-video" element={<Video />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
