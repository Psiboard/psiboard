import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Card from "./card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock do hook de exclusão
const deleteScheduleMock = vi.fn();
vi.mock("../../../hooks/useDeleteSchedule", () => ({
  useDeleteSchedule: () => ({
    deleteSchedule: deleteScheduleMock,
  }),
}));

describe("Card Component", () => {
  it("renders card with correct information", () => {
    const queryClient = new QueryClient();
    const schedule = {
      scheduleId: "1",
      patientId: "2",
      hour: "10:00",
      name: "John Doe",
      date: "2024-02-25",
      phone: "123456789",
    };
    render(
      <QueryClientProvider client={queryClient}>
        <Card {...schedule} />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("hour")).toBeInTheDocument();
    expect(screen.getByTestId("date")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("phone")).toBeInTheDocument();
  });

  it("opens delete confirmation modal when delete button is clicked", async () => {
    const queryClient = new QueryClient();
    const schedule = {
      scheduleId: "1",
      patientId: "2",
      hour: "10:00",
      name: "John Doe",
      date: "2024-02-25",
      phone: "123456789",
    };
    render(
      <QueryClientProvider client={queryClient}>
        <Card {...schedule} />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByTestId("delete-icon");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId("delete-header")).toBeInTheDocument();
      expect(screen.getByText("Cancelar")).toBeInTheDocument();
      expect(screen.getByText("Deletar")).toBeInTheDocument();
    });
  });

  it("deletes schedule when delete button in confirmation modal is clicked", async () => {
    const queryClient = new QueryClient();
    const schedule = {
      scheduleId: "1",
      patientId: "2",
      hour: "10:00",
      name: "John Doe",
      date: "2024-02-25",
      phone: "123456789",
    };
    const id = schedule.scheduleId;

    render(
      <QueryClientProvider client={queryClient}>
        <Card {...schedule} />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByTestId("delete-icon");
    fireEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByText("Deletar");
    fireEvent.click(confirmDeleteButton);

    // Aguarda a função de exclusão ser chamada
    waitFor(() => {
      expect(deleteScheduleMock).toHaveBeenCalledWith({ id });
    });
  });
});
