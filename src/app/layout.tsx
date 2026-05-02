import type { Metadata } from "next";
import { Alata } from "next/font/google";
import "./globals.css";

const alata = Alata({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SimKron Technologies — Prelucrări CNC & Automatizări Brașov",
  description:
    "SimKron Technologies SRL — Soluții industriale integrate: prelucrări mecanice CNC, automatizări, proiectare industrială și sudură. Brașov, România.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={alata.className}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
