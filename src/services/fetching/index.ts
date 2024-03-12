import axiosInstance from "../../lib/axios/instance";
import { UserData } from "@/types/type";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const authServices = {
  registerAuth: (data: any) =>
    axiosInstance.post(`${baseUrl}/api/user/register`, data),
};

export const userServices = {
  getAllUserData: () => axiosInstance.get(`${baseUrl}/api/user`),
  updateUserData: (id: string, data: UserData) =>
    axiosInstance.put(`${baseUrl}/api/user`, { id, data }),
  deleteUserData: (id: string) =>
    axiosInstance.delete(`${baseUrl}/api/user/${id}`),
};
