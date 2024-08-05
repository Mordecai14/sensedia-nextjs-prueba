import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DropDownPaginate } from "../components/Dropdowns/dropdownPaginate";

describe("DropDownPaginate Component", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  test("displays the current page", () => {
    render(
      <DropDownPaginate pages={10} currentPage={3} callback={mockCallback} />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("displays the correct number of pages in dropdown", async () => {
    render(
      <DropDownPaginate pages={5} currentPage={1} callback={mockCallback} />
    );

    fireEvent.click(screen.getByText("1"));

    await waitFor(() => {
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument();
      }
    });
  });

  test("calls callback with correct page number when a new page is selected", async () => {
    render(
      <DropDownPaginate pages={5} currentPage={1} callback={mockCallback} />
    );

    fireEvent.click(screen.getByText("1"));

    await waitFor(() => {
      fireEvent.click(screen.getByText("3"));
    });

    expect(mockCallback).toHaveBeenCalledWith(3);
  });
});
