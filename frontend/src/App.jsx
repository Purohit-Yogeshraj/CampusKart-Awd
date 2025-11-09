// src/App.jsx
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("campuskart_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Handle hash changes (e.g., #/buy)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setPage(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange(); // initial

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("campuskart_user");
    setUser(null);
    window.location.hash = "";
  };

  const handleLogin = (userData) => {
    localStorage.setItem("campuskart_user", JSON.stringify(userData));
    setUser(userData);
    window.location.hash = "";
  };

  let Component;
  switch (page) {
    case "buy":
      Component = <Buy />;
      break;
    case "sell":
      if (!user) return <Auth onLogin={handleLogin} />;
      Component = <Sell user={user} />;
      break;
    case "auth":
      Component = <Auth onLogin={handleLogin} />;
      break;
    case "about":
      Component = <About />;
      break;
    default:
      Component = <Home />;
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main>{Component}</main>
      <Footer />
    </>
  );
}
