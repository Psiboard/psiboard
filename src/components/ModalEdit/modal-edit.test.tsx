import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ModalEdit from "./modal-edit";
import { expect, describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Modal Edit Component", () => {
  const queryClient = new QueryClient();

  it("should render render modal when isOpen is true", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEdit
          isOpen={true}
          onClose={() => {}}
          hour="10"
          scheduleId="1"
          patientId="1"
          name="Nome do Paciente"
          date="2024-02-24"
          phone="99 9999-9999"
        />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Indique uma nova data")).toBeInTheDocument();
  });

  it("should not render render modal when isOpen is false", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEdit
          isOpen={false}
          onClose={() => {}}
          hour="10"
          scheduleId="1"
          patientId="1"
          name="Nome do Paciente"
          date="2024-02-24"
          phone="99 9999-9999"
        />
      </QueryClientProvider>,
    );

    expect(screen.queryByText("Indique uma nova data")).not.toBeInTheDocument();
  });

  it("should be close modal when button is pressed", () => {
    const handleClose = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEdit
          isOpen={true}
          onClose={() => {}}
          hour="10"
          scheduleId="1"
          patientId="1"
          name="Nome do Paciente"
          date="2024-02-24"
          phone="99 9999-9999"
        />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByTestId("cancel"));

    waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
