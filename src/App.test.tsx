import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import App from "./App";
import { AuthContext } from "./features/private/auth/context";
import { MemoryRouter } from "react-router";

// Mock router dependencies
vi.mock("./core/router/hooks", () => ({
  useLocaleRouter: vi.fn(),
}));
vi.mock("./core/router/components/private/Private.route", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private">{children}</div>
  ),
}));
vi.mock("./core/router/components/public/Public.route", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="public">{children}</div>
  ),
}));

// Mock routes config
vi.mock("./core/router/config", () => ({
  routes: [
    {
      path: "/private",
      component: () => <div data-testid="private-component">Private Page</div>,
      isPrivate: true,
    },
    {
      path: "/public",
      component: () => <div data-testid="public-component">Public Page</div>,
      isPrivate: false,
    },
  ],
}));

describe("App", () => {
  const renderWithAuth = (isAuthenticated: boolean, initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <AuthContext.Provider
          value={{ state: { state: { isAuthenticated } }, dispatch: () => {} }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
  };

  it("renders private route with PrivateRoute when authenticated", () => {
    renderWithAuth(true, ["/private"]);
    expect(screen.getByTestId("private")).toBeInTheDocument();
    expect(screen.getByTestId("private-component")).toBeInTheDocument();
  });

  it("renders public route with PublicRoute when not authenticated", () => {
    renderWithAuth(false, ["/public"]);
    expect(screen.getByTestId("public")).toBeInTheDocument();
    expect(screen.getByTestId("public-component")).toBeInTheDocument();
  });
});
