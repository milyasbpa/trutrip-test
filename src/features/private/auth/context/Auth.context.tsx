import React, {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
} from "react";
import {
  AuthActionEnum,
  type AuthActions,
  type AuthInitialStateType,
} from "./Auth.types";
import { AuthStateReducer } from "./Auth.reducers";
import { initialState } from "./Auth.data";
import Cookies from "js-cookie";

const AuthContext = createContext<{
  state: AuthInitialStateType;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ state }: AuthInitialStateType, action: AuthActions) => ({
  state: AuthStateReducer(state, action),
});

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const token = Cookies.get("token");
  useEffect(() => {
    dispatch({
      type: AuthActionEnum.SetStateData,
      payload: {
        ...state.state,
        isAuthenticated: !!token,
      },
    });
  }, [token]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
