import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { SiteChrome } from "@/components/site-chrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata = {
  title: "VY | Hırdavat",
  description: "Profesyonel hırdavat ve endüstriyel ekipman mağazası"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <StoreProvider>
          <SiteChrome>{children}</SiteChrome>
          <Analytics />
        </StoreProvider>
      </body>
    </html>
  );
}
