import React, { ChangeEvent, useEffect, useState } from "react";
import "./table.css";
import { getOrderList } from "../services/Services";
import { useNavigate } from "react-router-dom";
import { OrderInterface } from "../type";
import LoadingElement from "./login/LoadingElement";

export default function Table() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(false);
  const getOrderdList = async () => {
    setProgress(!progress);
    const res: Response | any = await getOrderList();
    if (res) {
      if (res.status == 200 || res.data.data) {
        setData(res.data.data);
        setPageCount(res.data.offset);
        setProgress(!progress);
      }
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
  const handlePrev = () => {
    setPage((prev) => {
      if (prev == 1) return prev;
      return prev - 1;
    });
  };

  const handleNext = async () => {
    setProgress(!progress);
    setPage((prev) => {
      if (prev == pageCount) return prev;
      return prev + 1;
    });
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
      <button className="logout" onClick={onLogout}>
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
        {progress ? (
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
      </table>
      <div style={styles.pg}>
        <div className="btn-wrap">
          <button style={{ marginRight: "10px" }} onClick={handlePrev}>
            Previous
          </button>
          <select
            value={page}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setPage(Number(e.target.value));
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return <option key={Math.random()}>{index + 1}</option>;
              })}
          </select>
          <button disabled={page === pageCount} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pg: { width: "100%", display: "flex", justifyContent: "end" },
};
