import "./globals.css";
import {Inter} from "next/font/google";
import ClientProvider from "@/app/ClientProvider";

import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Error from './error/Error'
import {Suspense} from "react";
import Loading from "@/app/loading";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ClientProvider>
      <Navbar/>
      <Error />
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
    </ClientProvider>
    <Footer/>
    </body>
    </html>
  );
}
