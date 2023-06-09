import React, { ChangeEvent, useEffect, useState } from "react";
import "./table.css";
import { deletOneOrder, getOrderList } from "../services/Services";
import { useNavigate } from "react-router-dom";
import { OrderInterface } from "../type";
import LoadingElement from "./login/LoadingElement";
import moment from "moment";
import { trimText } from "../utils/Trim";

export default function Table() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [limit, setLimit] = useState(0);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(false);
  const getOrderdList = async (pageC?: number) => {
    setProgress(!progress);
    const res: Response | any = await getOrderList(pageC ?? page);
    if (res) {
      if (res.status == 200 || res.data.data) {
        setData(res.data.data);
        setPageCount(res.data.offset);
        setLimit(res.data.limit);
        setProgress(!progress);
      }
    }
  };

  useEffect(() => {
    getOrderdList();
    return () => {
      setData([]);
    };
  }, [navigate]);
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
  const handleDelete = async (item: OrderInterface) => {
    try {
      const res: any = await deletOneOrder(item.id);
      if (res) {
        getOrderList();
      }
    } catch (error) {}
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
        {/* {progress ? (
          <>
            <LoadingElement />
          </>
        ) : ( */}
        <tbody>
          {data.map((item: OrderInterface) => (
            <tr>
              <td>{trimText(item.id)}</td>
              <td>{trimText(item.product_id)}</td>
              <td>{moment(item.date).format("ll")}</td>
              <td>{item.product_category}</td>
              <td>{item.price}</td>
              <td>
                <div className="btn-wrap--">
                  <input
                    onClick={() => handleDelete(item)}
                    className="delete-btn"
                    type="button"
                    value="Delete"
                  />
                  <input
                    onClick={() => goToDetails(item)}
                    className="delete-btn"
                    type="button"
                    value="View"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {/* )} */}
      </table>
      <div style={styles.pg}>
        <div className="btn-wrap">
          <button
            disabled={page == 1}
            style={{ marginRight: "10px" }}
            onClick={handlePrev}
          >
            Previous
          </button>
          <select
            value={page}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              console.log(Number(e.target.value));
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return <option key={Math.random()}>{index + 1}</option>;
              })}
          </select>
          <button
            disabled={page === pageCount || pageCount < limit}
            onClick={handleNext}
          >
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
