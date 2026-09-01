import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navdeep Sharma | Software Developer",
  description: "Portfolio of Navdeep Sharma - Software Developer specializing in Node.js, Express, MongoDB, and real-time web applications.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
