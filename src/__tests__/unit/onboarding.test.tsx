import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Onboarding } from "../../pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";

describe("Onboarding Component", () => {
  it("render page with buttons", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Onboarding />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByAltText("onboardingImage")).toBeInTheDocument();
  });
});
