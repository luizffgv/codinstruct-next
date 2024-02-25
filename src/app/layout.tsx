import type { Metadata } from "next";
import { Exo_2, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";

const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });
const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  title: "codinStruct",
  description: "Aprenda sobre programação aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={[exo2.variable, shareTechMono.variable, styles.html].join(" ")}
      lang="pt-BR"
    >
      <head>
        {/* Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#8c6df9"
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="codinStruct" />
        <meta name="application-name" content="codinStruct" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="theme-color" content="#232136" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className={styles.body}>
        <Navbar></Navbar>
        <div className={styles.children}>{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
