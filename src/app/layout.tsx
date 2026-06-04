import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twenty1Global Trading LLC",
  description:
    "A dynamic international trading company specialising in the sourcing and delivery of high-quality commodities — with reliability, precision, and strategic depth.",
  keywords: [
    "commodity trading",
    "asset investment",
    "FMCG distribution",
    "downstream oil",
    "global logistics",
    "Twenty1Global",
    "UAE trading",
    "Singapore trading",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Twenty1Global Trading LLC",
    description:
      "Global commodity trading and asset investment company operating across UAE, Singapore, and Switzerland.",
    type: "website",
    locale: "en_US",
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
      className={`${dmSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-cream)] text-[var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
