import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { PromoProvider } from "@/components/Promo";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Investir dans l’immobilier au Bénin — Le guide complet | FOGIC",
  description:
    "Le guide de Francis BABAKPIKPA (FOGIC) pour mieux préparer ton achat de terrain, tes vérifications de documents et ton investissement immobilier au Bénin, pour les résidents comme pour la diaspora.",
  openGraph: {
    title: "Investir dans l’immobilier au Bénin — Le guide complet",
    description:
      "Comprends les documents, les vérifications et les questions à poser avant d’engager ton argent dans l’immobilier au Bénin.",
    images: ["/og-image.jpg"],
    locale: "fr_BJ",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0b2545" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <PromoProvider>{children}</PromoProvider>
      </body>
    </html>
  );
}
