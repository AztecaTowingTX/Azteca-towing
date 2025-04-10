import React, { useState } from "react";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [status, setStatus] = useState(null);
  const { language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("formType", "regular");

    const res = await fetch("https://hooks.zapier.com/hooks/catch/22385391/201bgve/", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      window.location.href = "/thank-you";
      e.target.reset();
    } else {
      setStatus(
        language === "en"
          ? "Something went wrong. Please try again."
          : "Algo salió mal. Inténtalo de nuevo."
      );
    }
  };

  const reviews = [
    {
      name: "Carlos M.",
      stars: 5,
      text:
        language === "en"
          ? "Super fast and friendly service. Called them at 1 AM and they were there in 15 minutes!"
          : "Servicio súper rápido y amable. ¡Los llamé a la 1 AM y llegaron en 15 minutos!",
    },
    {
      name: "Jessica T.",
      stars: 4,
      text:
        language === "en"
          ? "Very professional. They helped me get my car out of a tricky situation with no damage."
          : "Muy profesionales. Me ayudaron a sacar mi auto sin daños.",
    },
    {
      name: "Mike R.",
      stars: 5,
      text:
        language === "en"
          ? "Excellent customer service. Affordable rates and quick response."
          : "Excelente servicio. Tarifas justas y respuesta rápida.",
    },
    {
      name: "Ashley D.",
      stars: 5,
      text:
        language === "en"
          ? "Azteca Towing was a lifesaver when I broke down on the highway. Highly recommend!"
          : "Azteca Towing me salvó cuando me quedé en la carretera. ¡Muy recomendados!",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpeg')" }}
      >
        <div className="bg-black/60 w-full h-full absolute top-0 left-0 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-[160px] sm:py-[220px] md:py-[280px]">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4 max-w-4xl mx-auto leading-tight drop-shadow-lg"
          >
            {language === "en"
              ? "Austin's Trusted Tow Truck Service — Fast & Reliable"
              : "Servicio de grúas confiable en Austin — Rápido y seguro"}
          </motion.h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-6 drop-shadow">
            {language === "en"
              ? "Azteca Towing offers 24/7 emergency roadside help across Austin. Flat tire? Locked out? We’re here — fast."
              : "Azteca Towing ofrece asistencia vial de emergencia 24/7 en Austin. ¿Llanta ponchada? ¿Te quedaste fuera? Estamos aquí — rápido."}
          </p>
          <a
            href="tel:5129452314"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            <PhoneCall className="w-5 h-5" />
            {language === "en" ? "Call Now: (512) 945-2314" : "Llámanos: (512) 945-2314"}
          </a>
        </div>
      </section>

      {/* Review Slider */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">
          {language === "en" ? "What Our Customers Say" : "Lo Que Dicen Nuestros Clientes"}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Slider {...sliderSettings}>
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow text-left">
                <p className="text-yellow-500 text-xl mb-2">
                  {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                </p>
                <p className="italic text-gray-800 mb-4">"{review.text}"</p>
                <p className="text-sm font-semibold text-gray-600">- {review.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-yellow-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <h2 className="text-3xl font-bold">
            {language === "en" ? "Why Choose Azteca Towing?" : "¿Por Qué Elegir Azteca Towing?"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { emoji: "⚡", en: "Fast 24/7 Dispatch", es: "Despacho Rápido 24/7" },
              { emoji: "🔒", en: "Licensed & Insured", es: "Licenciados y Asegurados" },
              { emoji: "💬", en: "Bilingual Crew", es: "Equipo Bilingüe" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
                <div className="text-3xl">{item.emoji}</div>
                <h3 className="font-semibold text-lg mt-2">
                  {language === "en" ? item.en : item.es}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700 mt-6">
            <div className="flex items-center gap-2">✅ {language === "en" ? "Licensed & Insured" : "Licenciados y Asegurados"}</div>
            <div className="flex items-center gap-2">🔧 {language === "en" ? "Family-Owned & Operated" : "Negocio Familiar"}</div>
            <div className="flex items-center gap-2">🕒 {language === "en" ? "Fast 24/7 Response" : "Respuesta Rápida 24/7"}</div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="bg-gray-100 py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en"
              ? "Proudly Serving Austin & Surrounding Areas"
              : "Orgullosamente Sirviendo Austin y Áreas Cercanas"}
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "We serve Round Rock, Pflugerville, Cedar Park, Buda, Kyle, Leander, Georgetown & more."
              : "Servimos Round Rock, Pflugerville, Cedar Park, Buda, Kyle, Leander, Georgetown y más."}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Service Area Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110752.33558233216!2d-97.82215419396729!3d30.307678556741088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59ed5d83f0d%3A0x5b8ad905db3d2242!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1682722723689!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">
          {language === "en" ? "Request a Tow" : "Solicita una Grúa"}
        </h2>
        <p className="text-gray-600 mb-6">
          {language === "en"
            ? "Need service? Fill out the form and we’ll get back fast."
            : "¿Necesitas servicio? Llena el formulario y te contactaremos rápido."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex flex-col gap-4 text-left"
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
            type="text"
            name="location"
            placeholder={language === "en" ? "Location or Address" : "Ubicación o Dirección"}
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="tel"
            name="phone"
            placeholder={language === "en" ? "Phone Number" : "Número de Teléfono"}
            required
            className="p-3 rounded-xl border border-gray-300"
          />
          <textarea
            name="message"
            placeholder={language === "en" ? "How can we help?" : "¿Cómo podemos ayudarte?"}
            required
            className="p-3 rounded-xl border border-gray-300"
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

      {/* Floating Call Now Button */}
      <a
        href="tel:5129452314"
        className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-black px-5 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
      >
        📞 {language === "en" ? "Call Now" : "Llámanos"}
      </a>
    </>
  );
}
