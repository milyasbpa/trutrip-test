import React, { createContext, useReducer, type Dispatch } from "react";
import { type LoginActions, type LoginInitialStateType } from "./Login.types";
import { LoginNotificationReducer } from "./Login.reducers";
import { initialState } from "./Login.data";

const LoginContext = createContext<{
  state: LoginInitialStateType;
  dispatch: Dispatch<LoginActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { notification }: LoginInitialStateType,
  action: LoginActions
) => ({
  notification: LoginNotificationReducer(notification, action),
});

const LoginProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
