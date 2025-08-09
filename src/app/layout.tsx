import type { Metadata } from "next";
import { Lora, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Lora font
const lora = Lora({
  variable: "--font-lora-serif",
  subsets: ["latin"],
});

// Quicksand
const quicksand = Quicksand({
  variable: "--font-quicksand-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ReactCart",
  description:
    "ReactCart – A sleek Next.js eCommerce app showcasing trendy ladies' fashion, beauty, and accessories. Built for my portfolio, this demo highlights fast performance, responsive design, and seamless checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${quicksand.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
