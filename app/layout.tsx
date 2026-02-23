import type { Metadata } from "next";
import { Space_Grotesk, Bagel_Fat_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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
  title: "Planazo",
  description: "Planes sencillos, gente cercana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="planazo">
      <body className={`${spaceGrotesk.variable} ${bagelFatOne.variable} antialiased`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}