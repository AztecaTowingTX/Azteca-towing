import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

export default function ThankYou() {
  const { language } = useLanguage();

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Azteca Towing",
    image: "https://aztecatowingtx.com/images/aztec-logo.png",
    telephone: "+15129452314",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78753",
      addressCountry: "US",
    },
    url: "https://aztecatowingtx.com",
    sameAs: [
      "https://www.yelp.com/biz/azteca-towing-austin-3",
      "https://www.tiktok.com/@santiagosanchezne",
      "https://www.instagram.com/aztecatowingatx",
    ],
  };

  return (
    <>
      {/* ✅ SEO + Schema */}
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
        <meta name="keywords" content="Azteca Towing thank you page, Austin tow request submitted, towing confirmation" />
        <meta property="og:title" content="Thank You | Azteca Towing" />
        <meta
          property="og:description"
          content={
            language === "en"
              ? "Request submitted! Azteca Towing will reach out shortly. Available 24/7 in Austin."
              : "¡Solicitud enviada! Azteca Towing se comunicará pronto. Disponible 24/7 en Austin."
          }
        />
        <meta property="og:image" content="https://aztecatowingtx.com/assets/og-thankyou.jpg" />
        <meta property="og:url" content="https://aztecatowingtx.com/thank-you" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
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