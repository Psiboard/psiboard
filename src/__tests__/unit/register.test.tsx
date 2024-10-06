import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { Register } from "../../pages";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock do useCreate
const signUpMock = vi.fn();
vi.mock("../../hooks/useCreateProfessional", () => ({
  useCreateProfessional: () => ({
    createProfessional: signUpMock,
  }),
}));

describe("Register Component", () => {
  it("should be call signUp method", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Register />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const nameInput = screen.getByTestId("name");
    await userEvent.type(nameInput, "Usuário de teste");

    const emailInput = screen.getByTestId("email");
    await userEvent.type(emailInput, "teste@teste.com");

    const passwordInput = screen.getByTestId("password");
    await userEvent.type(passwordInput, "teste123");

    const contactInput = screen.getByTestId("contact");
    await userEvent.type(contactInput, "987654321");

    const roleSelect = screen.getByTestId("role");
    await userEvent.selectOptions(roleSelect, "PROFESSIONAL");

    await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalled();
    });
  });
});
