type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface AuthInitialStateType {
  state: AuthState;
}

// State Collection Types consist of:
export interface AuthState {
  isAuthenticated: boolean | undefined;
}

export const AuthActionEnum = {
  SetStateData: "SetStateData",
};

// Action Collection Types
export type AuthActions = AuthStateActions;

// Action Collection Types consist of:
// state
type AuthStatePayload = {
  [AuthActionEnum.SetStateData]: AuthState;
};

export type AuthStateActions =
  ActionMap<AuthStatePayload>[keyof ActionMap<AuthStatePayload>];
