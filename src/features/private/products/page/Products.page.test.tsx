import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { ProductsPage } from "./Products.page";

// Mock dependencies
vi.mock("../container", () => ({
  ProductsContainer: () => <div data-testid="products-container" />,
}));
vi.mock("../context", () => ({
  ProductsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="products-provider">{children}</div>
  ),
}));

describe("ProductsPage", () => {
  it("renders ProductsProvider and ProductsContainer", () => {
    render(<ProductsPage />);
    const provider = screen.getByTestId("products-provider");
    const container = screen.getByTestId("products-container");
    expect(provider).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    // Ensure ProductsContainer is rendered inside ProductsProvider
    expect(provider).toContainElement(container);
  });
});
