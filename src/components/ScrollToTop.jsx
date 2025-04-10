// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50); // Small delay helps smoothness on route change

    return () => clearTimeout(scrollTimeout);
  }, [pathname]);

  return null;
}
