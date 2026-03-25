import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { getPayload } from "payload";
import config from "@payload-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const boska = localFont({
  src: [
    { path: "../fonts/Boska-Variable.woff2", style: "normal" },
    { path: "../fonts/Boska-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-boska",
  display: "swap",
});

const justSans = localFont({
  src: [
    { path: "../fonts/JustSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/JustSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/JustSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/JustSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/JustSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-just-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connection Experience",
  description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
  keywords: ["indicação geográfica", "produtos brasileiros", "terroir", "gastronomia", "turismo", "gramado", "evento", "connection experience", "networking"],
  authors: [{ name: "Connection Experience" }],
  openGraph: {
    title: "Connection Experience",
    description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
    type: "website",
    locale: "pt_BR",
    siteName: "Connection Experience",
    images: [
      {
        url: "/images/og-image.png",
        width: 1464,
        height: 758,
        alt: "Connection Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connection Experience",
    description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
    images: ["/images/og-image.png"],
  },
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navFooterData = null;
  try {
    const payload = await getPayload({ config });
    navFooterData = await payload.findGlobal({ slug: 'navigation-footer' });
  } catch {
    // CMS unavailable, use fallback
  }

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${boska.variable} ${justSans.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer cmsData={navFooterData} />
      </body>
    </html>
  );
}
