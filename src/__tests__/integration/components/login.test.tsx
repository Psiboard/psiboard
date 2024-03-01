import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { Login, Dashboard } from "../../../pages";
import { AuthProvider } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Mock do useAuth
 const signInMock = vi.fn();
 vi.mock("../../../hooks/useAuth", () => ({
   useAuth: () => ({
     signIn: signInMock,
     user: { id: "user123" },
   }),
 }));

describe("Feature Login", () => {
  it("should be integrate Login Component with Dashboard Component", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Login />
            <Dashboard />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );

    // Preenchendo o campo de email
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "teste@teste.com");

    // Preenchendo o campo de senha
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "teste");

    // Submetendo o formulário
    await userEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Bem vindo/i)).toBeInTheDocument();
       expect(signInMock).toHaveBeenCalledWith({
         email: "teste@teste.com",
         password: "teste",
       });
    });
  });
});
