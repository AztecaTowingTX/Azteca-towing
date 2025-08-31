// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { PhoneCall, X } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// === CONFIG ===
const POPUP_KEY = "atx_seen_popup_v3";
const ZAP_URL = "https://hooks.zapier.com/hooks/catch/22385391/201bgve/";
const HERO_IMG = "/images/hero-bg.jpeg";
const OFFICE_ZIP = "78753";

// === ZIP logic: ~100 miles from Austin, EXCLUDES San Antonio proper (782xx)
const ALLOWED_ZIP3 = new Set(["733", "786", "787", "765"]);
const ALLOWED_EXACT = new Set(["78130", "78132", "78133"]);
function isAllowedZip(zip) {
  if (!/^\d{5}$/.test(zip)) return false;
  const zip3 = zip.slice(0, 3);
  if (zip3 === "782") return false;
  if (ALLOWED_ZIP3.has(zip3)) return true;
  if (ALLOWED_EXACT.has(zip)) return true;
  return false;
}

// ---------- Sticky helper ----------
function useSticky() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

export default function Home() {
  const { language } = useLanguage();
  const scrolled = useSticky(); // <-- use here to fade Nav 1 out

  // ================= Popup =================
  const [showPopup, setShowPopup] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [popupError, setPopupError] = useState("");

  // Always show popup shortly after page loads
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 600);
    return () => clearTimeout(t);
  }, []);

  const postToZapier = async (fields) => {
    const params = new URLSearchParams();
    Object.entries(fields).forEach(([k, v]) => params.append(k, v ?? ""));
    const res = await fetch(ZAP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    });
    return res.ok;
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    setSendStatus(null);
    setPopupError("");
    const form = e.currentTarget;
    const zip = (form.zip?.value || "").trim();

    if (!/^\d{5}$/.test(zip)) {
      setPopupError("Enter a 5-digit ZIP (e.g., 78704).");
      return;
    }
    if (!isAllowedZip(zip)) {
      setPopupError("Sorry — we serve the Central Texas corridor (Austin + nearby) only.");
      return;
    }

    const fields = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location?.value?.trim() || "",
      zip,
      is_local: "true",
      formType: "popup",
      sourcePage: "Home",
    };

    try {
      const ok = await postToZapier(fields);
      if (!ok) throw new Error("Bad response");
      setSendStatus("ok");
      localStorage.setItem(POPUP_KEY, String(Date.now()));
      form.reset();
      setTimeout(() => setShowPopup(false), 900);
    } catch {
      setSendStatus("err");
    }
  };

  // ================= Reviews (real quotes you shared) =================
  const allReviews = useMemo(
    () => [
      { name: "Eduardo Cortez (Google)", stars: 5, text: "They were super willing to help me. The man was incredibly kind and very patient. Easiest 5 stars I’ve given." },
      { name: "Sawyer Mielke (Google)", stars: 5, text: "Does hard work! Got my car taken care of late at night. Super reliable." },
      { name: "P Brumlow (Google)", stars: 5, text: "Prompt and very helpful. Quick response when I needed it most." },
      { name: "Arsenio Najera (Google)", stars: 5, text: "Great service and friendly. Would definitely call again." },
      { name: "Mason McCurdy (Google)", stars: 5, text: "El mejor! He came quickly and got me out of a bind. Hire them!" },
      { name: "Alex Garcia (Google)", stars: 5, text: "5 stars because he came in clutch at 12–1am when my truck broke down. Quick pick up, lifesaver." },
      { name: "Jazzias Flores (Google)", stars: 5, text: "Couldn’t be more satisfied with Santiago & Azteca Towing. Arrived within the hour and kept me updated." },
      { name: "Deiby Chacon (Google)", stars: 5, text: "Muy buena atención. Very helpful service." },
      { name: "Diego Molina (Google)", stars: 5, text: "Very helpful, showed up quickly, thank you so much." },
      { name: "Piotr (Google)", stars: 5, text: "Impressed with how Santiago towed my motorcycle. Great response and communication." },
      { name: "Kristen Verrill (Google)", stars: 5, text: "Santiago got here so fast and did the work quickly. Super nice!" },
      { name: "Frank Lucra (Google)", stars: 5, text: "Quick and efficient — very helpful!" },
      { name: "Alex Bustillos (Google)", stars: 5, text: "ONE OF THE BEST IN TOWN. Santiago is hardworking and ready for any call!" },
      { name: "Ezra Gamez (Google)", stars: 5, text: "Fantastic service. Had a driver within 30 minutes. Great pricing — zero complaints." },
      { name: "Ricky Gonzalez Maldonado (Google)", stars: 5, text: "Excellent job — EXCELENTE TRABAJO!" },
      { name: "Ken Lugo (Google)", stars: 5, text: "Great service. Very professional. Definitely my first choice when I need a tow." },
      { name: "Juan Valdez (Google)", stars: 5, text: "Excelente servicio." },
      { name: "Josue Mejia (Google)", stars: 5, text: "Good service. Came through when I needed it." },
      { name: "Marquis Henderson (Google)", stars: 5, text: "Thank you for great customer service and updates." },
      { name: "Gabby (Google)", stars: 5, text: "Moved my RV and the service was exceptional! Thank you." },
    ],
    []
  );
  const avgRating = (allReviews.reduce((s, r) => s + r.stars, 0) / allReviews.length).toFixed(1);

  // 5-dot paginator: split reviews into 5 pages
  function chunkIntoN(arr, n) {
    const out = Array.from({ length: n }, () => []);
    arr.forEach((item, idx) => out[idx % n].push(item));
    return out;
  }
  const reviewPages = chunkIntoN(allReviews, 5);

  const sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 550,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const callNowText = language === "en" ? "Call Now" : "Llamar Ahora";
  const phoneDisplay = "(512) 945-2314";

  // ================= JSON-LD =================
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "TowingService",
    "name": "Azteca Towing",
    "url": "https://www.aztecatowingtx.com/",
    "image": "https://www.aztecatowingtx.com/images/hero-bg.jpeg",
    "telephone": "+1-512-945-2314",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Austin Metro (Dispatch)",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": OFFICE_ZIP,
      "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 30.2672, "longitude": -97.7431 },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 30.2672, "longitude": -97.7431 },
      "geoRadius": 160934
    },
    "areaServed": [
      "Austin TX","Round Rock TX","Pflugerville TX","Cedar Park TX","Georgetown TX",
      "San Marcos TX","New Braunfels TX","Bastrop TX","Killeen TX","Temple TX","Kyle TX","Buda TX","Leander TX","Marble Falls TX","Elgin TX"
    ],
    "openingHours": "Mo-Su 00:00-23:59",
    "hasMap": "https://www.google.com/maps?q=Austin,+TX",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "bestRating": "5"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you serve areas outside Austin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — we cover the Central Texas corridor within roughly 100 miles of Austin, including Round Rock, Georgetown, San Marcos, New Braunfels, Bastrop, Killeen and Temple."
        }
      },
      {
        "@type": "Question",
        "name": "Are you available 24/7?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our dispatch is available 24 hours a day, 7 days a week." }
      },
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": { "@type": "Answer", "text": "Light-duty towing, jump starts, tire changes, lockouts, winch-outs, and accident recovery." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Azteca Towing | 24/7 Towing & Roadside in Austin, TX</title>
        <meta name="description" content="Fast, affordable towing & roadside assistance across the Austin area. 24/7 dispatch, bilingual team, family-owned. Call now for immediate help." />
        <link rel="canonical" href="https://www.aztecatowingtx.com/" />
        <link rel="preload" as="image" href={HERO_IMG} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Azteca Towing | 24/7 Towing & Roadside in Austin, TX" />
        <meta property="og:description" content="Fast, affordable towing & roadside assistance across the Austin area. 24/7 dispatch, bilingual team, family-owned." />
        <meta property="og:image" content="https://www.aztecatowingtx.com/images/hero-bg.jpeg" />
        <meta property="og:url" content="https://www.aztecatowingtx.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Nav 1 + yellow underline (fade out on scroll) */}
      <div
        className={`transition-all duration-200 ${scrolled ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
        aria-hidden={scrolled ? "true" : "false"}
      >
        <Navbar />
        <div className="w-full h-[3px] bg-yellow-400" />
      </div>

      {/* Nav 2 (sticky on scroll; fades in) */}
      <StickyNav2 />

      {/* Hero */}
      <header
        className="relative bg-no-repeat bg-cover min-h-[80vh] md:min-h-[90vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.28), rgba(0,0,0,.28)), url(${HERO_IMG})`,
          backgroundPosition: "50% 62%",
          backgroundSize: "cover",
        }}
        aria-label="Hero with towing trucks background"
      >
        <div className="mx-auto max-w-6xl px-4 min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow"
            style={{ textShadow: "0 1px 1px rgba(0,0,0,.75), 0 10px 24px rgba(0,0,0,.45)" }}
          >
            {language === "en"
              ? "Austin's Trusted Tow Truck Service — Fast & Reliable"
              : "Servicio de Grúas de Confianza en Austin — Rápido y Confiable"}
          </motion.h1>

          <p className="mt-4 text-base md:text-xl opacity-95" style={{ textShadow: "0 1px 1px rgba(0,0,0,.55)" }}>
            {language === "en"
              ? "Azteca Towing offers 24/7 emergency roadside help across Austin. Flat tire? Locked out? We’re here — fast."
              : "Azteca Towing ofrece asistencia vial de emergencia 24/7 en Austin. ¿Llanta ponchada? ¿Auto cerrado? Llegamos — rápido."}
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="tel:+15129452314"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-5 py-3 md:px-7 md:py-3 rounded-full shadow hover:bg-yellow-300"
              aria-label="Call Azteca Towing"
            >
              <PhoneCall size={18} /> {language === "en" ? "Call Now" : "Llamar Ahora"}: {phoneDisplay}
            </a>
            <a
              href="#request"
              className="inline-flex items-center bg-white text-zinc-900 font-semibold px-5 py-3 md:px-7 md:py-3 rounded-full shadow hover:bg-white/90"
            >
              {language === "en" ? "Request a Tow" : "Solicitar una Grúa"}
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/70" />
      </header>

      {/* Why Choose Azteca Towing */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold">
          {language === "en" ? "Why Choose Azteca Towing?" : "¿Por qué elegir Azteca Towing?"}
        </h2>
        <div className="mx-auto h-1 w-24 bg-yellow-400 rounded mt-3" />
        <p className="text-center text-gray-600 mt-2">
          {language === "en"
            ? "Local, family-owned, and focused on getting you back on the road fast."
            : "Empresa local y familiar enfocada en regresarte al camino rápido."}
        </p>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4 mt-6">
          {[
            [language === "en" ? "24/7 Dispatch" : "Despacho 24/7", language === "en" ? "Day or night, we answer and roll out." : "De día o de noche, siempre contestamos."],
            [language === "en" ? "Central Texas Coverage" : "Cobertura Centro de Texas", language === "en" ? "Austin + nearby cities within ~100 miles." : "Austin y ciudades cercanas (~100 millas)."],
            [language === "en" ? "Fast ETAs" : "Tiempos Rápidos", language === "en" ? "Honest times, real updates." : "Tiempos honestos y actualizaciones reales."],
            [language === "en" ? "Bilingual Team" : "Equipo Bilingüe", language === "en" ? "English & Spanish support." : "Atención en inglés y español."],
            [language === "en" ? "Trusted & Careful" : "Confiables y Cuidadosos", language === "en" ? "Great reviews from real Austin drivers." : "Excelentes reseñas de conductores de Austin."],
            [language === "en" ? "Fair Pricing" : "Precios Justos", language === "en" ? "Clear rates with no games." : "Precios claros, sin trucos."],
          ].map(([title, sub], i) => (
            <div key={i} className="rounded-xl border border-yellow-300/80 bg-white p-4 shadow-sm">
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm text-gray-600 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews (5 dots) */}
      <section className="bg-gray-50 py-12" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-5xl px-4">
          <h3 id="reviews-heading" className="text-2xl font-bold text-center mb-2">
            {language === "en" ? "What Our Customers Say" : "Lo Que Dicen Nuestros Clientes"}
          </h3>
          <p className="text-center text-yellow-500 font-semibold mb-6">
            ★★★★★ {avgRating} / 5 — {language === "en" ? "Based on real Google reviews" : "Basado en reseñas reales de Google"}
          </p>

          <Slider {...sliderSettings}>
            {reviewPages.map((page, pageIdx) => (
              <div key={pageIdx} className="px-2">
                <div className="space-y-3">
                  {page.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-5">
                      <div className="flex items-center gap-2 text-yellow-500 text-lg">
                        {"★".repeat(r.stars)} <span className="text-gray-600 text-sm">— {r.name}</span>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">“{r.text}”</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>

          <p className="mt-6 text-center text-gray-600 text-sm">
            {language === "en" ? "Reviews via Google" : "Reseñas vía Google"} •{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://www.google.com/search?q=aztecatowing#mpd=~13767923459083569205/customers/reviews"
              target="_blank"
              rel="noopener nofollow"
            >
              {language === "en" ? "See more on Google" : "Ver más en Google"}
            </a>
          </p>
        </div>
      </section>

      {/* Service Area + Map */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {language === "en" ? "Proudly Serving Austin & Surrounding Areas" : "Sirviendo Austin y Alrededores"}
        </h2>
        <p className="mt-2 text-center text-gray-600">
          {language === "en"
            ? "From downtown Austin to surrounding communities, we provide reliable towing wherever you need it."
            : "Desde el centro de Austin hasta las ciudades cercanas — llegamos donde nos necesites."}
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl shadow">
          <iframe
            title="Austin Service Area Map"
            src="https://www.google.com/maps?q=Austin,+TX&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>

      {/* Request Form */}
      <section className="mx-auto max-w-3xl px-4 py-12" id="request" aria-labelledby="request-heading">
        <h3 id="request-heading" className="text-2xl font-bold text-center">
          {language === "en" ? "Request a Tow" : "Solicitar una Grúa"}
        </h3>
        <p className="text-center text-gray-600 mt-2">
          {language === "en" ? "Need service? Fill out the form and we’ll get back fast." : "¿Necesitas servicio? Llena el formulario y te respondemos rápido."}
        </p>
        <Form postToZapier={postToZapier} />
      </section>

      {/* Sticky Call Button */}
      <a
        href="tel:+15129452314"
        className="fixed right-4 bottom-4 z-30 bg-yellow-400 text-black px-4 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2 hover:bg-yellow-300"
      >
        <PhoneCall size={18} />
        {callNowText}
      </a>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold">
                {language === "en" ? "Need a Tow? Quick Request" : "¿Necesitas Grúa? Solicitud Rápida"}
              </h4>
              <button
                onClick={() => {
                  localStorage.setItem(POPUP_KEY, String(Date.now()));
                  setShowPopup(false);
                }}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePopupSubmit} className="p-4 space-y-3">
              <input name="name" required placeholder={language === "en" ? "Your name" : "Tu nombre"} className="w-full rounded-lg border px-3 py-2" />
              <input name="location" placeholder={language === "en" ? "Where are you? (address or area)" : "¿Dónde estás? (dirección o zona)"} className="w-full rounded-lg border px-3 py-2" />
              <input name="zip" required inputMode="numeric" maxLength={5} pattern="\d{5}" placeholder="ZIP (Austin corridor, e.g., 78704)" className="w-full rounded-lg border px-3 py-2" />
              <input name="phone" required placeholder={language === "en" ? "Best callback number" : "Mejor número para llamar"} className="w-full rounded-lg border px-3 py-2" />
              <textarea name="message" rows="3" placeholder={language === "en" ? "Vehicle + issue (e.g., flat on I-35, won’t start)" : "Vehículo + problema (ej. ponchado en I-35, no enciende)"} className="w-full rounded-lg border px-3 py-2" />
              <button type="submit" className="w-full rounded-lg bg-yellow-400 py-2 font-semibold hover:bg-yellow-300">{language === "en" ? "Send" : "Enviar"}</button>
              {popupError && <p className="text-red-600 text-sm">{popupError}</p>}
              {sendStatus === "ok" && <p className="text-green-600 text-sm">{language === "en" ? "Thanks! We’ll reach out shortly." : "¡Gracias! Te contactamos en breve."}</p>}
              {sendStatus === "err" && <p className="text-red-600 text-sm">{language === "en" ? "Something went wrong. Please call or try again." : "Algo salió mal. Llama o intenta de nuevo."}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= Sticky Nav 2 ================= */
function StickyNav2() {
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const scrolled = useSticky();
  const [open, setOpen] = useState(false);

  const switchLang = () => {
    if (typeof toggleLanguage === "function") toggleLanguage();
    else if (typeof setLanguage === "function") setLanguage(language === "en" ? "es" : "en");
  };

  const callLabel = language === "en" ? "Call" : "Llamar";
  const reqLabel = language === "en" ? "Request a Tow" : "Solicitar una Grúa";
  const menuLabel = language === "en" ? "Menu" : "Menú";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur transition-all duration-200 border-b border-yellow-400
        ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}`}
        role="navigation"
        aria-label="Sticky Navigation"
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          {/* LEFT — match Nav 1: same logo file and language box */}
          <div className="flex items-center gap-3">
            <img src="/images/aztec-logo.png" alt="Azteca Towing logo" className="w-8 h-8 rounded-full ring-1 ring-white/20" />
            <span className="text-white font-semibold">Azteca Towing</span>
            <button onClick={switchLang} className="ml-2 rounded-md bg-yellow-400 text-black text-sm font-semibold px-3 py-1 hover:bg-yellow-300">
              {language === "en" ? "Español" : "English"}
            </button>
          </div>

          {/* RIGHT — Call / Request / Menu */}
          <div className="flex items-center gap-2">
            <a href="tel:+15129452314" className="inline-flex items-center gap-2 rounded-md bg-yellow-400 text-black font-semibold px-3 py-2 hover:bg-yellow-300">
              <PhoneCall size={16} />
              {callLabel}
            </a>
            <a href="#request" className="inline-flex items-center rounded-md bg-white text-zinc-900 font-semibold px-3 py-2 hover:bg-white/90">
              {reqLabel}
            </a>
            <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-md bg-zinc-800 text-white font-semibold px-3 py-2 hover:bg-zinc-700">
              {menuLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-zinc-900 text-white shadow-2xl border-l border-yellow-400">
            <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-800">
              <span className="font-semibold">Azteca Towing</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-zinc-800" aria-label={language === "en" ? "Close menu" : "Cerrar menú"}>
                <X size={18} />
              </button>
            </div>

            <nav className="p-3">
              <ul className="space-y-1">
                {[
                  ["Home", "/"],
                  ["Services", "/services"],
                  ["Commercial", "/commercial"],
                  ["Reviews", "/reviews"],
                  ["Contact", "/contact"],
                  ["About Us", "/about"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded-md hover:bg-zinc-800"
                    >
                      {language === "en"
                        ? label
                        : label
                            .replace("Home", "Inicio")
                            .replace("Services", "Servicios")
                            .replace("Commercial", "Comercial")
                            .replace("Reviews", "Reseñas")
                            .replace("Contact", "Contacto")
                            .replace("About Us", "Sobre Nosotros")}
                    </a>
                  </li>
                ))}
              </ul>

              <button onClick={switchLang} className="mt-4 w-full rounded-md bg-yellow-400 text-black font-semibold px-3 py-2 hover:bg-yellow-300">
                {language === "en" ? "Español" : "English"}
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

/* ================= Reusable Form ================= */
function Form({ postToZapier }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError("");
    const form = e.currentTarget;
    const zip = (form.zip?.value || "").trim();

    if (!/^\d{5}$/.test(zip)) {
      setError("Enter a 5-digit ZIP (e.g., 78704).");
      return;
    }
    if (!isAllowedZip(zip)) {
      setError("Sorry — we serve the Central Texas corridor (Austin + nearby) only.");
      return;
    }

    const fields = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location?.value?.trim() || "",
      message: form.message.value.trim(),
      zip,
      is_local: "true",
      formType: "regular",
      sourcePage: "Home",
    };

    try {
      const ok = await postToZapier(fields);
      if (!ok) throw new Error("bad");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input name="name" required placeholder={language === "en" ? "Your name" : "Tu nombre"} className="w-full rounded-xl border px-4 py-3" />
      <input name="location" placeholder={language === "en" ? "Location or address" : "Ubicación o dirección"} className="w-full rounded-xl border px-4 py-3" />
      <input name="zip" required inputMode="numeric" maxLength={5} pattern="\d{5}" placeholder={language === "en" ? "ZIP (Austin corridor, e.g., 78704)" : "ZIP (corredor Austin, ej. 78704)"} className="w-full rounded-xl border px-4 py-3" />
      <input name="phone" required placeholder={language === "en" ? "Best callback number" : "Mejor número para llamar"} className="w-full rounded-xl border px-4 py-3" />
      <textarea name="message" rows="3" placeholder={language === "en" ? "Vehicle + issue (e.g., flat on I-35, won’t start)" : "Vehículo + problema (ej. ponchado en I-35, no enciende)"} className="w-full rounded-xl border px-4 py-3" />
      <button type="submit" className="w-full rounded-xl bg-yellow-400 py-3 font-semibold hover:bg-yellow-300">{language === "en" ? "Send Request" : "Enviar Solicitud"}</button>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {status === "ok" && <p className="text-green-600 text-center">{language === "en" ? "Thanks! We’ll text/call shortly." : "¡Gracias! Te contactamos en breve."}</p>}
      {status === "err" && <p className="text-red-600 text-center">{language === "en" ? "Something went wrong. Please call or try again." : "Algo salió mal. Llama o intenta de nuevo."}</p>}
    </form>
  );
}