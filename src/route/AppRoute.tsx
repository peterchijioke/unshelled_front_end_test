import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute(props: any) {
  const access_token: string | any = localStorage.getItem("token");
  return (
    <Routes>
      <Route element={<AuthRoute user={access_token} />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute user={access_token} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      {props?.children}
    </Routes>
  );
}

const ErrorPage = ({}) => (
  <div style={{ width: "100vw", height: "100vh" }}>Page not found</div>
);

export default AppRoute;
