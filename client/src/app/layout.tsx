import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navdeep Sharma | Backend Developer",
  description: "Portfolio of Navdeep Sharma - Backend Developer specializing in Node.js, Express, MongoDB, and real-time web applications.",
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
