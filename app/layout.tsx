import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, VT323, Source_Code_Pro, Newsreader } from "next/font/google"; // Added VT323 and Newsreader
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  title: "Guru Vyas",
  description: "Portfolio of Guru Vyas",
  icons: {
    icon: "/favicon-v2.png",
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${tasa.variable} ${robotFlex.variable} ${oswald.variable} ${oxygen.variable} ${inter.variable} ${newsreader.variable} ${geistMono.variable} ${fredericka.variable} ${croissant.variable} ${vt323.variable} ${sourceCodePro.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
