import {
  LoginActionEnum,
  type LoginActions,
  type LoginNotification,
} from "./Login.types";

export const LoginNotificationReducer = (
  state: LoginNotification,
  action: LoginActions
) => {
  switch (action.type) {
    case LoginActionEnum.SetNotificationState:
      return action.payload;

    default:
      return state;
  }
};
