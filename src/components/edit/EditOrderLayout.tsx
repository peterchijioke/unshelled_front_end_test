import React from "react";
import "./edit_order.css";
import { OrderInterface } from "../../type";

export default function EditOrderLayout({ ...props }) {
  const item: OrderInterface = props.item;
  return (
    <div className="order-layout-wrapper">
      <div className="card-order">
        <h1>Order Details Edit</h1>

        <input
          value={item.price}
          placeholder="price"
          className="edit-order-input"
          type="text"
        />
        <input
          value={item.product_category}
          placeholder="Category"
          className="edit-order-input"
          type="text"
        />
        <input
          value={item.date}
          placeholder="Date"
          className="edit-order-input"
          type="date"
        />

        <input className="save-btn" type="submit" value="Save " />
      </div>
    </div>
  );
}
