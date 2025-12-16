import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Weather App - Real-time Weather Information",
  description: "Get real-time weather information for any city in the world. Beautiful, responsive weather app with 7-day forecasts, powered by Open-Meteo API.",
  keywords: ["weather", "forecast", "temperature", "weather app", "real-time weather"],
  authors: [{ name: "Weather App" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Weather App",
  },
  openGraph: {
    title: "Weather App - Real-time Weather Information",
    description: "Get real-time weather information for any city worldwide",
    type: "website",
  },
  icons: {
    icon: "/weather-icon.svg",
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152" },
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
