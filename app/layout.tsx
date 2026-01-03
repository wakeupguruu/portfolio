import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, VT323, Source_Code_Pro, Newsreader, Caveat } from "next/font/google"; // Added VT323 and Newsreader
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

const fredericka = localFont({
  src: "../public/fonts/FrederickatheGreat-Regular.ttf",
  variable: "--font-fredericka",
  display: "swap",
});

const croissant = localFont({
  src: "../public/fonts/CroissantOne-Regular.ttf",
  variable: "--font-croissant",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"]
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  display: "swap",
});

const tasa = localFont({
  src: "../public/fonts/tasa/TASAExplorer-VariableFont_wght.ttf",
  variable: "--font-tasa",
  display: "swap",
});

const robotFlex = localFont({
  src: "../public/fonts/roboto/RobotoFlex.ttf",
  variable: "--font-robot",
  display: "swap",
});

const oswald = localFont({
  src: "../public/fonts/oswald/Oswald-VariableFont_wght.ttf",
  variable: "--font-oswald",
  display: "swap",
});

const oxygen = localFont({
  src: "../public/fonts/oxygen-mono/OxygenMono-Regular.ttf",
  variable: "--font-oxygen",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guruvyas.vercel.app"),
  title: {
    default: "Guru Vyas | Software Engineer",
    template: "%s | Guru Vyas",
  },

  icons: {
    icon: "/favicon.png",
  },

  description:
    "Portfolio of Guru Vyas, a software engineer building performant web systems, scalable backends, and thoughtful user interfaces. Experience in React, Next.js, Node.js, open source, and system design.",

  keywords: [
    "Software Engineer",
    "Web Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Backend Development",
    "System Design",
    "Open Source Contributor",
    "Performance Optimization",
    "Web Architecture",
    "Guru Vyas",
  ],

  authors: [{ name: "Guru Vyas" }],
  creator: "Guru Vyas",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://guruvyas.vercel.app",
    title: "Guru Vyas | Software Engineer",
    description:
      "Software engineer focused on building scalable web systems, clean architectures, and high-quality user experiences. Open source contributor with hands-on backend and frontend experience.",
    siteName: "Guru Vyas",
  },

  twitter: {
    card: "summary_large_image",
    title: "Guru Vyas | Software Engineer",
    description:
      "Building scalable web systems, clean architectures, and thoughtful user experiences.",
    creator: "@guruvyas", // CHANGE if/when you actually use Twitter/X
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "e6dNfCtg6hfE7BTEAe6l9j4934x6OisIYFr6wKjOso4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${tasa.variable} ${robotFlex.variable} ${oswald.variable} ${oxygen.variable} ${inter.variable} ${newsreader.variable} ${geistMono.variable} ${fredericka.variable} ${croissant.variable} ${vt323.variable} ${sourceCodePro.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
