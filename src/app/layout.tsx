import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import { Twinkle_Star } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const twinkleStar = Twinkle_Star({ subsets: ["latin"], weight: "400" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fusion Nepal Ravintola",
  description: "Designed by Asha Gaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${twinkleStar.className} scroll-smooth`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <ThemeProviderClient>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="pt-12 md:pt-12  overflow-x-clip">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProviderClient>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          className="!top-20 !right-4 !left-auto !w-72 !max-w-[calc(100vw-32px)]"
        />
      </body>
    </html>
  );
}
