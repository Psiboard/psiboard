import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Schedules } from "../../pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

describe("Schedule component", () => {
  it("should be render component", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Schedules />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByText("Agende o horário")).toBeInTheDocument();
  });
});
