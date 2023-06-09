import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ user }: { user: string }) => {
  return user == null ? <Outlet /> : <Navigate to="/profile" />;
};

export default AuthRoute;
