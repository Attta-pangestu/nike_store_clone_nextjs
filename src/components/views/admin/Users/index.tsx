import React from "react";
import style from "./index.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/UI/Base/Button";

const DashboardUsersView = () => {
  return (
    <AdminLayout>
      <div className={style.users_header}>
        <i className="bx bxs-user"></i>
        <h1>Dashboard Users Control</h1>
      </div>
      <table className={style.users_table}>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Role</th>
          <th>User Action</th>
        </thead>
        <tbody>
          <tr>
            <td>Atha</td>
            <td>As</td>
            <td>ASAs</td>
            <td>ASasas</td>
            <td>
              <div className={style.users_table_action}>
                <Button type="secondary" theme="semi">
                  Edit
                </Button>
                <Button type="secondary" theme="semi">
                  Delete
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Atha</td>
            <td>As</td>
            <td>ASAs</td>
            <td>ASasas</td>
          </tr>
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default DashboardUsersView;
