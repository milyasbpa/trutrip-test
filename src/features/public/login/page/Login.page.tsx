import { LoginContainer } from "../container/Login.container";
import { LoginProvider } from "../context";

export const LoginPage = () => {
  return (
    <LoginProvider>
      <LoginContainer />
    </LoginProvider>
  );
};
