import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Sidebar from "./sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import * as useWindowSize from "../../hooks/useWindowSize";

// Mock do hook de WindowSize
vi.mock("../../../hooks/useWindowSize", () => ({
  default: () => ({ width: 1025 }),
}));

const useWindowSizeSpy = vi.spyOn(useWindowSize, "default");

describe("Sidebar Component", () => {
  const queryClient = new QueryClient();

  it("should be render correctly Sidebar component in width greater than 1024", async () => {
    useWindowSizeSpy.mockReturnValue({ width: 1025 });
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId("logo")).toBeInTheDocument();
    });
  });

  it("should be render correctly Sidebar component in width less than 1024", async () => {
    useWindowSizeSpy.mockReturnValue({ width: 1000 });
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId("logo")).toBeInTheDocument();
    });
  });

  it("should be render Menu Items", async () => {
    useWindowSizeSpy.mockReturnValue({ width: 1025 });
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId("menu-items")).toBeInTheDocument();
    });
  });
});
