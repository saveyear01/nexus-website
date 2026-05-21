import type { Metadata } from "next";
import { geistMono, nunito } from "@/fonts/fonts";
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
        className={`${nunito.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
