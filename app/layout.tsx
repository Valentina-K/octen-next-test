import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Suspense} from "react";
import Loader from "@/app/components/ui/loader/Loader";
import {Header} from "@/app/layouts/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Film Library",
  description: "A service for searching and for watching movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Header />
      <main className={'px-8 py-4'}>
          <Suspense fallback={<Loader />}>
              {children}
          </Suspense>
      </main>
      </body>
    </html>
  );
}
