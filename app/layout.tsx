import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Nutrigetic | Clinical Performance & Human Nutrition",
  description:
    "Nutrigetic creates next-generation performance coaching and human nutrition programs using advanced bio-telemetry and cellular absorption technologies.",
  openGraph: {
    title: "Nutrigetic | Performance & Longevity, Reinvented.",
    description: "Advanced cellular nutrition and clinical performance for elite athletes and longevity.",
    siteName: "Nutrigetic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
