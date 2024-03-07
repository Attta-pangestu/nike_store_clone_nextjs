import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { SiNike } from "react-icons/si";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";

type UserPropTypes = {
  name: string;
  email: string;
  image: string;
  role: string;
};

const Navbar = (props: any) => {
  const { session } = props;
  const user = session?.user as UserPropTypes;
  console.log(session);
  const { push } = useRouter();

  const userExistComp = () => {
    return (
      <>
        <Image src={user?.image} alt="avatar" width={40} height={40} />
        <button
          onClick={() => signOut()}
          className={style.navbar_auth_buttonAuth}
        >
          Log Out
        </button>
      </>
    );
  };

  return (
    <div className={style.navbar}>
      <Link href="/">
        <SiNike className={style.navbar_logo} />
      </Link>
      <nav className={style.navbar_menu}>
        <Link href="/admin">Dashboard</Link>
        <Link href="/">Home</Link>
      </nav>

      <div className={style.navbar_auth}>
        {user ? userExistComp() : <Link href="/auth/login">Login</Link>}
      </div>
    </div>
  );
};

export default Navbar;
