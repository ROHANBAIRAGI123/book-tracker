import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Tracker App",
  description: "A app to track your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
