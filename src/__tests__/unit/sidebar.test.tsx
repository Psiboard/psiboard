import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Sidebar from "../../components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar Component", () => {
  const queryClient = new QueryClient();

  it("should be render correctly Sidebar component", async () => {
    // Mock do hook de WindowSize
    vi.mock("../../../hooks/useWindowSize", () => ({
      default: () => ({ width: 1025 }),
    }));
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

  it.skip("should be render Sidebar component with a click in Button Menu", async () => {
    vi.mock("../../../hooks/useWindowSize", () => ({
      default: () => ({ width: 800 }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </QueryClientProvider>,
    );

      const buttonMenu = screen.getByTestId("button-mobile-menu");
      fireEvent.click(buttonMenu);

      waitFor(() => {
        expect(screen.queryByTestId("logo")).toBeInTheDocument();
      });
  });
});
