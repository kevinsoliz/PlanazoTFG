import type { Metadata } from "next";
import { Space_Grotesk, Bagel_Fat_One } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bagelFatOne = Bagel_Fat_One({
  variable: "--font-bagel-fat-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getplanazo.es"),
  title: {
    default: "Planazo",
    template: "%s | Planazo",
  },
  description: "Crea y únete a planes con personas que comparten tus intereses.",
  openGraph: {
    title: "Planazo",
    description: "Planes sencillos, gente cercana",
    url: "https://getplanazo.es",
    siteName: "Planazo",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planazo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Planazo",
    description: "Planes sencillos, gente cercana."
  }
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="planazo">
      <body
        className={`${spaceGrotesk.variable} ${bagelFatOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
