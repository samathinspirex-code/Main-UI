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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8YPD21512T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8YPD21512T');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '686307467223277');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          {/* The image fallback belongs in the body for valid HTML. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=686307467223277&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <WhatsAppButton />
        <SiteAssistant />
      </body>
    </html>
  );
}
