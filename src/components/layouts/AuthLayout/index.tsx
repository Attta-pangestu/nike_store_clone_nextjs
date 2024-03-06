import React from "react";
import Background from "@/components/UI/Background";
import style from "./index.module.scss";
import Link from "next/link";

type PropTypes = {
  children: React.ReactNode;
  linkHref: string;
  linkTitle: string;
  title: string;
};

const AuthLayout = (props: PropTypes) => {
  const { children, linkHref, linkTitle, title } = props;
  return (
    <section className={style.wrapper}>
      <Background />
      <div className={style.layoutAuth}>
        <h1 className={style.layoutAuth_title}>{title}</h1>
        <div className={style.layoutAuth_form}>{children}</div>
        <div>
          <p>
            {linkTitle} <Link href={linkHref}>disini</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
