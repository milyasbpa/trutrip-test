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
export interface LoginInitialStateType {
  notification: LoginNotification;
}

// State Collection Types consist of:
export interface LoginNotification {
  isOpen: boolean | undefined;
  variant: "error" | "success";
}

export const LoginActionEnum = {
  SetNotificationState: "SetNotificationState",
};

// Action Collection Types
export type LoginActions = LoginNotificationActions;

// Action Collection Types consist of:
// state
type LoginNotificationPayload = {
  [LoginActionEnum.SetNotificationState]: LoginNotification;
};

export type LoginNotificationActions =
  ActionMap<LoginNotificationPayload>[keyof ActionMap<LoginNotificationPayload>];
