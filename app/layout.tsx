import type { Metadata } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick",
  display: "swap",
});

export const metadata: Metadata = {
  title: "filecoin",
  description: "the forgotten solana reference. free file hosting.",
  openGraph: {
    title: "filecoin",
    description: "the forgotten solana reference. free file hosting.",
    siteName: "filecoin",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "filecoin",
    description: "the forgotten solana reference. free file hosting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${patrickHand.variable}`}>
      <body className="min-h-screen paper-bg font-patrick">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
