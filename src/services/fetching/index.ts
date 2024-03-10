import axiosInstance from "../../lib/axios/instance";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const authServices = {
  registerAuth: (data: any) =>
    axiosInstance.post(`${baseUrl}/api/user/register`, data),
};

export const userServices = {
  getAllUserData: () => axiosInstance.get(`${baseUrl}/api/user`),
};
