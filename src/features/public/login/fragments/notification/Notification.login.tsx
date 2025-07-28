import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { LoginActionEnum, LoginContext } from "../../context";
import staticData from "@/features/public/login/data/static.json";
import { useTranslation } from "react-i18next";

export const NotificationLogin = () => {
  const { t } = useTranslation();

  const { state: loginState, dispatch: dispatchLoginState } =
    useContext(LoginContext);

  const message =
    loginState.notification.variant === "error"
      ? t(staticData.notification.error)
      : t(staticData.notification.success);

  const handleClose = () => {
    dispatchLoginState({
      type: LoginActionEnum.SetNotificationState,
      payload: {
        ...loginState.notification,
        isOpen: false,
      },
    });
  };
  return (
    <Snackbar
      open={loginState.notification.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={loginState.notification.variant}>{message}</Alert>
    </Snackbar>
  );
};
