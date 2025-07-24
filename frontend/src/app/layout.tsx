import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Providers from "@/providers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tasks list",
  description: "Um aplicativo simples de gerenciar tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fraunces.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
