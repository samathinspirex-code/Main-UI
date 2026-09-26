import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteAssistant } from "@/components/layout/SiteAssistant";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const nohemi = localFont({
  src: "./fonts/Nohemi-Variable.ttf",
  variable: "--font-nohemi",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Inspire College | Your Online University",
    template: "%s | Inspire College",
  },
  description: "Sri Lanka's first tech-enabled online higher education institution.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nohemi.variable}>
      <body>
        {children}
        <WhatsAppButton />
        <SiteAssistant />
      </body>
    </html>
  );
}
