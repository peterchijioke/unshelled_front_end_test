import { LoginData } from "../type";
import AxiosInstance from "./AxiosInstance";

const getOrderList = async (page: number | null, limit: number | null) => {
  try {
    const req = await AxiosInstance.get(
      `/order_items?page=${page ?? 1}&limit=${limit ?? 15}`
    );
    return req;
  } catch (error: any) {
    console.log(error.message);
  }
};

const loginService = async (data: LoginData) => {
  try {
    const res = await AxiosInstance.post(`/login`, data);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { getOrderList, loginService };
