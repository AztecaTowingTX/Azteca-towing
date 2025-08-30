import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async"; // ✅ SEO Import

export default function Reviews() {
  const { language } = useLanguage();

  const reviewData = {
    en: {
      heading: "What Our Customers Say",
      cta: "Had a great experience with Azteca Towing? Let others know!",
      reviews: [
        {
          name: "Carlos M.",
          stars: 5,
          text: "Super fast and friendly service. Called them at 1 AM and they were there in 15 minutes!",
        },
        {
          name: "Jessica T.",
          stars: 4,
          text: "Very professional. They helped me get my car out of a tricky situation with no damage.",
        },
        {
          name: "Mike R.",
          stars: 5,
          text: "Excellent customer service. Affordable rates and quick response.",
        },
        {
          name: "Ashley D.",
          stars: 5,
          text: "Azteca Towing was a lifesaver when I broke down on the highway. Highly recommend!",
        },
      ],
    },
    es: {
      heading: "Lo Que Dicen Nuestros Clientes",
      cta: "¿Tuviste una buena experiencia con Azteca Towing? ¡Déjala saber!",
      reviews: [
        {
          name: "Carlos M.",
          stars: 5,
          text: "Servicio súper rápido y amable. ¡Los llamé a la 1 AM y llegaron en 15 minutos!",
        },
        {
          name: "Jessica T.",
          stars: 4,
          text: "Muy profesionales. Me ayudaron a sacar mi auto de una situación complicada sin daños.",
        },
        {
          name: "Mike R.",
          stars: 5,
          text: "Excelente servicio al cliente. Tarifas accesibles y respuesta rápida.",
        },
        {
          name: "Ashley D.",
          stars: 5,
          text: "Azteca Towing me salvó cuando me descompuse en la autopista. ¡Los recomiendo mucho!",
        },
      ],
    },
  };

  const { heading, reviews, cta } = reviewData[language];

  return (
    <>
      {/* ✅ SEO META TAGS + LOCAL BUSINESS SCHEMA */}
      <Helmet>
        <title>What Customers Say | Azteca Towing Reviews</title>
        <meta
          name="description"
          content="Read real reviews from happy customers in Austin. Azteca Towing provides fast, reliable 24/7 service and honest pricing."
        />
        <meta
          name="keywords"
          content="Azteca Towing reviews, best towing company Austin, customer feedback towing, 5-star tow truck reviews"
        />
        <meta
          property="og:title"
          content="What Customers Say | Azteca Towing Reviews"
        />
        <meta
          property="og:description"
          content="Real testimonials from customers who trust Azteca Towing in Austin, TX. See why we’re rated 5 stars."
        />
        <meta
          property="og:image"
          content="https://aztecatowing.com/assets/og-reviews.jpg"
        />
        <meta property="og:url" content="https://aztecatowing.com/reviews" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Azteca Towing",
            image: "https://aztecatowing.com/assets/og-reviews.jpg",
            "@id": "https://aztecatowing.com",
            url: "https://aztecatowing.com",
            telephone: "+15129452314",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Austin, TX",
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "50",
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-yellow-50 text-black py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {language === "en"
            ? "Azteca Towing takes pride in going the extra mile. But don’t take our word for it — hear what real customers have to say."
            : "Azteca Towing se enorgullece en ir más allá. Pero no lo decimos nosotros — escúchalo de nuestros clientes."}
        </p>
      </section>

      {/* Review Logos */}
      <section className="bg-white py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
          <a
            href="https://www.google.com/search?client=safari&sca_esv=887594e9c4892239&rls=en&biw=1920&bih=1093&sxsrf=AHTn8zqUP3Q_75j_9AZ6Oen3HMUNPbIeqA:1744158446260&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kzeq69t4acbC3lhw2SPVDniQKibq934qh0PnqI_SaCtwClnX2xByHIydu20Vjfe7roOK_ZDY4J_I3IFgxxsmBenttaaUF&q=Azteca+Towing+Reviews&sa=X&ved=2ahUKEwjU8vvE2MmMAxVSJNAFHY88J-EQ0bkNegQIKhAC"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/google-review-logo.jpeg"
              alt={language === "en" ? "Google Reviews" : "Opiniones en Google"}
              className="w-32 h-32 hover:scale-110 transition-transform duration-300"
            />
          </a>
          <a
            href="https://www.yelp.com/biz/azteca-towing-austin-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/yelp-review-logo.jpeg"
              alt={language === "en" ? "Yelp Reviews" : "Opiniones en Yelp"}
              className="w-32 h-32 hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-white text-black pb-20 px-4 md:px-8">
        <div className="max-h-[500px] overflow-y-auto space-y-6 px-2 md:px-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <p className="font-semibold text-yellow-600 mb-2 text-lg">
                {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
              </p>
              <p className="text-gray-800 italic">"{review.text}"</p>
              <p className="mt-2 font-semibold text-sm text-gray-600">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Review CTA Buttons */}
      <section className="bg-black text-white py-12 text-center px-4">
        <h3 className="text-2xl font-bold mb-3">{cta}</h3>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          <a
            href="https://www.google.com/search?client=safari&sca_esv=887594e9c4892239&rls=en&biw=1920&bih=1093&sxsrf=AHTn8zqUP3Q_75j_9AZ6Oen3HMUNPbIeqA:1744158446260&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kzeq69t4acbC3lhw2SPVDniQKibq934qh0PnqI_SaCtwClnX2xByHIydu20Vjfe7roOK_ZDY4J_I3IFgxxsmBenttaaUF&q=Azteca+Towing+Reviews&sa=X&ved=2ahUKEwjU8vvE2MmMAxVSJNAFHY88J-EQ0bkNegQIKhAC"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Leave a Review on Google" : "Deja una Opinión en Google"}
          </a>
          <a
            href="https://www.yelp.com/biz/azteca-towing-austin-3"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            {language === "en" ? "Leave a Review on Yelp" : "Deja una Opinión en Yelp"}
          </a>
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