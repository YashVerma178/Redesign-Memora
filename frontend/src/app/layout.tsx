import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Memora — Cognitive Companion for North East India",
  description:
    "An offline-first, local-language cognitive-stimulation and memory-companion platform for elderly people in North Eastern India.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/6DE0315E-FC3B-4C8D-BE04-76F73846572E.png",
    apple: "/icons/6DE0315E-FC3B-4C8D-BE04-76F73846572E.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2F6F6B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming up to 500% for accessibility
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
