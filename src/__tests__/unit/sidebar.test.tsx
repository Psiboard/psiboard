import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Sidebar from "../../components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

// Mock do hook de WindowSize
vi.mock("../../../hooks/useWindowSize", () => ({
  default: () => ({ width: 1025 }),
}));

describe("Sidebar Component", () => {
  const queryClient = new QueryClient();

  it("should be render correctly Sidebar component", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId("logo")).toBeInTheDocument();
    });
  });

  it("should be render Menu Items", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId("menu-items")).toBeInTheDocument();
    });
  });
});
