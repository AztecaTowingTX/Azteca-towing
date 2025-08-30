import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async"; // ✅ SEO IMPORT

export default function Services() {
  const { language } = useLanguage();

  const services = language === "en"
    ? [
        { emoji: "🚨", title: "Emergency Towing", desc: "Available 24/7 for fast, dependable towing across Austin and nearby areas." },
        { emoji: "🔋", title: "Roadside Assistance", desc: "Flat tire, dead battery, or locked out? We’re there — fast and prepared." },
        { emoji: "🏘️", title: "Private Property Towing", desc: "Partner with us to keep your lot clear. HOAs, apartments, and businesses welcome." },
        { emoji: "🚙", title: "Flatbed Towing", desc: "Safe transport for luxury, classic, or low-clearance vehicles." },
        { emoji: "🏗️", title: "Equipment Transport", desc: "We tow sheds, machinery, boats, and more. If it fits, we move it." },
        { emoji: "📦", title: "Junk Car Removal", desc: "Free up space with fast, friendly removal of old or wrecked vehicles." },
      ]
    : [
        { emoji: "🚨", title: "Remolque de Emergencia", desc: "Disponible 24/7 para remolques rápidos y confiables en Austin y alrededores." },
        { emoji: "🔋", title: "Asistencia en Carretera", desc: "Llanta ponchada, batería muerta o cerraduras. Llegamos rápido y preparados." },
        { emoji: "🏘️", title: "Remolque en Propiedad Privada", desc: "Colabore con nosotros para mantener su lote despejado. HOAs, apartamentos y negocios." },
        { emoji: "🚙", title: "Remolque Flatbed", desc: "Transporte seguro para vehículos de lujo, clásicos o bajos." },
        { emoji: "🏗️", title: "Transporte de Equipos", desc: "Movemos cobertizos, maquinaria, botes y más. Si cabe, lo llevamos." },
        { emoji: "📦", title: "Remoción de Autos Chatarra", desc: "Limpia espacio con la remoción rápida de vehículos viejos o chocados." },
      ];

  return (
    <>
      {/* ✅ SEO META TAGS + LOCAL BUSINESS SCHEMA */}
      <Helmet>
        <title>Towing & Roadside Services | Azteca Towing Austin</title>
        <meta name="description" content="From flat tires to junk car removal — we offer fast, affordable towing and roadside help 24/7 in Austin and nearby cities." />
        <meta name="keywords" content="emergency towing, flatbed towing Austin, roadside assistance Austin, junk car removal, equipment towing" />
        <meta property="og:title" content="Towing & Roadside Services | Azteca Towing Austin" />
        <meta property="og:description" content="24/7 emergency towing, roadside assistance, flatbed transport, junk removal and more. Serving Austin and nearby areas." />
        <meta property="og:image" content="https://aztecatowingtx.com/images/aztec-logo.png" />
        <meta property="og:url" content="https://aztecatowingtx.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Azteca Towing",
            image: "https://aztecatowingtx.com/images/aztec-logo.png",
            "@id": "https://aztecatowingtx.com",
            url: "https://aztecatowingtx.com/services",
            telephone: "512-945-2314",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Austin",
              addressRegion: "TX",
              postalCode: "78753",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 00:00-23:59",
            sameAs: [
              "https://www.tiktok.com/@santiagosanchezne",
              "https://www.instagram.com/aztecatowingatx",
              "https://yelp.to/JWYXfQ89fN",
              "https://www.google.com/search?q=azteca+towing+reviews",
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-yellow-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "Towing & Roadside Services" : "Servicios de Grúa y Asistencia"}
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg">
          {language === "en"
            ? "Fast, affordable towing and emergency roadside help — 24/7 throughout Austin and nearby cities."
            : "Remolque y asistencia rápida y económica — 24/7 en Austin y alrededores."}
        </p>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 px-4">
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {services.map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {language === "en" ? "How Our Service Works" : "Cómo Funciona Nuestro Servicio"}
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 text-center text-gray-700 text-lg">
          <p>1️⃣ {language === "en" ? "Call or request online" : "Llama o solicita en línea"}</p>
          <p>2️⃣ {language === "en" ? "We dispatch fast" : "Despachamos rápido"}</p>
          <p>3️⃣ {language === "en" ? "Vehicle is handled with care" : "Cuidamos tu vehículo"}</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-500 py-10 text-center text-black px-4">
        <h3 className="text-2xl font-bold mb-4">
          {language === "en"
            ? "Need a tow right now? We’re ready to roll."
            : "¿Necesitas una grúa ya? Estamos listos."}
        </h3>
        <a
          href="tel:5129452314"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          📞 {language === "en" ? "Call Now" : "Llámanos"}
        </a>
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