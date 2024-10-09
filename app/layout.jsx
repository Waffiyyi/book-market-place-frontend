import localFont from "next/font/local";
import "./globals.css";
import {Inter} from "next/font/google";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import store from "@/app/redux/store";
import ClientProvider from "@/app/ClientProvider";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Navbar/>
    <ClientProvider>{children}</ClientProvider>
    <Footer/>
    </body>
    </html>
  );
}
