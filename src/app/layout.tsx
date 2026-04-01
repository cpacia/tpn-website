import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Texas Philanthropy Network",
  description:
    "A collaborative alliance committed to addressing Texas's most pressing social challenges.",
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
