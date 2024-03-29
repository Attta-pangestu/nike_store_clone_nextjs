import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Button from "@/components/UI/Base/Button";

type PropTypes = {
  listMenuItem: {
    namePage: string;
    hrefPage: string;
    iconClass: string;
  }[];
};

const SideBar = (props: PropTypes) => {
  const { listMenuItem } = props;
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <>
      <div className={style.sidebar_top}>
        <i className={`bx bx-sidebar ${style.sidebar_top_icon}`}></i>
        <h1 className={style.sidebar_top_title}>Admin Panel</h1>
      </div>
      <div className={style.sidebar_menu}>
        <ul>
          {listMenuItem.map((item) => {
            return (
              <li key={item.namePage}>
                <Link
                  href={item.hrefPage}
                  className={`${style.sidebar_menu_item} ${
                    pathname === item.hrefPage
                      ? style.sidebar_menu_item_active
                      : ""
                  }`}
                >
                  <i
                    className={`bx ${item.iconClass} ${style.sidebar_icon}`}
                  ></i>
                  <span>{item.namePage}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.sidebar_footer}>
        <Button onClick={() => signOut()} type="primary" theme="light">
          <span className={style.sidebar_footer_item}>
            <i className={`bx bx-log-out ${style.sidebar_top_icon}`}></i>
            Logout
          </span>
        </Button>
      </div>
    </>
  );
};

export default SideBar;
