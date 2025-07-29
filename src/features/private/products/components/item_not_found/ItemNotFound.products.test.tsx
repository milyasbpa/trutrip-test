import { render, screen } from "@testing-library/react";
import { ItemNotFoundProducts } from "./ItemNotFound.products";
import { describe, it, expect } from "vitest";

describe("ItemNotFoundProducts", () => {
  it("renders the not found image, message, and description", () => {
    render(
      <ItemNotFoundProducts
        message="No products found"
        description="Try adjusting your filters or search keywords."
      />,
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "/images/products/products-not-found.svg",
    );
    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your filters or search keywords."),
    ).toBeInTheDocument();
  });

  it("renders nothing for message and description if not provided", () => {
    render(<ItemNotFoundProducts />);
    // The image should still be present
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
