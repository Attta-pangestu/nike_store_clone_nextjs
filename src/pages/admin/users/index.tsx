import React, { useEffect } from "react";
import DashboardUsersView from "@/components/views/admin/Users";
import { userServices } from "@/services/fetching";

// type
import { UserData } from "@/types/type";
import { getSession, useSession } from "next-auth/react";

// const data: any = {
//   status: true,
//   statusCode: 200,
//   message: "success get user",
//   data: [
//     {
//       id: "0ogk7wZOwD33nlgfAHI9",
//       created_at: {
//         nanoseconds: 240000000,
//         seconds: 1710347158,
//       },
//       role: "admin",
//       email: "nike@gmail.com",
//       name: "Nike",
//       image: "https://avatar.iran.liara.run/public/7",
//     },
//     {
//       id: "iOPsSbxHg0XMMlOzPr6p",
//       name: "nike",
//       image: "https://avatar.iran.liara.run/public/52",
//       created_at: {
//         seconds: 1710347534,
//         nanoseconds: 710000000,
//       },
//       email: "nike1@gmail.com",
//       role: "user",
//     },
//     {
//       id: "suLEDWGPh9oTkjBHksXS",
//       role: "admin",
//       created_at: {
//         seconds: 1709724456,
//         nanoseconds: 198000000,
//       },
//       email: "atha@gmail.com",
//       name: "Atha Rizki Pangestu",
//       image: "https://avatar.iran.liara.run/public/1",
//     },
//     {
//       id: "y3v775ZGEXSJsY9xJeJS",
//       email: "nike2@gmail.com",
//       created_at: {
//         seconds: 1710347554,
//         nanoseconds: 362000000,
//       },
//       name: "nike",
//       role: "user",
//       image: "https://avatar.iran.liara.run/public/79",
//     },
//   ],
// };

const AdminUserPage = () => {
  const { data: userSession }: any = useSession();
  const session = userSession?.user;
  const [userData, setUserData] = React.useState<any>([]);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await userServices.getAllUserData(session?.accessToken);
      setUserData(data.data);
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userData.length > 0 && (
        <DashboardUsersView usersData={userData} session={session} />
      )}
    </>
  );
};

export default AdminUserPage;
