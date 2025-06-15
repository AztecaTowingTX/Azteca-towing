import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext"; // 🌐 Language support

export default function ThankYou() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Thank You | Azteca Towing" : "Gracias | Azteca Towing"}</title>
        <meta
          name="description"
          content={
            language === "en"
              ? "Your request has been received. A team member will reach out as soon as possible."
              : "Hemos recibido tu solicitud. Un miembro del equipo se pondrá en contacto contigo lo antes posible."
          }
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Navbar />
      <section className="bg-white text-black py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "en" ? "Thank You!" : "¡Gracias!"}
          </h1>
          <p className="text-lg mb-6">
            {language === "en"
              ? "Your request has been received. A team member will reach out as soon as possible."
              : "Hemos recibido tu solicitud. Un miembro del equipo se pondrá en contacto contigo lo antes posible."}
          </p>
          <p className="text-gray-600 mb-10">
            {language === "en"
              ? "Need help right away? Call us 24/7 at"
              : "¿Necesitas ayuda urgente? Llámanos 24/7 al"}{" "}
            <strong>(512) 945-2314</strong>
          </p>

          <Link
            to="/"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Back to Home" : "Volver al Inicio"}
          </Link>
        </div>
      </section>
    </>
  );
}