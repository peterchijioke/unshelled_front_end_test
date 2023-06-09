import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ user }: { user: string | null }) => {
  return user == null ? <Outlet /> : <Navigate to="/home" />;
};

export default AuthRoute;
