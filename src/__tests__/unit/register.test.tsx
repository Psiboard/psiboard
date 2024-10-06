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

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

const fillForm = async () => {
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
};

describe("Register Component", () => {
  it("should be call signUp method", async () => {
    renderComponent();
    await fillForm();

    await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith({
        name: "Usuário de teste",
        email: "teste@teste.com",
        password: "teste123",
        contact: "987654321",
        role: "PROFESSIONAL",
      });
    });
  });

  it("should not call signUp with empty inputs", async () => {
    renderComponent();

    // Submete o formulário sem preencher os campos
    await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(signUpMock).not.toHaveBeenCalled();
    });
  });

  // Teste de acessibilidade
  // it("should be accessible with proper labels and aria attributes", () => {
  //   renderComponent();

  //   // Verifica se os campos possuem os labels corretos
  //   expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Email")).toBeInTheDocument();
  // });

  // it("should show server error message when sign up fails", async () => {
  //   // Simula uma falha na criação
  //   signUpMock.mockRejectedValueOnce(new Error("Email já cadastrado"));

  //   renderComponent();

  //   await fillForm();
  //   await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText("Email já cadastrado")).toBeInTheDocument();
  //   });
  // });

  it("should redirect after successful sign up", async () => {
    signUpMock.mockResolvedValueOnce({});

    renderComponent();

    await fillForm();

    await userEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
