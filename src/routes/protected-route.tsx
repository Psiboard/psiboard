import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function ProtectedRoute() {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
