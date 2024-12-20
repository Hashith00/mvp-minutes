import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern SaaS Template",
  description:
    "A production-ready template for building SaaS applications with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <ClerkProvider>
        <body className={`${inter.className} h-full`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
