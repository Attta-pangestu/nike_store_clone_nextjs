import React, { useState } from "react";
import style from "./index.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/UI/Base/Button";
import Modal from "@/components/fragments/Modal";

// type
import { UserData } from "@/types/type";

// services
import { userServices } from "@/services/fetching";
import Input from "@/components/fragments/Input";
import Select from "@/components/fragments/Select";

const DashboardUsersView = ({ usersData }: { usersData: UserData[] }) => {
  const [userDataModal, setUserDataModal] = useState<UserData | undefined>();
  const [deleteUserDataModal, setDeleteUserDataModal] = useState<
    UserData | undefined
  >();
  const [updatedUsersData, setUpdatedUsersData] =
    useState<UserData[]>(usersData);

  const openModal = (data: UserData) => {
    setUserDataModal(data);
  };

  const handleUpdateUserData = async (data: UserData, id: string) => {
    console.log(data);
    const {
      data: { status },
    } = await userServices.updateUserData(id, data);
    if (status) {
      // Memperbarui data user yang diperbarui dalam state lokal
      const updatedData = updatedUsersData.map((user) =>
        user.id === id ? { ...user, ...data } : user
      );
      setUpdatedUsersData(updatedData);
      setUserDataModal(undefined);
    }
  };

  const handleDeleteUserData = async (id: string) => {
    const {
      data: { status },
    } = await userServices.deleteUserData(id);
    if (status) {
      const updatedData = updatedUsersData.filter((user) => user.id !== id);
      setUpdatedUsersData(updatedData);
      setDeleteUserDataModal(undefined);
    }
  };

  return (
    <AdminLayout>
      <div className={style.users_header}>
        <i className="bx bxs-user"></i>
        <h1>Dashboard Kontrol user</h1>
      </div>
      <table className={style.users_table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Gambar</th>
            <th>Peran</th>
            <th>Tindakan user</th>
          </tr>
        </thead>
        <tbody>
          {updatedUsersData.map((user: any) => (
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
                  <Button
                    type="secondary"
                    theme="semi"
                    onClick={() => setDeleteUserDataModal(user)}
                  >
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
          title={`Edit user ${userDataModal.name}`}
          onCloseModal={() => setUserDataModal(undefined)}
        >
          <div className={style.users_modal}>
            <Input
              type="text"
              label="Nama"
              value={userDataModal.name}
              onChange={(e) => {
                setUserDataModal({ ...userDataModal, name: e.target.value });
              }}
            />

            <Input
              type="text"
              label="Gambar"
              value={userDataModal.image}
              onChange={(e) => {
                setUserDataModal({ ...userDataModal, image: e.target.value });
              }}
            />
            <Input
              type="text"
              label="Email"
              value={userDataModal.email}
              onChange={(e) => {
                setUserDataModal({ ...userDataModal, email: e.target.value });
              }}
              disabled
            />
            <Select
              label="Role"
              options={[
                { label: "admin", value: "admin" },
                { label: "user", value: "user" },
              ]}
              value={userDataModal.role}
              onChange={(e) => {
                setUserDataModal({ ...userDataModal, role: e.target.value });
              }}
            />
          </div>
          <Button
            theme="semi"
            type="primary"
            onClick={() =>
              handleUpdateUserData(userDataModal, userDataModal.id)
            }
          >
            {" "}
            <i className="bx bx-save"></i> Perbarui
          </Button>
        </Modal>
      )}

      {deleteUserDataModal && Object.keys(deleteUserDataModal).length > 0 && (
        <Modal
          title={`Delete user ${deleteUserDataModal.name}`}
          onCloseModal={() => setDeleteUserDataModal(undefined)}
        >
          <p>
            Apakah anda yakin ingin menghapus user {deleteUserDataModal.name}?
          </p>
          <Button
            theme="semi"
            type="primary"
            onClick={() => handleDeleteUserData(deleteUserDataModal.id)}
          >
            {" "}
            <i className="bx bx-save"></i> Hapus
          </Button>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default DashboardUsersView;
