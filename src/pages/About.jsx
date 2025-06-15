import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet";

export default function About() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>About Us | Azteca Towing Austin</title>
        <meta
          name="description"
          content="Learn about Azteca Towing — a family-owned towing company proudly serving Austin with 15+ years of trusted service, bilingual support, and 24/7 roadside help."
        />
        <meta
          name="keywords"
          content="Azteca Towing, About Azteca, Austin towing company, family-owned towing, roadside help Austin"
        />
      </Helmet>

      <Navbar />
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
            {language === "en" ? "About Azteca Towing" : "Sobre Azteca Towing"}
          </h1>

          {/* About Paragraphs */}
          <div className="text-lg leading-relaxed mb-10 space-y-6 text-center md:text-left">
            {language === "en" ? (
              <>
                <p>
                  Azteca Towing has proudly served the Austin area since 2011 — over 15 years of family-driven dedication. What started with a daughter helping her father buy his first tow truck has grown into a trusted, bilingual (English & Spanish) towing company that puts people first.
                </p>
                <p>
                  From flat tires and dead batteries to transporting luxury, lifted, or heavy-duty vehicles — we’ve got the equipment and experience. Our flatbed and medium-duty trucks can handle it all, including moving sheds, boats, construction machinery, and more.
                </p>
                <p>
                  We're family-owned, available 24/7, and committed to fast response times, honest service, and unbeatable customer care. Azteca Towing serves Greater Austin and beyond — wherever you need us, we’ll be there.
                </p>
              </>
            ) : (
              <>
                <p>
                  Azteca Towing ha servido con orgullo al área de Austin desde 2011 — más de 15 años de dedicación familiar. Lo que comenzó con una hija ayudando a su padre a comprar su primera grúa, hoy es una compañía de confianza, bilingüe (inglés y español) enfocada en las personas.
                </p>
                <p>
                  Desde llantas ponchadas y baterías descargadas hasta transporte de vehículos de lujo, levantados o pesados — tenemos el equipo y la experiencia. Contamos con grúas tipo flatbed y de capacidad media para mover incluso cobertizos, botes y maquinaria de construcción.
                </p>
                <p>
                  Somos una empresa familiar, disponible 24/7, con tiempos de respuesta rápidos, servicio honesto y atención al cliente inigualable. Azteca Towing atiende el Gran Austin y más allá — donde nos necesites, ahí estaremos.
                </p>
              </>
            )}
          </div>

          {/* Service Highlights */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              {
                emoji: "🚗",
                title: language === "en" ? "Reliable Service" : "Servicio Confiable",
                desc:
                  language === "en"
                    ? "Whether you're locked out, stranded, or dealing with a breakdown — we’re here to help, fast."
                    : "Estés encerrado, varado o con una avería — estamos aquí para ayudarte, rápido.",
              },
              {
                emoji: "🤝",
                title: language === "en" ? "Community-Focused" : "Comprometidos con la Comunidad",
                desc:
                  language === "en"
                    ? "We proudly serve Austin with care and integrity. Every vehicle we tow is treated like our own."
                    : "Servimos a Austin con cuidado e integridad. Cada vehículo lo tratamos como si fuera nuestro.",
              },
              {
                emoji: "⚡",
                title: language === "en" ? "Fast Response Times" : "Respuesta Rápida",
                desc:
                  language === "en"
                    ? "We’re available 24/7 with real-time updates and quick dispatch."
                    : "Disponibles 24/7 con actualizaciones en tiempo real y respuesta rápida.",
              },
              {
                emoji: "🛠",
                title: language === "en" ? "Trusted Professionals" : "Profesionales Confiables",
                desc:
                  language === "en"
                    ? "With years of experience, we bring professionalism and care to every job."
                    : "Con años de experiencia, ofrecemos profesionalismo y cuidado en cada servicio.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {item.emoji} {item.title}
                </h2>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
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