import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavHeader } from "@/components/layout/NavHeader";
import { DotNav } from "@/components/layout/DotNav";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twenty1Global — Swiss Trading Precision",
  description:
    "Twenty1Global Trading LLC. Global commodities trading with Swiss precision. Offices in UAE, Singapore, and Switzerland.",
  keywords: [
    "commodities trading",
    "Twenty1Global",
    "Swiss trading",
    "UAE",
    "Singapore",
  ],
  openGraph: {
    title: "Twenty1Global — Swiss Trading Precision",
    description:
      "Global commodities trading with mathematical precision. UAE. Singapore. Switzerland.",
    type: "website",
    locale: "en_US",
    siteName: "Twenty1Global Trading",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground font-light antialiased">
        <NavHeader />
        <DotNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
