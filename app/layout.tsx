import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight:["400","300","500","700"]
});

export const metadata: Metadata = {
  title: "FloodSight",
  description: "An AI-based app for flood detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${ubuntu.className}`}
      >
        {children}
      </body>
    </html>
  );
}
