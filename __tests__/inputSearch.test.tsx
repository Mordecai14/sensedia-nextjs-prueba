import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputSearch from "@/components/inputSearch";

describe("InputSearch Component", () => {
  test("renders Input component with placeholder text", () => {
    render(<InputSearch />);

    const inputElement = screen.getByPlaceholderText("Buscar");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders Image component with correct alt text", () => {
    render(<InputSearch />);

    const imageElement = screen.getByAltText("buscar");
    expect(imageElement).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(<InputSearch />);

    const inputElement = screen.getByPlaceholderText("Buscar");
    fireEvent.change(inputElement, { target: { value: "test search" } });
    expect(inputElement).toHaveValue("test search");
  });
});
