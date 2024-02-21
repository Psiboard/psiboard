import { BrowserRouter } from "react-router-dom";
import { RouteApp } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {},
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <RouteApp />
        </AuthProvider>
        <ReactQueryDevtools buttonPosition="bottom-right" position="right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
