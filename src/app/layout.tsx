import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { getServerSession } from "next-auth";
import Provider from "@/providers/Provider";
import { AuthOptions } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Buxa.ai",
  description: "AI writing assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(AuthOptions);

  return (
    <html lang="en">
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js"></Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider session={session}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
