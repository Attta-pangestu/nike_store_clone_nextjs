import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/fragments/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const disableNavbarPath = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        {!disableNavbarPath.includes(pathname.split("/")[1]) ? (
          <Navbar />
        ) : null}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
