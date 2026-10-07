import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Geist_Mono, Oswald, IM_Fell_English, Great_Vibes } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/smooth-scroll";
import { Preloader } from "@/components/layout/preloader";
import { Cursor, CursorGlow } from "@/components/layout/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The printed menu's condensed sign-painter capitals
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Old-world italic for the soft half of headings
const imFell = IM_Fell_English({
  variable: "--font-im-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Calligraphy, like "Where Friends Meet" on the menu
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Strictly Come Coffee | Coffee House & Eatery",
  description:
    "Strictly Come Coffee — a premium coffee house & eatery in Three Rivers, Vereeniging. Hand-crafted coffee, homecooked meals, sharing platters and bubble tea. Where Friends Meet.",
};

export const viewport: Viewport = {
  themeColor: "#2e1f15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} ${oswald.variable} ${imFell.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Preloader />
        <SmoothScroll>
          <CursorGlow />
          <Cursor />
          <Navbar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
