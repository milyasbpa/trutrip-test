import { render, screen } from "@testing-library/react";
import { CardProducts, type Product } from "./Card.products";
import { describe, it, expect } from "vitest";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  price: 12345,
  image: "https://example.com/image.jpg",
  profit: 1000,
  description: "This is a test product description for testing purposes.",
};

describe("CardProducts", () => {
  it("renders product image, name, price, and description", () => {
    render(<CardProducts product={mockProduct} />);

    // Image
    const img = screen.getByRole("img", { name: /test product/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.image);

    // Name
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // Price (formatted)
    expect(screen.getByText("$12,345")).toBeInTheDocument();

    // Description
    expect(
      screen.getByText(/This is a test product description/i),
    ).toBeInTheDocument();
  });
});
