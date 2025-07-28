import { describe, it, expect } from "vitest";
import { LoginNotificationReducer } from "./Login.reducers";
import {
  LoginActionEnum,
  type LoginActions,
  type LoginNotification,
} from "./Login.types";

describe("LoginNotificationReducer", () => {
  const initialState: LoginNotification = {
    isOpen: false,
    variant: "success",
  };

  it("should return new state when action is SetNotificationState", () => {
    const newState: LoginNotification = {
      isOpen: true,
      variant: "error",
    };

    const action: LoginActions = {
      type: LoginActionEnum.SetNotificationState,
      payload: newState,
    };

    const result = LoginNotificationReducer(initialState, action);
    expect(result).toEqual(newState);
  });

  it("should return current state on unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    } as any;

    const result = LoginNotificationReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
