import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryFilterProducts } from "./CategoryFilter.products";
import { vi, describe, it, expect } from "vitest";

const mockItems = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
];

describe("CategoryFilterProducts", () => {
  it("renders the title and all category items", () => {
    render(<CategoryFilterProducts items={mockItems} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Electronics")).toBeInTheDocument();
    expect(screen.getByLabelText("Books")).toBeInTheDocument();
  });

  it("checks the selected category", () => {
    render(
      <CategoryFilterProducts items={mockItems} selected={mockItems[1]} />,
    );
    const booksCheckbox = screen.getByLabelText("Books") as HTMLInputElement;
    expect(booksCheckbox.checked).toBe(true);
    const electronicsCheckbox = screen.getByLabelText(
      "Electronics",
    ) as HTMLInputElement;
    expect(electronicsCheckbox.checked).toBe(false);
  });

  it("calls onCheck when a category is clicked", () => {
    const handleCheck = vi.fn();
    render(<CategoryFilterProducts items={mockItems} onCheck={handleCheck} />);
    const electronicsCheckbox = screen.getByLabelText("Electronics");
    fireEvent.click(electronicsCheckbox);
    expect(handleCheck).toHaveBeenCalledWith(mockItems[0]);
  });

  it("renders custom title if provided", () => {
    render(<CategoryFilterProducts title="My Categories" items={mockItems} />);
    expect(screen.getByText("My Categories")).toBeInTheDocument();
  });
});
