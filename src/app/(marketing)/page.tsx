import { JsonLd } from "@/components/JsonLd";
import HomeClient from "@/components/marketing/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoralFil - Pacific & Bahamas Marine Restoration Intelligence",
  description: "AI-driven restoration for Pacific glass sponge reefs and Caribbean coral ecosystems. ReefMaker™ v2.0 empowers a resilient blue economy.",
  alternates: {
    canonical: './',
  },
};

export default function Home() {
  return (
    <main className="flex-grow bg-[#02060c] relative">
      <HomeClient />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "name": "C-Brick™ Substrates",
            "description": "3D-printed biomimetic reef structures with embedded nutrient channels.",
            "brand": {
              "@type": "Brand",
              "name": "CoralFil"
            },
            "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuC-7VNh1Dz7HPG50qXW05jsncOXKSFu5ekx1--FTHYoJ_zRiKuWzxVeYLFyeeCHlg6oWlzygogeIle-utrOBgud8WlKBgHTPdokffbIKfG1E561H7BwSQeO9_X651agp6TpQtQ8FAuIWa9R9DOTbBDxVeT3DknhKP9UXU0SgECWUlAO63D-8NLoheeqkzx0YhQAdyN75duv2cC3e_Q6YVPiss7aTpK92k4_BXUn4Zk1jIKTeTFV5eMQQL05yLRdktHCntJF0zHctz0",
            "offers": {
              "@type": "Offer",
              "price": "50.00",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://coralfill.com/#philanthropy"
            }
          },
          {
            "@type": "SoftwareApplication",
            "name": "ReefMaker™ AI",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "AI platform for designing custom reef restoration projects.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "priceValidUntil": "2025-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "84"
            }
          }
        ]
      }} />
    </main>
  );
}
