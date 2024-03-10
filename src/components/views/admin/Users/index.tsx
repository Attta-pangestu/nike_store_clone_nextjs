import React from "react";
import style from "./index.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/UI/Base/Button";
import Modal from "@/components/fragments/Modal";

// type
import { UserData } from "@/types/type";

// services
import { userServices } from "@/services/fetching";

const DashboardUsersView = ({ usersData }: { usersData: UserData[] }) => {
  const [userDataModal, setUserDataModal] = React.useState<UserData>();

  const openModal = (data: UserData) => {
    setUserDataModal(data);
  };

  const handleUpdateUserData = async (data: UserData, id: string) => {
    console.log(data);
    await userServices.updateUserData(id, data);
  };

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
                  <Button
                    type="secondary"
                    theme="semi"
                    onClick={() => openModal(user)}
                  >
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

      {userDataModal && Object.keys(userDataModal).length > 0 && (
        <Modal
          title={`Edit User ${userDataModal.name}`}
          onCloseModal={setUserDataModal}
        >
          <div className={style.users_modal}>
            <h3>Name</h3>
            <input type="text" value={userDataModal.name} />
            <h3>Email</h3>
            <input type="email" value={userDataModal.email} />
            <h3>Role</h3>
            <input type="text" value={userDataModal.role} />
            <h3>Image</h3>
            <input type="text" value={userDataModal.image} />
          </div>
          <Button
            theme="semi"
            type="primary"
            onClick={() =>
              handleUpdateUserData(userDataModal, userDataModal.id)
            }
          >
            {" "}
            <i className="bx bx-save"></i> Update
          </Button>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default DashboardUsersView;
