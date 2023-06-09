import { Navigate, Outlet, useNavigate } from "react-router-dom";

// https://stackoverflow.com/a/69592617/6132438

const ProtectedRoute = ({ user }: { user: string }) => {
  return user == null ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
