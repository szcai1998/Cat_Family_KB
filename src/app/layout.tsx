import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Cat Family Atlas",
  description: "A comprehensive knowledge base covering all wild and domestic species of the Felidae family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <nav className="glass-nav">
          <div className="nav-content">
            <a href="/" className="logo">Cat Family Atlas</a>
            <div className="links">
              <a href="/">Museum Foyer</a>
              <a href="/taxonomy">Taxonomy</a>
              <a href="/species">The Cat Family</a>
              <a href="/ecology-and-conservation">About us</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
