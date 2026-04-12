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
    default: "Planazo - Encuentra planes y gente con tus mismos gustos",
    template: "%s",
  },
  description: "Encuentra planes y amigos con tus mismos gustos. Deporte, cultura, videojuegos, quedadas y lo que se te ocurra. Crea el tuyo o únete en segundos.",
  openGraph: {
    title: "Planazo - Encuentra planes y amigos con los mismos gustos",
    description: "Encuentra planes y amigos con tus mismos gustos. Deporte, cultura, videojuegos, quedadas y lo que se te ocurra. Crea el tuyo o únete en segundos.",
    url: "https://getplanazo.es",
    siteName: "Planazo",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planazo - Planes y amigos con tus mismos gustos"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Planazo - Planes y amigos con tus mismos gustos",
    description: "Encuentra planes y amigos con tus mismos gustos. Deporte, cultura, videojuegos, quedadas y lo que se te ocurra. Crea el tuyo o únete en segundos.",
    images: ["/og-image.png"]
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
