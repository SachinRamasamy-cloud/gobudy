import React, { useEffect, useState } from "react";
import Head from "./comp/Head";
import Footer from "./comp/Footer";
import Nav from "./comp/Nav";
import Dash from "./page/Dash";
import Preload from "./comp/Preload";
import Players from "./page/Players";
import Videos from "./page/Videos";
import Reels from "./page/Reels";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ReelsPage from "./page/Reelscard";
import Match from "./page/Match";

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
      <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Dash />
                  <Players />
                  <Videos />
                  <Reels />
                  <Match />
                </>
              }
            />
            <Route path="/reel/:id" element={<ReelsPage />} />
          </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
