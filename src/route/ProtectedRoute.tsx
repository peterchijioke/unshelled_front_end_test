import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }: { user: string }) => {
  return user == null ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
