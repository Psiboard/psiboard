import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Patients } from "../../pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

describe("Patients component", () => {
  it("should be render Patients component", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Patients />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Cadastre o seu paciente")).toBeInTheDocument();
  });
});
