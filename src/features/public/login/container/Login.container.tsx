import { Grid } from "@mui/material";
import { BannerLogin } from "../fragments/banner";
import { FormLogin } from "../fragments/form/Form.login";
import { Fragment } from "react/jsx-runtime";
import { NotificationLogin } from "../fragments/notification";

export const LoginContainer = () => {
  return (
    <Fragment>
      <NotificationLogin />
      <Grid
        container
        spacing={2}
        sx={{
          background: "linear-gradient(180deg, #FFFFFF 56.92%, #F8FFF4 100%)",
        }}
      >
        <Grid
          size={{ xs: 0, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <BannerLogin />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormLogin />
        </Grid>
      </Grid>
    </Fragment>
  );
};
