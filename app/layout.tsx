import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Airfare | First & Business Class Concierge",
  description:
    "Premium concierge for business and first class airline tickets. Live travel agents available 24/7 — bespoke itineraries for executives and discerning travelers worldwide.",
  keywords: [
    "business class flights",
    "first class tickets",
    "luxury travel concierge",
    "corporate airfare",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${montserrat.variable} min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-text)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
