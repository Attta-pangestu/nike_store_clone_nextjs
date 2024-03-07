import axiosInstance from "../../lib/axios/instance";

const authServices = {
  registerAuth: (data: any) => axiosInstance.post("/api/user/register", data),
  dumRegister: (data: any) =>
    axiosInstance.post("/api/user/dum-register", data),
};

export default authServices;
