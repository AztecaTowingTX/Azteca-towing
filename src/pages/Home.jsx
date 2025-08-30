// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { PhoneCall, X } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// === CONFIG ===
const POPUP_KEY = "atx_seen_popup_v2";
const ZAP_URL = "https://hooks.zapier.com/hooks/catch/22385391/201bgve/";
// If image is at /public/images/hero-bg.jpeg keep this path:
const HERO_IMG = "/images/hero-bg.jpeg";
// If your file is actually /public/hero-bg.jpeg, use: const HERO_IMG = "/hero-bg.jpeg";

export default function Home() {
  const { language } = useLanguage();

  // ================= Popup =================
  const [showPopup, setShowPopup] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    const last = localStorage.getItem(POPUP_KEY);
    const DAY = 24 * 60 * 60 * 1000;
    if (!last || Date.now() - parseInt(last, 10) > DAY) {
      const t = setTimeout(() => setShowPopup(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  // Helper: POST to Zapier with urlencoded body (Zap parses this very reliably)
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

    const form = e.currentTarget;
    const fields = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location?.value?.trim() || "",
      message: form.message.value.trim(),
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

  // ================= Reviews =================
  const reviews = [
    {
      name: "Carlos M.",
      stars: 5,
      text:
        language === "en"
          ? "Super fast and friendly. Called at 1 AM and they arrived in 15 minutes!"
          : "Súper rápidos y amables. ¡Llamé a la 1 AM y llegaron en 15 minutos!",
    },
    {
      name: "Jessica T.",
      stars: 5,
      text:
        language === "en"
          ? "Professional and careful with my car. 10/10."
          : "Profesionales y cuidadosos con mi auto. 10/10.",
    },
    {
      name: "Mike R.",
      stars: 5,
      text:
        language === "en"
          ? "Affordable rates and quick response. Lifesaver."
          : "Precios justos y respuesta rápida. Me salvaron.",
    },
    {
      name: "Ashley D.",
      stars: 5,
      text:
        language === "en"
          ? "Broke down on 35. Dispatcher was calm, driver was fast."
          : "Me quedé en la 35. La despachadora muy amable y el chofer rapidísimo.",
    },
    {
      name: "Luis G.",
      stars: 4,
      text:
        language === "en"
          ? "Towed my truck to the shop after hours. Smooth process."
          : "Remolcaron mi troca al taller de noche. Todo fácil.",
    },
    {
      name: "Erika S.",
      stars: 5,
      text:
        language === "en"
          ? "They unlocked my car in minutes. Highly recommend."
          : "Abrieron mi carro en minutos. Muy recomendados.",
    },
  ];

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

  // ================= Hero CTA =================
  const callNowText = language === "en" ? "Call Now" : "Llamar Ahora";
  const phone = "(512) 945-2314";

  return (
    <>
      <Helmet>
        <title>Azteca Towing | 24/7 Tow Truck Service in Austin, TX</title>
        <meta
          name="description"
          content="Fast, reliable towing and roadside help across Austin. 24/7 service, bilingual team, family-owned."
        />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <header
        className="relative bg-no-repeat bg-cover min-h-[64vh] md:min-h-[76vh]"
        style={{
          // push the image UP a bit so trucks show more (keep Azteca arch visible)
          backgroundImage: `linear-gradient(rgba(0,0,0,.28), rgba(0,0,0,.28)), url(${HERO_IMG})`,
          backgroundPosition: "50% 18%", // <- move up (lower number = higher crop)
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow"
            style={{
              textShadow: "0 1px 1px rgba(0,0,0,.75), 0 10px 24px rgba(0,0,0,.45)",
            }}
          >
            {language === "en"
              ? "Austin's Trusted Towing Service"
              : "Servicio de Grúas de Confianza en Austin"}
          </motion.h1>

          <p
            className="mt-3 md:mt-4 text-sm md:text-base opacity-95"
            style={{ textShadow: "0 1px 1px rgba(0,0,0,.55)" }}
          >
            {language === "en"
              ? "Fast, affordable 24/7 towing & roadside help."
              : "Asistencia y remolque 24/7 — rápido y accesible."}
          </p>

          <a
            href="tel:+15129452314"
            className="inline-flex items-center gap-2 mt-6 bg-yellow-400 text-black font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full shadow hover:bg-yellow-300"
          >
            <PhoneCall size={18} />
            {callNowText}: {phone}
          </a>
        </div>

        {/* soft fade at bottom for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/70" />
      </header>

      {/* Reviews (above map) */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h3 className="text-2xl font-bold text-center mb-6">
            {language === "en" ? "What Our Customers Say" : "Lo Que Dicen Nuestros Clientes"}
          </h3>
          <Slider {...sliderSettings}>
            {reviews.map((r, i) => (
              <div key={i} className="px-2">
                <div className="bg-white rounded-2xl shadow p-6 md:p-8">
                  <div className="flex items-center gap-2 text-yellow-500 text-lg">
                    {"★".repeat(r.stars)}{" "}
                    <span className="text-gray-600 text-sm">— {r.name}</span>
                  </div>
                  <p className="mt-3 text-gray-700 italic leading-relaxed">“{r.text}”</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Service Area + Map */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {language === "en"
            ? "Proudly Serving Austin & Surrounding Areas"
            : "Sirviendo Austin y Alrededores"}
        </h2>
        <p className="mt-2 text-center text-gray-600">
          {language === "en"
            ? "From downtown Austin to surrounding communities, we provide reliable towing wherever you need it."
            : "Desde el centro de Austin hasta las ciudades cercanas — llegamos donde nos necesites."}
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl shadow">
          <iframe
            title="Austin Service Area"
            src="https://www.google.com/maps?q=Austin,+TX&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>

      {/* Quick Request Form */}
      <section className="mx-auto max-w-3xl px-4 py-12" id="request">
        <h3 className="text-2xl font-bold text-center">
          {language === "en" ? "Request a Tow" : "Solicitar una Grúa"}
        </h3>
        <p className="text-center text-gray-600 mt-2">
          {language === "en"
            ? "Need service? Fill out the form and we’ll get back fast."
            : "¿Necesitas servicio? Llena el formulario y te respondemos rápido."}
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

      {/* ===== Popup ===== */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold">
                {language === "en"
                  ? "Need a Tow? Quick Request"
                  : "¿Necesitas Grúa? Solicitud Rápida"}
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
              <input
                name="name"
                required
                placeholder={language === "en" ? "Your name" : "Tu nombre"}
                className="w-full rounded-lg border px-3 py-2"
              />
              <input
                name="location"
                placeholder={
                  language === "en"
                    ? "Where are you? (address or area)"
                    : "¿Dónde estás? (dirección o zona)"
                }
                className="w-full rounded-lg border px-3 py-2"
              />
              <input
                name="phone"
                required
                placeholder={
                  language === "en"
                    ? "Best callback number"
                    : "Mejor número para llamar"
                }
                className="w-full rounded-lg border px-3 py-2"
              />
              <textarea
                name="message"
                rows="3"
                placeholder={
                  language === "en"
                    ? "Vehicle + issue (e.g., flat on I-35, won’t start)"
                    : "Vehículo + problema (ej. ponchado en I-35, no enciende)"
                }
                className="w-full rounded-lg border px-3 py-2"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-yellow-400 py-2 font-semibold hover:bg-yellow-300"
              >
                {language === "en" ? "Send" : "Enviar"}
              </button>

              {sendStatus === "ok" && (
                <p className="text-green-600 text-sm">
                  {language === "en"
                    ? "Thanks! We’ll reach out shortly."
                    : "¡Gracias! Te contactamos en breve."}
                </p>
              )}
              {sendStatus === "err" && (
                <p className="text-red-600 text-sm">
                  {language === "en"
                    ? "Something went wrong. Please call or try again."
                    : "Algo salió mal. Llama o intenta de nuevo."}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ===== Reusable form =====
function Form({ postToZapier }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const fields = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location?.value?.trim() || "",
      message: form.message.value.trim(),
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
      <input
        name="name"
        required
        placeholder={language === "en" ? "Your name" : "Tu nombre"}
        className="w-full rounded-xl border px-4 py-3"
      />
      <input
        name="location"
        placeholder={
          language === "en" ? "Location or address" : "Ubicación o dirección"
        }
        className="w-full rounded-xl border px-4 py-3"
      />
      <input
        name="phone"
        required
        placeholder={
          language === "en" ? "Best callback number" : "Mejor número para llamar"
        }
        className="w-full rounded-xl border px-4 py-3"
      />
      <textarea
        name="message"
        rows="3"
        placeholder={
          language === "en"
            ? "Vehicle + issue (e.g., flat on I-35, won’t start)"
            : "Vehículo + problema (ej. ponchado en I-35, no enciende)"
        }
        className="w-full rounded-xl border px-4 py-3"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-yellow-400 py-3 font-semibold hover:bg-yellow-300"
      >
        {language === "en" ? "Send Request" : "Enviar Solicitud"}
      </button>

      {status === "ok" && (
        <p className="text-green-600 text-center">
          {language === "en"
            ? "Thanks! We’ll text/call shortly."
            : "¡Gracias! Te contactamos en breve."}
        </p>
      )}
      {status === "err" && (
        <p className="text-red-600 text-center">
          {language === "en"
            ? "Something went wrong. Please call or try again."
            : "Algo salió mal. Llama o intenta de nuevo."}
        </p>
      )}
    </form>
  );
}