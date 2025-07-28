import { render, screen } from "@testing-library/react";
import { NotificationLogin } from "./Notification.login";
import { LoginContext, type LoginNotification } from "../../context";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "features.public.login.data.static.json:notification.success":
          "Login Success",
        "features.public.login.data.static.json:notification.error":
          "Login Failed",
      };
      return translations[key] || key;
    },
  }),
}));

describe("NotificationLogin", () => {
  const dispatchMock = vi.fn();

  const renderWithContext = (notification: LoginNotification) => {
    render(
      <LoginContext.Provider
        value={{
          state: { notification },
          dispatch: dispatchMock,
        }}
      >
        <NotificationLogin />
      </LoginContext.Provider>
    );
  };

  beforeEach(() => {
    vi.useFakeTimers(); // fake timers for autoHide
    dispatchMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers(); // restore timers
  });

  it("should show success message", () => {
    renderWithContext({
      isOpen: true,
      variant: "success",
    });

    expect(screen.getByText("login:notification_success")).toBeInTheDocument();
    expect(screen.getByRole("alert").className).toMatch(
      /MuiAlert-standardSuccess/
    );
  });

  it("should show error message", () => {
    renderWithContext({
      isOpen: true,
      variant: "error",
    });

    expect(screen.getByText("login:notification_error")).toBeInTheDocument();
    expect(screen.getByRole("alert").className).toMatch(
      /MuiAlert-standardError/
    );
  });
});
