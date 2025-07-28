import { AuthActionEnum, type AuthActions, type AuthState } from "./Auth.types";

export const AuthStateReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionEnum.SetStateData:
      return action.payload;

    default:
      return state;
  }
};
