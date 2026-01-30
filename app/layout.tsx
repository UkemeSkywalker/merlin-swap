import type { Metadata } from "next";
import "./globals.css";
import { SwapProvider } from "@/contexts/SwapContext";
import { WalletProvider } from "@/contexts/WalletContext";

export const metadata: Metadata = {
  title: "Merlin Swap",
  description: "A blockchain token swap interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WalletProvider>
          <SwapProvider>
            {children}
          </SwapProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
