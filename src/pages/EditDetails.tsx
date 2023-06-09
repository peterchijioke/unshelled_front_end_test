import React from "react";
import { useLocation } from "react-router-dom";
import OrderLayout from "../components/order/OrderLayout";
import EditOrderLayout from "../components/edit/EditOrderLayout";

export default function EditDetails() {
  const { state } = useLocation();
  const { item } = state || {};
  return <EditOrderLayout item={item} />;
}
