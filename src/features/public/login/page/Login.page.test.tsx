// LoginPage.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginPage } from "./Login.page";

// ✅ Mock LoginContainer with data-testid
vi.mock("../container/Login.container", () => ({
  LoginContainer: () => <div data-testid="login-container"></div>,
}));

// ✅ Mock LoginProvider with data-testid
vi.mock("../context", () => ({
  LoginProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="login-provider">{children}</div>
  ),
}));

describe("LoginPage", () => {
  it("should render LoginContainer inside LoginProvider", () => {
    render(<LoginPage />);

    const provider = screen.getByTestId("login-provider");
    const container = screen.getByTestId("login-container");

    expect(provider).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
});
