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
  title: "WEBCORE — Digital Experiences That Dominate",
  description:
    "Agence web premium spécialisée dans la création de sites haut de gamme, UI/UX design, développement avancé et automatisation IA.",
  keywords: "agence web, design premium, développement web, UI/UX, IA, Next.js",
  openGraph: {
    title: "WEBCORE — Digital Experiences That Dominate",
    description:
      "Agence web premium spécialisée dans la création de sites haut de gamme, UI/UX design, développement avancé et automatisation IA.",
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
