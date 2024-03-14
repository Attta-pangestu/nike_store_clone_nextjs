import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import SessionCheckNavbar from "@/services/checkSession";
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
        {!disableNavbarPath.includes(pathname) && <SessionCheckNavbar />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
