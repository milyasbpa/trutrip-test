import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormLogin } from "./Form.login";
import { AuthContext } from "@/features/private/auth/context";
import { LoginContext, type LoginInitialStateType } from "../../context";
import { MemoryRouter } from "react-router";
import { ENVIRONMENT } from "@/core/utils/constants";
import { vi, expect, describe, it } from "vitest";
import { initialState } from "../../context/Login.data";

// Mocks
vi.mock("js-cookie", () => ({
  default: {
    set: vi.fn(),
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithContext = (authStateOverride = {}) => {
  const loginState: LoginInitialStateType = {
    ...initialState,
    notification: { isOpen: false, variant: "error" },
  };

  const authState = {
    state: { isAuthenticated: false },
    ...authStateOverride,
  };

  const dispatchLoginState = vi.fn();
  const dispatchAuthState = vi.fn();

  render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{ state: authState, dispatch: dispatchAuthState }}
      >
        <LoginContext.Provider
          value={{ state: loginState, dispatch: dispatchLoginState }}
        >
          <FormLogin />
        </LoginContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return { dispatchLoginState, dispatchAuthState };
};

describe("FormLogin", () => {
  it("renders the login form", () => {
    renderWithContext();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/login:form_password_label/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows error when fields are empty", async () => {
    renderWithContext();

    // fireEvent.click(screen.getByRole("button", { name: /login/i }));
    // fireEvent.change
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "your-password" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getByText(/form.email.required/i)).toBeInTheDocument();
      //   expect(screen.getByText(/form.password.required/i)).toBeInTheDocument();
    });
  });

  it("shows error on invalid email format", async () => {
    renderWithContext();

    // fireEvent.click(screen.getByRole("button", { name: /login/i }));
    // fireEvent.change
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "your-password" } });

    await waitFor(() => {
      expect(
        screen.getByText(/form.email.invalid_format/i)
      ).toBeInTheDocument();
      //   expect(screen.getByText(/form.password.required/i)).toBeInTheDocument();
    });
  });

  //   it("dispatches error notification on failed login", async () => {
  //     const { dispatchLoginState } = renderWithContext();

  //     fireEvent.input(screen.getByLabelText(/email/i), {
  //       target: { value: "wrong@example.com" },
  //     });

  //     fireEvent.input(screen.getByLabelText(/password/i), {
  //       target: { value: "wrongpass" },
  //     });

  //     fireEvent.click(screen.getByRole("button", { name: /login/i }));

  //     await waitFor(() => {
  //       expect(dispatchLoginState).toHaveBeenCalledWith({
  //         type: "SetNotificationState",
  //         payload: expect.objectContaining({
  //           isOpen: true,
  //           variant: "error",
  //         }),
  //       });
  //     });
  //   });

  it("dispatches success notification and sets auth on correct login", async () => {
    const { dispatchLoginState, dispatchAuthState } = renderWithContext();

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: ENVIRONMENT.EMAIL },
    });

    fireEvent.input(screen.getByLabelText(/login:form_password_label/i), {
      target: { value: ENVIRONMENT.PASSWORD },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(dispatchLoginState).toHaveBeenCalledWith({
        type: "SetNotificationState",
        payload: expect.objectContaining({
          isOpen: true,
          variant: "success",
        }),
      });

      expect(dispatchAuthState).toHaveBeenCalledWith({
        type: "SetStateData",
        payload: expect.objectContaining({
          isAuthenticated: true,
        }),
      });
    });
  });
});
