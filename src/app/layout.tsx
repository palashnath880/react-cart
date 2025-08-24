import type { Metadata } from "next";
import { Source_Serif_4, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shared/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

// source serif 4
const source = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

// josefin
const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactCart",
  description:
    "ReactCart – A sleek Next.js eCommerce app showcasing trendy ladies' fashion, beauty, and accessories. Built for my portfolio, this demo highlights fast performance, responsive design, and seamless checkout.",
  icons: {
    icon: "/images/color-logo.png",
    shortcut: "/images/color-logo.png",
    apple: "/images/color-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.variable} ${source.variable} antialiased`}>
        <Header />
        {children}
        <CartDrawer />
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
