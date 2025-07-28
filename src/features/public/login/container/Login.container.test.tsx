import { render, screen } from "@testing-library/react";
import { LoginContainer } from "./Login.container";
import { describe, it, vi, expect } from "vitest";

// Mock dependencies
vi.mock("../fragments/form/Form.login", () => ({
  FormLogin: () => <div data-testid="form-login" />,
}));
vi.mock("../fragments/banner", () => ({
  BannerLogin: () => <div data-testid="banner-login" />,
}));
vi.mock("../fragments/notification", () => ({
  NotificationLogin: () => <div data-testid="notification-login" />,
}));

describe("LoginContainer", () => {
  it("renders LoginContainer layout correctly", () => {
    render(<LoginContainer />);

    // Expect fragments inside the container
    expect(screen.getByTestId("form-login")).toBeInTheDocument();
    expect(screen.getByTestId("banner-login")).toBeInTheDocument();
    expect(screen.getByTestId("notification-login")).toBeInTheDocument();
  });
});
