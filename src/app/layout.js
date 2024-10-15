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
      <head>
        <meta name="google-adsense-account" content="ca-pub-7686429509274648" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686429509274648"
          crossorigin="anonymous"
        ></script>
      </head>
      <body
        className={`${expletusSans.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
