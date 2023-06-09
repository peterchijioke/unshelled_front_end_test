import React, { useEffect, useState } from "react";
import "./table.css";
import { getOrderList } from "../services/Services";

export default function Table() {
  const [data, setData] = useState([]);
  const getOrderdList = async () => {
    const res: Response | any = await getOrderList(1, 10);
    if (res) {
      console.log(res.data);
      setData(res.data.data);
    }
  };
  useEffect(() => {
    getOrderdList();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product Id</th>
            <th>Date</th>
            <th>Product Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderInterface) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{item.date}</td>
              <td>{item.product_category}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface OrderInterface {
  id: number;
  product_id: string;
  product_category: string;
  price: number;
  date: string;
}
