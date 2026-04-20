import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DragonBackground from "@/components/DragonBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dragon Recreation Services",
  description:
    "Professional installation of shade structures, pavillions, sports court coatings, and more. Serving Florida and surrounding areas.",
  keywords: "shade structures, pavillions, sports court coating, shade replacement, Dragon Recreation Services",
  openGraph: {
    title: "Dragon Recreation Services",
    description: "Professional outdoor structure installation and sports court coatings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <DragonBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
