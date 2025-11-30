import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Coin - The Dumbest Storage Network That Accidentally Works",
  description: "Inspired by the 3 hidden Filecoin references inside the Solana whitepaper. Real file storage on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <WalletContextProvider>
          <Navbar />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
