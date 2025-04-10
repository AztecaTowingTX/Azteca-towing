import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const [status, setStatus] = useState(null);
  const { language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("formType", "regular"); // 👈 Identify form for Zapier

    const res = await fetch("https://hooks.zapier.com/hooks/catch/22385391/201bgve/", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });

    if (res.ok) {
      window.location.href = "/thank-you";
      e.target.reset();
    } else {
      setStatus(
        language === "en"
          ? "Something went wrong. Please try again."
          : "Algo salió mal. Por favor intenta de nuevo."
      );
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-white text-black py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {language === "en"
              ? "Contact Azteca Towing"
              : "Contáctanos - Azteca Towing"}
          </motion.h1>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            {language === "en"
              ? "Need help right away? Call us 24/7 or leave us a message and we’ll get back fast."
              : "¿Necesitas ayuda urgente? Llámanos 24/7 o deja tu mensaje y te responderemos pronto."}
          </p>
          <Link
            to="/"
            className="inline-block text-yellow-600 font-semibold underline hover:text-yellow-500 transition"
          >
            {language === "en" ? "← Back to Home" : "← Volver al Inicio"}
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-yellow-100 py-6 text-center text-sm text-gray-800 font-medium">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 px-4">
          <div>📍 Austin & Surrounding Areas</div>
          <div>⏰ 24/7 Emergency Service</div>
          <div>💬 {language === "en" ? "Hablamos Español" : "We Speak English"}</div>
          <div>✅ 15+ Years Experience</div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-20 px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {language === "en" ? "Send Us a Message" : "Envíanos un Mensaje"}
          </h2>
          <p className="text-gray-600">
            {language === "en"
              ? "Got a question? Fill out the form below — we respond quickly."
              : "¿Tienes una pregunta? Llena el formulario — respondemos rápido."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col gap-4 max-w-2xl mx-auto"
        >
          <input type="hidden" name="formType" value="regular" />

          <input
            type="text"
            name="name"
            placeholder={language === "en" ? "Your Name" : "Tu Nombre"}
            required
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder={language === "en" ? "Your Email" : "Tu Correo Electrónico"}
            required
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="tel"
            name="phone"
            placeholder={language === "en" ? "Phone Number" : "Número de Teléfono"}
            className="p-3 rounded-xl border border-gray-300"
          />
          <textarea
            name="message"
            placeholder={
              language === "en" ? "Your Message" : "Tu Mensaje"
            }
            required
            className="p-3 rounded-xl border border-gray-300 min-h-[120px]"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Send Message" : "Enviar Mensaje"}
          </button>

          {status && <p className="text-center mt-4 text-green-600">{status}</p>}
        </form>
      </section>

      {/* Contact Info */}
      <section className="text-center pb-24 text-gray-700 text-sm md:text-base">
        <div className="space-y-2">
          <p>
            📞 {language === "en" ? "Call us anytime:" : "Llámanos en cualquier momento:"}{" "}
            <a
              href="tel:5129452314"
              className="text-black font-bold underline hover:text-yellow-500"
            >
              (512) 945-2314
            </a>
          </p>
          <p>
            📍{" "}
            {language === "en"
              ? "Based in Austin, TX – Serving all nearby areas"
              : "Ubicados en Austin, TX – Atendemos zonas cercanas"}
          </p>
        </div>
      </section>

      {/* Floating Call Button */}
      <a
        href="tel:5129452314"
        className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-black px-5 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
      >
        📞 {language === "en" ? "Call Now" : "Llámanos"}
      </a>
    </>
  );
}
