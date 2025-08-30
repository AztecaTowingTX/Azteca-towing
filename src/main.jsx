// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";   // ✅ async helmet provider
import { LanguageProvider } from "./context/LanguageContext";

// ✅ Import all your pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import CommercialTowing from "./pages/CommercialTowing";

import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/commercial" element={<CommercialTowing />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>
);