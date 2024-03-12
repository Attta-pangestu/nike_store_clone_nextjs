import React, { useEffect } from "react";
import DashboardUsersView from "@/components/views/admin/Users";
import { userServices } from "@/services/fetching";

// type
import { UserData } from "@/types/type";

const AdminUserPage = ({ usersData }: { usersData: UserData[] }) => {
  // const [userData, setUserData] = React.useState<any>([]);
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const { data } = await userServices.getAllUserData();
  //     setUserData(data.data);
  //   };
  //   getUserData();
  // }, []);
  return (
    <>
      <DashboardUsersView usersData={usersData} />
    </>
  );
};

export default AdminUserPage;

export async function getServerSideProps() {
  const { data } = await userServices.getAllUserData();
  console.log(data);
  return {
    props: {
      usersData: data.data,
    },
  };
}
