import React from "react";
import SideBar from "@/components/fragments/Sidebar";
import style from "./index.module.scss";

type PropTypes = {
  children: React.ReactNode;
};

const AdminLayout = (props: PropTypes) => {
  const { children } = props;

  const listMenuItem = [
    {
      namePage: "Home",
      hrefPage: "/",
      iconClass: "bx-home",
    },
    {
      namePage: "Dashboard",
      hrefPage: "/admin",
      iconClass: "bxs-dashboard",
    },
    {
      namePage: "Products",
      hrefPage: "/admin/products",
      iconClass: "bxs-shopping-bag-alt",
    },
    {
      namePage: "Users",
      hrefPage: "/admin/users",
      iconClass: "bx-user",
    },
  ];
  return (
    <section className={style.layout}>
      <div className={style.layout_sidebar}>
        <SideBar listMenuItem={listMenuItem} />
      </div>
      <div className={style.layout_children}>{children}</div>
    </section>
  );
};

export default AdminLayout;
