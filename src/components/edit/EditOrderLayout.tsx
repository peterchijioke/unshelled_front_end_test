import React from "react";
import "./order.css";
import { OrderInterface } from "../../type";

export default function EditOrderLayout({ ...props }) {
  const item: OrderInterface = props.item;
  return (
    <div className="order-layout-wrapper">
      <div className="card-order">
        <h1>Order Details</h1>
        <div className="wrap-txt">
          <span> Order ID: {item.id}</span>
        </div>
        <div className="wrap-txt">
          <span> Date: {item.date}</span>
        </div>
        <div className="wrap-txt">
          <span> Product Price: {item.price}</span>
        </div>
        <div className="wrap-txt">
          <span> Product Category: {item.product_category}</span>
        </div>
        <div className="wrap-txt">
          <span> Product ID: {item.product_id}</span>
        </div>
      </div>
    </div>
  );
}
