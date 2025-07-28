import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { LoginProvider, LoginContext } from "./Login.context";
import { LoginActionEnum } from "./Login.types";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
  const { state, dispatch } = useContext(LoginContext);
  return (
    <div>
      <div data-testid="status">
        {state.notification.isOpen ? "open" : "closed"} -{" "}
        {state.notification.variant}
      </div>
      <button
        onClick={() =>
          dispatch({
            type: LoginActionEnum.SetNotificationState,
            payload: {
              isOpen: true,
              variant: "error",
            },
          })
        }
      >
        Trigger Notification
      </button>
    </div>
  );
};

describe("LoginContext + Provider", () => {
  it("should provide initial state and allow dispatch to update it", async () => {
    const user = userEvent.setup();

    render(
      <LoginProvider>
        <TestComponent />
      </LoginProvider>
    );

    // Cek nilai awal
    expect(screen.getByTestId("status").textContent).toBe("closed - error");

    // Klik tombol untuk ubah state
    await user.click(
      screen.getByRole("button", { name: /trigger notification/i })
    );

    // Cek nilai baru
    expect(screen.getByTestId("status").textContent).toBe("open - error");
  });
});
