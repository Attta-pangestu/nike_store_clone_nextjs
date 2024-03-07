import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/fragments/Navbar";
import SessionCheck from "@/services/checkSession";
import Head from "next/head";
import { useRouter } from "next/router";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const disableNavbarPath = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const pathname = useRouter().pathname.split("/")[1];
  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        {!disableNavbarPath.includes(pathname) && (
          <SessionCheck>
            <Navbar session={session} />
          </SessionCheck>
        )}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
