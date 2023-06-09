
interface LoginData {
  seller_id: string;
  seller_zip_code_prefix: number;
}

interface OrderInterface {
  id: number;
  product_id: string;
  product_category: string;
  price: number;
  date: string;
}

export type {LoginData,OrderInterface}