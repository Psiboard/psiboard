import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Loading from "./loading";

describe("Loading Component", () => {
  it("renders spinner when type is 'spinner'", () => {
    render(<Loading type="spinner" />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass("animate-spin");
  });

  it("renders message when type is 'request'", () => {
    render(<Loading type="request" />);
    const messageElement = screen.getByText(/Aguarde um pouco.../i);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("animate-fade-in");
  });
});
