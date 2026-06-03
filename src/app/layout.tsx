import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Twenty1Global Trading LLC — Commodities Trading",
  description:
    "Twenty1Global Trading LLC — premier commodities trading firm operating across UAE, Singapore, and Switzerland. Raw data. Proven track record. Industrial-grade execution.",
  keywords: [
    "commodities trading",
    "Twenty1Global",
    "UAE trading",
    "Singapore trading",
    "Switzerland trading",
    "global commodities",
    "industrial trading",
  ],
  authors: [{ name: "Twenty1Global Trading LLC" }],
  openGraph: {
    title: "Twenty1Global Trading LLC",
    description:
      "Premier commodities trading firm. UAE · Singapore · Switzerland.",
    type: "website",
    locale: "en_US",
    siteName: "Twenty1Global Trading LLC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
