import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const access_token: string | null = localStorage.getItem("token");
  return access_token == null ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
