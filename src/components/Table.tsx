import React, { useEffect, useState } from "react";
import "./table.css";
import { getOrderList } from "../services/Services";
import { useNavigate } from "react-router-dom";
import { OrderInterface } from "../type";
import LoadingElement from "./login/LoadingElement";

export default function Table() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(false);
  const getOrderdList = async () => {
    setProgress(!progress);
    const res: Response | any = await getOrderList(1, 10);
    if (res) {
      setData(res.data.data);
      setProgress(!progress);
    }
  };
  useEffect(() => {
    getOrderdList();
  }, []);
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const goToDetails = (item: OrderInterface) => {
    navigate(`/order/${item.id}`, { state: { item } });
  };
  const handlePrev = () => {};
  const handleNext = () => {
    setProgress(!progress);
    const res: Response | any = await getOrderList(1, 10);
    if (res) {
      setData(res.data.data);
      setProgress(!progress);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={onLogout} style={styles.logout}>
        Logout
      </button>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product Id</th>
            <th>Date</th>
            <th>Product Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {progress && !data.length ? (
          <>
            <LoadingElement />
          </>
        ) : (
          <tbody>
            {data.map((item: OrderInterface) => (
              <tr onClick={() => goToDetails(item)}>
                <td>{item.id}</td>
                <td>{item.product_id}</td>
                <td>{item.date}</td>
                <td>{item.product_category}</td>
                <td>{item.price}</td>
                <td className="delete-btn">Delete</td>
              </tr>
            ))}
          </tbody>
        )}
        <tfoot>
          <div className="btn-wrap">
            <button onClick={handlePrev}>Previous</button>{" "}
            <button onClick={handleNext}>Next</button>
          </div>
        </tfoot>
      </table>
    </div>
  );
}

const styles = {
  logout: {
    width: 200,
    margin: "1rem",
    borderRadius: 5,
    height: 45,
    border: "none",
    background: "#ddd",
  },
};
