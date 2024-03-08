import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Home() {
  const { data: session }: any = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world</h1>
      <p>{session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/register",
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // Pastikan session diteruskan sebagai properti ke komponen Home
  };
};
