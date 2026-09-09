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
        {/*
          Content-Security-Policy en balise meta.
          GitHub Pages ne permet pas d'en-têtes HTTP personnalisés, c'est donc
          la seule CSP possible ici. Limites connues de la variante meta :
          `frame-ancestors` y est ignoré (voir le frame-buster plus bas).

          'unsafe-inline' est requis : Next.js injecte des scripts d'hydratation
          inline, et React rend les style={{}} en attributs style inline.
          Les polices sont auto-hébergées par next/font — aucun appel à Google.
        */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "img-src 'self' data:",
            // *.formsubmit.co couvre une eventuelle redirection vers un
            // sous-domaine : sans cela la CSP bloquerait la cible du 302.
            "connect-src 'self' https://formsubmit.co https://*.formsubmit.co",
            "form-action 'self' https://formsubmit.co https://*.formsubmit.co",
            "base-uri 'self'",
            "object-src 'none'",
            "frame-src 'none'",
          ].join("; ")}
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/*
          Anti-clickjacking. X-Frame-Options et frame-ancestors exigent un
          en-tête HTTP, impossible sur GitHub Pages — on casse donc le cadre
          en JS si le site est chargé dans une iframe tierce.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(window.top!==window.self){window.top.location=window.self.location.href}}catch(e){document.documentElement.style.display='none'}})();`,
          }}
        />
      </head>
      <body className="bg-void text-white antialiased noise">
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
