// src/app/layout.tsx (GÜNCELLENDİ)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScheduleProvider } from "./state/ScheduleProvider"; // ScheduleProvider'ı import ediyoruz

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geliştirilmiş Ders Programı Yöneticisi",
  description: "Next.js, TypeScript ve Tailwind ile geliştirilmiş ders programı uygulaması.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Tüm uygulamayı ScheduleProvider ile sarmalıyoruz */}
        <ScheduleProvider> 
          {children}
        </ScheduleProvider>
      </body>
    </html>
  );
}