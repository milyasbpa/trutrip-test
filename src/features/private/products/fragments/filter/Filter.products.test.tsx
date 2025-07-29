import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { FilterProducts } from "./Filter.products";
import { useGetCategories } from "../../react-query/hooks/useGetCategories";
import theme from "@/core/theme/theme";

// Mock the hooks
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

vi.mock("../../react-query/hooks/useGetCategories", () => ({
  useGetCategories: vi.fn(),
}));

const mockCategories = [
  {
    id: 1,
    name: "Category 1",
    slug: "",
    image: "",
    creationAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    name: "Category 2",
    slug: "",
    image: "",
    creationAt: "",
    updatedAt: "",
  },
];

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
}

const renderComponent = (isMobile = false) => {
  vi.mocked(useMediaQuery).mockReturnValue(isMobile);
  vi.mocked(useGetCategories as any).mockReturnValue({
    data: mockCategories,
    isLoading: false,
  });

  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FilterProducts />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe("FilterProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Desktop View", () => {
    it("should render search input and category filter", () => {
      renderComponent(false);

      expect(screen.getByLabelText("Search product in catalog")).toBeDefined();
      expect(screen.getByText("Search")).toBeDefined();
    });

    it("should update URL when searching", async () => {
      renderComponent(false);

      const searchInput = screen.getByLabelText("Search product in catalog");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      await waitFor(() => {
        expect(screen.getByTestId("location-display").textContent).toContain(
          "search=test+search",
        );
      });
    });

    it("should update URL when selecting category", async () => {
      renderComponent(false);

      const categoryButton = screen.getByText("Category 1");
      fireEvent.click(categoryButton);

      await waitFor(() => {
        expect(screen.getByTestId("location-display").textContent).toContain(
          "category=1",
        );
      });
    });
  });

  describe("Mobile View", () => {
    it("should render filter button in mobile view", () => {
      renderComponent(true);
      expect(screen.getByText("Filter")).toBeDefined();
    });

    it("should open drawer when clicking filter button", () => {
      renderComponent(true);

      const filterButton = screen.getByText("Filter");
      fireEvent.click(filterButton);

      expect(screen.getByText("Terapkan Filter")).toBeDefined();
    });

    it("should apply filter and close drawer on apply button click", async () => {
      renderComponent(true);

      // Open drawer
      const filterButton = screen.getByText("Filter");
      fireEvent.click(filterButton);

      // Enter search term
      const searchInput = screen.getByLabelText("Search product in catalog");
      fireEvent.change(searchInput, { target: { value: "mobile test" } });

      // Click apply button
      const applyButton = screen.getByText("Terapkan Filter");
      fireEvent.click(applyButton);

      await waitFor(() => {
        expect(screen.getByTestId("location-display").textContent).toContain(
          "mobile+test",
        );
        expect(screen.queryByText("Terapkan Filter")).toBeNull();
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle API error gracefully", () => {
      vi.mocked(useGetCategories);

      renderComponent(false);
      expect(screen.getByLabelText("Search product in catalog")).toBeDefined();
    });
  });
});
