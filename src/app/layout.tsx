import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Providers from "./providers";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "Toringo India",
  description: "All building materials & services",
};

const geistsans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistmono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistsans.variable} ${geistmono.variable}`}>
        <Providers>
          <Header />
          <main className="pt-2 pb-20">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}