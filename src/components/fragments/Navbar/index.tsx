import React, { useEffect } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { SiNike } from "react-icons/si";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type UserPropTypes = {
  name: string;
  email: string;
  image: string;
  role: string;
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user as UserPropTypes;
  const { push } = useRouter();
  console.log(session, status);

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

  useEffect(() => {
    console.log(status, user);

    if (status !== "authenticated") {
      // Redirect logic here
      push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  return (
    <div className={style.navbar}>
      <Link href="/">
        <SiNike className={style.navbar_logo} />
      </Link>
      <nav className={style.navbar_menu}>
        <Link href="/admin">Dashboard</Link>
        <Link href="/">{status}</Link>
      </nav>

      <div className={style.navbar_auth}>
        <>{userExistComp()}</>
      </div>
    </div>
  );
};

export default Navbar;
