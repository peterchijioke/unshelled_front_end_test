import React from "react";
import { useLocation } from "react-router-dom";
import OrderLayout from "../components/order/OrderLayout";

export default function OrderDetails() {
  const { state } = useLocation();
  const { item } = state || {};
  return <OrderLayout item={item} />;
}
