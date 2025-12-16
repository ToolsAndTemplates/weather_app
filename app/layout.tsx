import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App - Real-time Weather Information",
  description: "Get real-time weather information for any city in the world. Beautiful, responsive weather app with 7-day forecasts, powered by Open-Meteo API.",
  keywords: ["weather", "forecast", "temperature", "weather app", "real-time weather"],
  authors: [{ name: "Weather App" }],
  openGraph: {
    title: "Weather App - Real-time Weather Information",
    description: "Get real-time weather information for any city worldwide",
    type: "website",
  },
  icons: {
    icon: "/weather-icon.svg",
  },
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
