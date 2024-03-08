import { addData, userExisted } from "@/lib/firebase/service";
import bcrypt from "bcryptjs";
export type UserData = {
  email: string;
  password: string;
  name: string;
  role: string;
  image: string;
  created_at: Date;
};

export const signUp = async (userData: UserData, callback: Function) => {
  if ((await userExisted(userData.email)).length > 0) callback(false);
  else {
    if (!userData.role) userData.role = "user";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.image = `https://avatar.iran.liara.run/public/${
      Math.floor(Math.random() * 100) + 1
    }`;
    userData.created_at = new Date();
    console.log(userData);

    await addData("users", userData, callback);
  }
};

export const signIn = async (email: string) => {
  const existedUser = await userExisted(email);
  if (existedUser.length === 0) return null;
  const user = existedUser[0];
  return user;
};

export const loginWithGoogle = async (userData: UserData) => {
  // TODO: Implement login with google
  const existedUser = await userExisted(userData.email);
  if (existedUser.length > 0) return existedUser[0];
  else {
    // create new user
    userData.name = userData.email.split("@")[0];
    userData.role = "user";
    userData.image = `https://avatar.iran.liara.run/public/${
      Math.floor(Math.random() * 100) + 1
    }`;
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    console.log(userData);

    try {
      await addData("users", userData, (success: boolean) => {
        if (!success) console.log("Gagal Menambahkan Data Di ADD DATA GOOGLE");
      });
      return userData;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};

export const saveToLocalStorage = (session: any) => {
  localStorage.setItem("nike-store-clone-app-user", JSON.stringify(session));
};

export const getFromLocalStorage = () => {
  return JSON.parse(
    localStorage.getItem("nike-store-clone-app-user") as string
  );
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("nike-store-clone-app-user");
};
