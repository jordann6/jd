import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./site.css";
import { BrandSprite } from "@/components/home/Brand";
import { SiteFooter, SiteHeader } from "@/components/home/Chrome";

// Self-hosted at build time, so the site serves its own fonts off CloudFront
// instead of a render-blocking third-party stylesheet.
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-body",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jordandesigns.io"),
  title: "jordandesigns.io · Jordan, Multi-Cloud Engineer",
  description:
    "Jordan, Multi-Cloud Engineer. Secure, well-organized cloud environments on AWS, Azure, and Google Cloud. Open to full-time roles and contract (1099) engagements.",
  openGraph: {
    title: "jordandesigns.io · Jordan, Multi-Cloud Engineer",
    description:
      "Secure, well-organized cloud environments on AWS, Azure, and Google Cloud. Open to full-time and contract (1099).",
    url: "https://jordandesigns.io",
    siteName: "jordandesigns.io",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jordan, Multi-Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jordandesigns.io · Jordan, Multi-Cloud Engineer",
    description:
      "Secure, well-organized cloud environments on AWS, Azure, and Google Cloud.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <BrandSprite />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
