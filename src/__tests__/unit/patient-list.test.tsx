import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { PatientsList } from "../../pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../../hooks/usePatients", () => ({
  usePatients: () => ({
    patients: [
      {
        name: "Paciente  1",
        age: 30,
        email: "paciente1@email.com",
        phone: "123456789",
        adress: "Rua  1, Nº  123",
      },
      {
        name: "Paciente  2",
        age: 25,
        email: "paciente2@email.com",
        phone: "987654321",
        adress: "Rua  2, Nº  456",
      },
    ],
  }),
}));

describe("PatientsList Component", () => {
  it("should render a list of patients", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PatientsList />
      </BrowserRouter>
    </QueryClientProvider>,
    );
    expect(screen.getByText("Sua lista de pacientes")).toBeInTheDocument();
    const patientsTable = screen.getByTestId("patients-table");
    expect(patientsTable).toBeInTheDocument();
  });
});
