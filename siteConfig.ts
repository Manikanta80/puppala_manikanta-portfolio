// Site metadata and SEO configuration for Aqua Flow 3.0 portfolio
export const siteConfig = {
  title: "Puppala Manikanta - Data Analyst | Liquid Glass Portfolio",
  description: "Ultra-immersive liquid-glass portfolio for Puppala Manikanta, Data Analyst with expertise in AI, SQL, and data operations. Experience at Wipro with Google Ads review team.",
  og: {
    title: "Puppala Manikanta - Data Analyst | Liquid Glass Portfolio",
    description: "Ultra-immersive liquid-glass portfolio for Puppala Manikanta, Data Analyst with expertise in AI, SQL, and data operations.",
    url: "https://puppala-manikanta.vercel.app",
    images: [
      "https://puppala-manikanta.vercel.app/hero.jpg"
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Puppala Manikanta - Data Analyst | Liquid Glass Portfolio",
    description: "Ultra-immersive liquid-glass portfolio for Puppala Manikanta, Data Analyst with expertise in AI, SQL, and data operations.",
    creator: "@puppala_manikanta",
    images: ["https://puppala-manikanta.vercel.app/hero.jpg"]
  },
  canonical: "https://puppala-manikanta.vercel.app",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Puppala Manikanta",
    url: "https://puppala-manikanta.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/puppala-manikanta/",
      "https://github.com/Manikanta80",
      "mailto:manipuppala9985@gmail.com"
    ],
    jobTitle: "Data Analyst · Data Operations & Applied AI",
    image: "https://puppala-manikanta.vercel.app/hero.jpg",
    description: "Computer Science graduate and data operations professional with 18 months of experience at Wipro, combining analytical thinking, data quality engineering and applied AI projects.",
  },
  sitemap: [
    "https://puppala-manikanta.vercel.app/",
    "https://puppala-manikanta.vercel.app/projects",
    "https://puppala-manikanta.vercel.app/experience",
    "https://puppala-manikanta.vercel.app/skills",
    "https://puppala-manikanta.vercel.app/contact"
  ],
  robots: {
    index: true,
    follow: true,
    sitemap: "https://puppala-manikanta.vercel.app/sitemap.xml",
    noarchive: false
  },
  favicon: "favicon.ico",
  themeColor: "#00D9FF"
}