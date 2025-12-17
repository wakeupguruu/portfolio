import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, VT323 } from "next/font/google"; // Added VT323
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

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guru Vyas — Developer with an aesthetic sense",
  description: "Portfolio of Guru Vyas. Developer with an aesthetic sense. Writing, work, photos, and contact.",
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
        className={`${inter.variable} ${geistMono.variable} ${fredericka.variable} ${croissant.variable} ${vt323.variable} font-sans antialiased`}
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
