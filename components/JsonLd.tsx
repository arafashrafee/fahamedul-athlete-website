import { SITE } from "@/lib/constants";
import { NATIONAL_TEAM } from "@/data/stats";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    nationality: SITE.nationality,
    url: SITE.url,
    description: SITE.description,
    knowsAbout: ["Football", "Soccer", "Serie D"],
    memberOf: [
      {
        "@type": "SportsTeam",
        name: "Bangladesh National Football Team",
      },
      {
        "@type": "SportsTeam",
        name: "Olbia Calcio 1905",
      },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "International Caps",
        value: NATIONAL_TEAM.caps,
      },
      {
        "@type": "PropertyValue",
        name: "International Goals",
        value: NATIONAL_TEAM.goals,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
