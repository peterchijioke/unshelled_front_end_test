import AxiosInstance from "./AxiosInstance";

const base_url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL_DEV
    : process.env.REACT_APP_BASE_URL_PROD;
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const getOrderList = async (page: number, limit: number) => {
  try {
    const req = await AxiosInstance.get(
      `/order_items?page=${page ?? 1}&limit=${limit ?? 15}`
    );
    return req;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { getOrderList };
