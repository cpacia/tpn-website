import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://texasphilanthropynetwork.org";

export const metadata: Metadata = {
  title: {
    default: "Texas Philanthropy Network",
    template: "%s | Texas Philanthropy Network",
  },
  description:
    "A collaborative alliance committed to addressing Texas's most pressing social challenges.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Texas Philanthropy Network",
    description:
      "A collaborative alliance committed to addressing Texas's most pressing social challenges.",
    url: siteUrl,
    siteName: "Texas Philanthropy Network",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Texas Philanthropy Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texas Philanthropy Network",
    description:
      "A collaborative alliance committed to addressing Texas's most pressing social challenges.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-navy bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}
