import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const data = localStorage.getItem("login_token");

  return data ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
