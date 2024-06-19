import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FormProvider } from "./inicio/context/FormProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEDIA CIM WEB",
  description: "Publicidades mediaCIM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
