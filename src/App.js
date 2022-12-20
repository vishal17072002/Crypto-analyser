import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Cryptocurrencies,
  Home,
  Navbar,
  News,
  CryptoDetails,
  CryptoPrediction,
  Backtotop,
} from "./components";
import { Layout } from "antd";
import "./App.css";
import MobileNavigation from "./components/MobileNavigation";

const App = () => {
  const isMobile = useMediaQuery("(max-width: 1060px)");
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                exact
                path="cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route path="crypto/:coinId" element={<CryptoDetails />} />
              <Route path="news" element={<News />} />

              <Route path="prediction" element={<CryptoPrediction />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">{isMobile && <MobileNavigation />}</div>
      </div>
      {!isMobile && <Backtotop />}
    </div>
  );
};

export default App;
