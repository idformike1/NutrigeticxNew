import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Farm Minerals | Highly Efficient Fertilizers & Feed Additives",
  description:
    "Farm Minerals creates next-generation plant nutrition using carbon-capsule technology that delivers nutrients with zero waste and zero emissions.",
  openGraph: {
    title: "Farm Minerals | Fertilizer, Reinvented.",
    description: "Carbon-capsule technology for your crops and the planet.",
    siteName: "Farm Minerals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
