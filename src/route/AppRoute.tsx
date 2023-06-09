import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import OrderDetails from "../pages/OrderDetails";

function AppRoute(props: any) {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      {props.children}
    </Routes>
  );
}

const ErrorPage = ({}) => (
  <div style={{ width: "100vw", height: "100vh" }}>Page not found</div>
);

export default AppRoute;
