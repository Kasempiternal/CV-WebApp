import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Izotz Cristobal Mota - Software Engineer & Computer Vision Researcher",
  description: "Portfolio of Izotz Cristobal Mota, showcasing expertise in software engineering, computer vision, Three.js, and modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
