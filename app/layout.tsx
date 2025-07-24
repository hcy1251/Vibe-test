import type { Metadata } from "next";
import { Inter, Dancing_Script, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Store - 少女風格精品店",
  description: "探索美好生活的少女風格精品購物網站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${inter.variable} ${dancingScript.variable} ${nunito.variable} font-nunito antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
