import AxiosInstance from "./AxiosInstance";

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
