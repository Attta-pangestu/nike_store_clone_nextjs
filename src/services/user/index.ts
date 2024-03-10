import { retriveData } from "@/lib/firebase/service";

export const getAllUserData = async () => {
  const dataUser = await retriveData("users");
  console.log(dataUser);
  const dataUserWithoutPassword = dataUser.map((user: any) => {
    delete user.password;
    return user;
  });
  console.log(dataUserWithoutPassword);
  return dataUserWithoutPassword;
};
