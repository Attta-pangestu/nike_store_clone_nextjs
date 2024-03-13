import axiosInstance from "../../lib/axios/instance";
import { UserData } from "@/types/type";
import { useSession } from "next-auth/react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const authServices = {
  registerAuth: (data: any) =>
    axiosInstance.post(`${baseUrl}/api/user/register`, data),
};

export const userServices = {
  getAllUserData: (token: string) => {
    console.log(token);
    return axiosInstance.get(`${baseUrl}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserData: (id: string, data: UserData, token: string) =>
    axiosInstance.put(`${baseUrl}/api/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteUserData: (id: string, token: string) =>
    axiosInstance.delete(`${baseUrl}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
