import { useContext, useState } from "react";
import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import staticData from "@/features/public/login/data/static.json";
import Cookies from "js-cookie";
import { FormWrapperLogin } from "../../components/form_wrapper/FormWrapper.login";
import { CustomButton } from "@/core/components/custom_button";
import { REGEX } from "@/core/utils/regex";
import { titleCase } from "@/core/utils/formatters";
import { LoginActionEnum, LoginContext } from "../../context";
import { ENVIRONMENT } from "@/core/utils/constants";
import { AuthActionEnum, AuthContext } from "@/features/private/auth/context";
import { useNavigate } from "react-router";
import { PrivateRouteURL } from "@/core/router/constants";

type FormData = {
  email: string;
  password: string;
};

export const FormLogin = () => {
  const navigate = useNavigate();
  const { state: authState, dispatch: dispatchAuthState } =
    useContext(AuthContext);
  const { state: loginState, dispatch: dispatchLoginState } =
    useContext(LoginContext);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const allowedEmail = ENVIRONMENT.EMAIL;
    const allowedPassword = ENVIRONMENT.PASSWORD;
    const isAuthenticated =
      data.email === allowedEmail && data.password === allowedPassword;

    if (!isAuthenticated) {
      dispatchLoginState({
        type: LoginActionEnum.SetNotificationState,
        payload: {
          ...loginState.notification,
          isOpen: true,
          variant: "error",
        },
      });
      return;
    }
    dispatchLoginState({
      type: LoginActionEnum.SetNotificationState,
      payload: {
        ...loginState.notification,
        isOpen: true,
        variant: "success",
      },
    });
    Cookies.set("token", "your_jwt_token_here", {
      expires: 7,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    dispatchAuthState({
      type: AuthActionEnum.SetStateData,
      payload: {
        ...authState.state,
        isAuthenticated: true,
      },
    });
    navigate(PrivateRouteURL.routeToProductsURL());
  };

  const isButtonDisabled = !!errors && !watch("email") && !watch("password");

  return (
    <FormWrapperLogin>
      <Card
        sx={{
          maxWidth: 476,
          width: "100%",
          borderRadius: "1rem",
          padding: "3rem",
          boxShadow: "0px 4px 12px 0px #0000000F",
        }}
      >
        <Grid container direction="column" gap="30px">
          <Grid>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1.5rem",
                color: "#151E15",
                textAlign: "center",
              }}
            >
              {t(staticData.form.title)}
            </Typography>
          </Grid>

          {/* Form */}
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container direction="column" spacing={2}>
                <Grid>
                  <TextField
                    fullWidth
                    label={t(staticData.form.email.label)}
                    placeholder={t(staticData.form.email.placeholder)}
                    variant="outlined"
                    type="email"
                    {...register("email", {
                      required: t(staticData.form.email.required),
                      pattern: {
                        value: REGEX.email,
                        message: t(staticData.form.email.invalid_format),
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    label={t(staticData.form.password.label)}
                    placeholder={t(staticData.form.password.placeholder)}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: t(staticData.form.password.required),
                      minLength: {
                        value: staticData.form.password.minLength.value,
                        message: t(staticData.form.password.minLength.message),
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 1 }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isButtonDisabled}
                    sx={{ paddingBlock: "1rem" }}
                  >
                    {titleCase(t(staticData.form.cta.login.label))}
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </FormWrapperLogin>
  );
};
