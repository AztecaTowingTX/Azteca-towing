import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet";

const galleryItems = [
  { key: "boxtruck1", captionEn: "", captionEs: "" },
  { key: "classic1", captionEn: "", captionEs: "" },
  { key: "equipment1", captionEn: "", captionEs: "" },
  { key: "fedex1", captionEn: "", captionEs: "" },
  { key: "flippedcar1", captionEn: "", captionEs: "" },
  { key: "foodtruck1", captionEn: "", captionEs: "" },
  { key: "roadside1", captionEn: "", captionEs: "" },
  { key: "truck1", captionEn: "", captionEs: "" },
  { key: "worktruck1", captionEn: "", captionEs: "" },
];

export default function Gallery() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Gallery | Azteca Towing Austin</title>
        <meta
          name="description"
          content="Browse Azteca Towing's gallery of real towing jobs across Austin — including trucks, equipment, accidents, and roadside assistance."
        />
        <meta
          name="keywords"
          content="Azteca Towing gallery, towing images Austin, truck towing Austin, equipment towing, roadside recovery photos"
        />
      </Helmet>

      <Navbar />
      <section className="bg-white text-black py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
            {language === "en" ? "Gallery of Work" : "Galería de Trabajos"}
          </h1>

          <p className="text-center max-w-3xl mx-auto text-lg mb-12 text-gray-700">
            {language === "en"
              ? "Here’s a look at the wide range of vehicles and equipment we’ve safely towed across Austin and surrounding areas."
              : "Echa un vistazo a la variedad de vehículos y equipos que hemos remolcado con seguridad en Austin y sus alrededores."}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={`/images/gallery/${item.key}.jpg`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-4 text-center text-sm text-gray-700">
                  {language === "en" ? item.captionEn : item.captionEs}
                </div>
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