import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twenty1Global Trading LLC — Global Commodities, Art Deco Precision",
  description:
    "Twenty1Global Trading LLC is a premier global commodities trading firm operating across UAE, Singapore, and Switzerland. Precision refined through geometry. Luxury defined by gold.",
  keywords: [
    "commodities trading",
    "global trading",
    "UAE trading",
    "Singapore trading",
    "Switzerland trading",
    "Twenty1Global",
    "energy trading",
    "metals trading",
    "agricultural commodities",
  ],
  authors: [{ name: "Twenty1Global Trading LLC" }],
  creator: "Twenty1Global Trading LLC",
  openGraph: {
    title: "Twenty1Global Trading LLC — Global Commodities, Art Deco Precision",
    description:
      "Premier global commodities trading firm operating across UAE, Singapore, and Switzerland. Precision refined through geometry.",
    type: "website",
    locale: "en_US",
    siteName: "Twenty1Global Trading LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twenty1Global Trading LLC",
    description:
      "Premier global commodities trading firm operating across UAE, Singapore, and Switzerland.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-deep text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
