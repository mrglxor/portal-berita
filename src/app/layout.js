import localFont from "next/font/local";
import "./globals.css";
import { initializeCron } from "../../lib/articlesCron";

const expletusSans = localFont({
  src: "./fonts/ExpletusSans.ttf",
  variable: "--font-expletus-sans",
  weight: "400 500 600 700",
});

export const metadata = {
  title: "Portal Berita",
  description: "Magang Mandiri di PT.Winnicode Garuda Teknologi",
};

export default function RootLayout({ children }) {
  if (typeof window === "undefined") {
    initializeCron();
  }

  return (
    <html lang="en">
      <body
        className={`${expletusSans.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
