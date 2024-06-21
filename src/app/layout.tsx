import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Honest Opinion",
    default: "Honest Opinion",
  },
  description: "Honest Opinion - Where Your Opinion Stays Anonymous",
  keywords: ["Honest Opinion", "Secret Message", "Anonymous Message"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} text-pretty`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
