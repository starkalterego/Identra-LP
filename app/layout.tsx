import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Identra — The OS That Remembers",
  description: "Secure, local-first memory for your digital life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
