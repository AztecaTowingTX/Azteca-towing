import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [status, setStatus] = useState(null);
  const { language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.target;

    const form = new FormData(formEl);
    // Tag form type for Zapier routing
    form.set("formType", "regular");
    form.set("sourcePage", "Contact");

    // Honeypot: if filled, treat as bot and bail
    if (form.get("company")) return;

    try {
      const res = await fetch("https://hooks.zapier.com/hooks/catch/22385391/201bgve/", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      if (res.ok) {
        formEl.reset();
        // Redirect to thank-you (kept from your version)
        window.location.href = "/thank-you";
      } else {
        throw new Error("Bad response");
      }
    } catch (err) {
      setStatus(
        language === "en"
          ? "Something went wrong. Please call or text 512-945-2314."
          : "Ocurrió un error. Por favor llame o mande mensaje al 512-945-2314."
      );
    }
  };

  const t = (en, es) => (language === "en" ? en : es);

  return (
    <>
      {/* ✅ SEO + LOCAL SCHEMA */}
      <Helmet>
        <title>{t("Contact Azteca Towing | 24/7 Towing in Austin, TX", "Contáctanos | Grúas 24/7 en Austin, TX")}</title>
        <meta
          name="description"
          content={t(
            "Call or text Azteca Towing in Austin, TX. Submit the form and our dispatcher will text/call you back quickly.",
            "Llame o mande mensaje a Azteca Towing en Austin, TX. Envíe el formulario y nuestro despachador le llamará o enviará mensaje rápidamente."
          )}
        />
        <meta name="keywords" content="contact towing Austin, towing phone number, request a tow Austin, roadside help" />
        <meta property="og:title" content={t("Contact Azteca Towing | 24/7 Towing", "Contacto Azteca Towing | Servicio 24/7")} />
        <meta property="og:description" content={t("Reach out anytime. We respond by text/call.", "Contáctenos cuando guste. Respondemos por mensaje/llamada.")} />
        <meta property="og:image" content="https://aztecatowing.com/assets/og-contact.jpg" />
        <meta property="og:url" content="https://aztecatowing.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Azteca Towing",
            image: "https://aztecatowing.com/assets/og-contact.jpg",
            "@id": "https://aztecatowing.com",
            url: "https://aztecatowing.com",
            telephone: "+15129452314",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Austin",
              addressRegion: "TX",
              postalCode: "78753",
              addressCountry: "US",
            },
            sameAs: [
              "https://www.yelp.com/biz/azteca-towing-austin-3",
              "https://www.instagram.com/aztecatowingatx",
              "https://www.tiktok.com/@santiagosanchezne",
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <section className="bg-gradient-to-br from-yellow-50 to-white text-black py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {t("Request a Tow", "Solicitar una Grúa")}
          </motion.h1>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            {t(
              "Need service? Fill out the form — we reply by text/call fast.",
              "¿Necesita servicio? Llene el formulario — respondemos rápido por mensaje/llamada."
            )}
          </p>
          <Link
            to="/"
            className="inline-block text-yellow-600 font-semibold underline hover:text-yellow-500 transition"
          >
            {t("← Back to Home", "← Volver al Inicio")}
          </Link>
        </div>
      </section>

      <section className="bg-yellow-100 py-6 text-center text-sm text-gray-800 font-medium">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 px-4">
          <div>📍 Austin & Surrounding Areas</div>
          <div>⏰ 24/7 Emergency Service</div>
          <div>💬 {t("Hablamos Español", "We Speak English")}</div>
          <div>✅ 15+ Years Experience</div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("Send Details", "Enviar Detalles")}
          </h2>
          <p className="text-gray-600">
            {t(
              "Fastest response: we text/call you back. No email needed.",
              "Respuesta más rápida: le llamamos o mandamos mensaje. No se necesita correo."
            )}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col gap-4 max-w-2xl mx-auto"
        >
          {/* Honeypot for bots */}
          <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" />

          <input type="hidden" name="formType" value="regular" />

          <input
            type="text"
            name="name"
            placeholder={t("Your Name", "Su Nombre")}
            required
            className="p-3 rounded-xl border border-gray-300"
          />

          <input
            type="text"
            name="location"
            placeholder={t("Location or Address", "Ubicación o Dirección")}
            required
            className="p-3 rounded-xl border border-gray-300"
          />

          <input
            type="tel"
            name="phone"
            placeholder={t("Phone Number", "Número de Teléfono")}
            required
            pattern="[\d\s\-\+\(\)]{7,}"
            inputMode="tel"
            className="p-3 rounded-xl border border-gray-300"
          />

          <textarea
            name="message"
            placeholder={t("Vehicle & Issue (e.g., 2015 F-150, won’t start)", "Vehículo y problema (ej., Ford F-150 2015, no enciende)")}
            required
            className="p-3 rounded-xl border border-gray-300 min-h-[120px]"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {t("Send Request", "Enviar Solicitud")}
          </button>

          {status && <p className="text-center mt-4 text-red-600">{status}</p>}
        </form>
      </section>

      <section className="text-center pb-24 text-gray-700 text-sm md:text-base">
        <div className="space-y-2">
          <p>
            📞 {t("Call us anytime:", "Llámanos en cualquier momento:")}{" "}
            <a
              href="tel:5129452314"
              className="text-black font-bold underline hover:text-yellow-500"
            >
              (512) 945-2314
            </a>
          </p>
          <p>
            📍 {t("Based in Austin, TX – Serving all nearby areas", "Ubicados en Austin, TX – Atendemos zonas cercanas")}
          </p>
        </div>
      </section>

      <a
        href="tel:5129452314"
        className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-black px-5 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
      >
        📞 {t("Call Now", "Llámanos")}
      </a>
    </>
  );
}