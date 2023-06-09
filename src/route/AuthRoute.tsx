import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const access_token: string | null = localStorage.getItem("token");
  return access_token == null ? <Outlet /> : <Navigate to="/home" />;
};

export default AuthRoute;
