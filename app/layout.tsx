import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App - Real-time Weather Information",
  description: "Get real-time weather information for any city in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
