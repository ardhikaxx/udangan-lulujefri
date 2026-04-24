import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import { AudioProvider } from "./context/AudioContext";

export const metadata: Metadata = {
  title: "Lulu & Jefri - Wedding Invitation",
  description: "Wedding invitation of Lukmanul Khotimah & Moh. Fais Jefri Albukhori - Jum'at, 05 Juni 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AudioProvider>
          <PageTransition>{children}</PageTransition>
        </AudioProvider>
      </body>
    </html>
  );
}
