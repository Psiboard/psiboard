import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import About from "./about-us";

describe("About Component", () => {
  it("renders statistics correctly", () => {
    const stats = [
      { name: "Escritórios atendidos", value: "10" },
      { name: "Profissionais cadastrados", value: "10" },
      { name: "Marcações diárias", value: "10" },
      { name: "em um só lugar", value: "Agendamentos" },
    ];

    render(<About />);

    stats.forEach((stat) => {
      const statNameElement = screen.getByText(stat.name);
      expect(statNameElement).toBeInTheDocument();

      const statValueElements = screen.getAllByText(stat.value);
      statValueElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });
});
