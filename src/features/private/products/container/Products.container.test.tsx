import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/core/theme/theme";
import { ProductsContainer } from "./Products.container";
import { vi, describe, expect, it } from "vitest";

// Mock child components
vi.mock("../components/header", () => ({
  Header: () => <div data-testid="header" />,
}));
vi.mock("../fragments/items", () => ({
  ItemsProducts: () => <div data-testid="items-products" />,
}));
vi.mock("../fragments/header", () => ({
  HeaderProducts: () => <div data-testid="header-products" />,
}));
vi.mock("../fragments/filter", () => ({
  FilterProducts: () => <div data-testid="filter-products" />,
}));

describe("ProductsContainer", () => {
  it("renders all main sections", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductsContainer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header-products")).toBeInTheDocument();
    expect(screen.getByTestId("filter-products")).toBeInTheDocument();
    expect(screen.getByTestId("items-products")).toBeInTheDocument();
  });
});
