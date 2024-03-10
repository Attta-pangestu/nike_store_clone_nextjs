import React from "react";
import style from "./index.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/UI/Base/Button";

const DashboardUsersView = ({ usersData }: { usersData: any }) => {
  return (
    <AdminLayout>
      <div className={style.users_header}>
        <i className="bx bxs-user"></i>
        <h1>Dashboard Users Control</h1>
      </div>
      <table className={style.users_table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Role</th>
            <th>User Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.image}</td>
              <td>{user.role}</td>
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
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default DashboardUsersView;
