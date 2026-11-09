import { site } from "@/content/site";

const DAYS = {
  weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  saturday: ["Saturday"],
};

const sameAs = Object.values(site.socials).filter((url): url is string => url !== null);

export const ORG_ID = `${site.url}/#organization`;

export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Organization + LocalBusiness schema for the whole site. */
export function JsonLd() {
  const org = ORG_ID;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/brand-logo.png`,
        email: site.email,
        foundingDate: String(site.founded),
        slogan: site.tagline,
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        parentOrganization: { "@id": org },
        name: site.name,
        description: site.description,
        url: site.url,
        image: `${site.url}/brand/brand-logo.png`,
        email: site.email,
        ...(site.phone && { telephone: site.phone }),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: DAYS.weekdays,
            opens: "09:00",
            closes: "20:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: DAYS.saturday,
            opens: "09:00",
            closes: "15:00",
          },
        ],
      },
    ],
  };

  return <JsonLdScript data={data} />;
}
