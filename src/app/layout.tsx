import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mostra o título da página e | devstore, se não houver título configurado na página mostra devstore
export const metadata: Metadata = {
  title: {
    template: "%s | devstore",
    default: "devstore",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-50 antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
