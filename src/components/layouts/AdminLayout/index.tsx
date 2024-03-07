import React from "react";
import SideBar from "@/components/fragments/Sidebar";

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
      namePage: "Profile",
      hrefPage: "/admin/profile",
      iconClass: "bx-user",
    },
  ];
  return (
    <section>
      <SideBar listMenuItem={listMenuItem} />
      {children}
    </section>
  );
};

export default AdminLayout;
