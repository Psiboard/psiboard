import { BrowserRouter } from "react-router-dom";
import { RouteApp } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <RouteApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
