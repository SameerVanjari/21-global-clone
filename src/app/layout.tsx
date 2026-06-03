import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twenty1Global | Cyber-Trade Terminal",
  description:
    "The future of global commodities trading. Twenty1Global operates across UAE, Singapore, and Switzerland — delivering elite trade execution, logistics, and risk management.",
  keywords: [
    "commodities trading",
    "global trade",
    "Twenty1Global",
    "UAE trading",
    "Singapore trading",
    "Switzerland trading",
    "cyber trade",
    "retro futuristic",
  ],
  openGraph: {
    title: "Twenty1Global | Cyber-Trade Terminal",
    description:
      "The future of global commodities trading. UAE · Singapore · Switzerland.",
    type: "website",
    locale: "en_US",
    siteName: "Twenty1Global",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#06060b] text-[#e0e8ff] antialiased">
        {children}
      </body>
    </html>
  );
}
