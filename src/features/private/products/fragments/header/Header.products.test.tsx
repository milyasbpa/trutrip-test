import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/core/theme/theme";
import { HeaderProducts } from "./Header.products";
import { vi, describe, expect, it } from "vitest";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock staticData
vi.mock("@/features/private/products/data/static.json", () => ({
  default: {
    header: {
      title: "Discover Trending Products Just for You!",
      subtitle:
        "Browse our curated catalogue from FakeStore. Find the best deals and most popular items in one place!",
    },
  },
}));

describe("HeaderProducts", () => {
  it("renders the product catalogue title and subtitle", () => {
    render(
      <ThemeProvider theme={theme}>
        <HeaderProducts />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: /Discover Trending Products Just for You!/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Browse our curated catalogue from FakeStore. Find the best deals and most popular items in one place!/i,
      ),
    ).toBeInTheDocument();
  });
});
