import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import FrameHud from "@/components/FrameHud";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = {
  metadataBase: new URL("https://jordandesigns.io"),
  title: "Jordan — Multi-Cloud Engineer",
  description:
    "Jordan, Multi-Cloud Engineer. Platforms, infrastructure, and automation across AWS and Azure. Open to full-time roles and contract (1099) engagements.",
  openGraph: {
    title: "Jordan — Multi-Cloud Engineer",
    description:
      "Platforms, infrastructure, and automation across AWS and Azure. Open to full-time and contract (1099).",
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
    title: "Jordan — Multi-Cloud Engineer",
    description:
      "Platforms, infrastructure, and automation across AWS and Azure.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=Barlow:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <Cursor />
        <FrameHud />
        <Nav />
        <main>{children}</main>
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
