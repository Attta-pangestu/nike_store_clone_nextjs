import React, { useEffect } from "react";
import DashboardUsersView from "@/components/views/admin/Users";
import { userServices } from "@/services/fetching";

const AdminUserPage = ({ userData }: { userData: any }) => {
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
      <DashboardUsersView usersData={userData} />
    </>
  );
};

export default AdminUserPage;

export async function getServerSideProps() {
  const { data } = await userServices.getAllUserData();
  console.log(data);
  return {
    props: {
      userData: data.data,
    },
  };
}
