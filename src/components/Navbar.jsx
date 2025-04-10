import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: "/", labelEn: "Home", labelEs: "Inicio" },
    { to: "/services", labelEn: "Services", labelEs: "Servicios" },
    { to: "/commercial", labelEn: "Commercial", labelEs: "Empresarial" }, // ✅ New
    { to: "/reviews", labelEn: "Reviews", labelEs: "Opiniones" },
    { to: "/contact", labelEn: "Contact", labelEs: "Contacto" },
    { to: "/about", labelEn: "About Us", labelEs: "Sobre Nosotros" },
    { to: "/gallery", labelEn: "Gallery", labelEs: "Galería" },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Language Toggle */}
        <div className="flex items-center gap-3">
          <img
            src="/images/aztec-logo.png"
            alt="Azteca Towing Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg tracking-wide">Azteca Towing</span>
          <button
            onClick={toggleLanguage}
            className="ml-2 text-xs sm:text-sm bg-yellow-500 text-black px-3 py-1 rounded shadow hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Español" : "English"}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-base items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`transition ${
                location.pathname === item.to
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-400"
              }`}
            >
              {language === "en" ? item.labelEn : item.labelEs}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 mt-4 px-2 pb-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`transition ${
                    location.pathname === item.to
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-yellow-400"
                  }`}
                >
                  {language === "en" ? item.labelEn : item.labelEs}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="text-sm bg-yellow-500 text-black px-3 py-1 rounded shadow hover:bg-yellow-400 transition w-max"
              >
                {language === "en" ? "Español" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
