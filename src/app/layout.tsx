import type { Metadata } from "next";
import { geistSans, geistMono } from "@/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Where people connected through Christ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
