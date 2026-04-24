import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lukmanul & Fais - Wedding Invitation",
  description: "Wedding invitation of Lukmanul Khotimah & Moh. Fais Jefri Albukhori - Jum'at, 05 Juni 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
