import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

export default function CommercialTowing() {
  const { language } = useLanguage();
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("formType", "commercial");

    const res = await fetch("https://hooks.zapier.com/hooks/catch/22385391/20yijmf/", {
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
      <section className="bg-yellow-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en"
            ? "Commercial Towing Services"
            : "Servicios de Remolque Comercial"}
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          {language === "en"
            ? "Partner with a towing company that delivers results. From dealerships and apartments to HOAs and construction companies — Azteca Towing is your trusted commercial towing partner in Austin and beyond."
            : "Colabore con una empresa de grúas que ofrece resultados. Desde concesionarios y apartamentos hasta HOAs y compañías de construcción — Azteca Towing es su socio de confianza en Austin y más allá."}
        </p>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 px-4">
        <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
          {[
            {
              emoji: "🏢",
              en: "HOA & Apartment Towing",
              es: "Remolque para HOAs y Apartamentos",
            },
            {
              emoji: "🏪",
              en: "Dealership Repos & Transport",
              es: "Reposesiones y Transporte para Concesionarios",
            },
            {
              emoji: "🚧",
              en: "Equipment & Machinery Relocation",
              es: "Traslado de Equipos y Maquinaria",
            },
            {
              emoji: "📍",
              en: "Private Property Impound",
              es: "Remolque en Propiedad Privada",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                {language === "en" ? item.en : item.es}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg italic text-gray-700">
            {language === "en"
              ? `"We've served multiple dealerships — and they stay with us because of our reliability, responsiveness, and professionalism."`
              : `"Hemos trabajado con varios concesionarios — y siguen con nosotros por nuestra confiabilidad, rapidez y profesionalismo."`}
          </p>
          <a
            href="tel:5129452314"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            📞 {language === "en" ? "Partner With Us" : "Asóciate con Nosotros"}
          </a>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {language === "en"
            ? "Request Commercial Service"
            : "Solicitar Servicio Comercial"}
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          {language === "en"
            ? "Tell us a bit about your business and towing needs. We'll get in touch shortly."
            : "Cuéntenos un poco sobre su negocio y necesidades de remolque. Nos pondremos en contacto pronto."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-100 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-4 text-left"
        >
          <input type="hidden" name="formType" value="commercial" />

          <input
            type="text"
            name="company"
            placeholder={language === "en" ? "Company Name" : "Nombre de la Empresa"}
            required
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            name="contact"
            placeholder={language === "en" ? "Your Name" : "Tu Nombre"}
            required
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder={language === "en" ? "Email" : "Correo Electrónico"}
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
              language === "en"
                ? "Tell us about your business and what you need."
                : "Cuéntanos sobre tu negocio y lo que necesitas."
            }
            required
            className="p-3 rounded-xl border border-gray-300 min-h-[120px]"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Send Request" : "Enviar Solicitud"}
          </button>

          {status && <p className="text-center mt-4 text-green-600">{status}</p>}
        </form>
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
