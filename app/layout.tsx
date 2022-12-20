import "./globals.css"; // These styles apply to every route in the application
import Head from "./head";
import { Inter } from "@next/font/google";
const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"], // [normal, bold]
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <Head />
      <body>{children}</body>
    </html>
  );
}
