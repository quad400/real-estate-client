import "@smastrom/react-rating/style.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { ModalProvider } from "@/components/providers/ModalProvider";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Navbar />
        <ModalProvider />
        <main className="w-full min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
