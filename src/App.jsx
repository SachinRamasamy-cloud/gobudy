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
import Tornaments from "./page2/Tornaments";
import Tounmat from "./Dashboard/Tounmat";
import Hero from "./Dashboard/Hero";
import Topgm from "./Dashboard/Topgm";



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
          <Route path="/tournaments" element={<Tornaments />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
