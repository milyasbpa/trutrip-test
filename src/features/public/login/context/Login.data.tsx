import type { LoginInitialStateType } from "./Login.types";

export const initialState: LoginInitialStateType = {
  notification: {
    isOpen: false,
    variant: "error",
  },
};
