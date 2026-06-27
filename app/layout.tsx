import type { Metadata } from "next";
import { Inter, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEBCORE — Sites web & assistants IA pour PME sénégalaises",
  description:
    "WEBCORE crée des sites web et des assistants IA qui transforment vos visiteurs en clients, 24h/24. Pensé pour les PME du Sénégal. Audit gratuit.",
  keywords: "agence web Dakar, site web Sénégal, assistant IA, chatbot WhatsApp, PME sénégal, WEBCORE",
  openGraph: {
    title: "WEBCORE — Sites web & assistants IA pour PME sénégalaises",
    description:
      "WEBCORE crée des sites web et des assistants IA qui transforment vos visiteurs en clients, 24h/24. Pensé pour les PME du Sénégal. Audit gratuit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${syne.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-void text-white antialiased noise">
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
