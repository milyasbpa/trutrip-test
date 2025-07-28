import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import { AuthActionEnum, AuthContext } from "@/features/private/auth/context";
import { useNavigate } from "react-router";
import { PublicRouteURL } from "@/core/router/constants";

export const Header = () => {
  const navigate = useNavigate();
  const { state: authState, dispatch: dispatchAuthState } =
    useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
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
    navigate(PublicRouteURL.routeToLogin());
  };
  return (
    <AppBar
      color={"transparent"}
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #EBF0F4",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <img src={"/icon.png"} style={{ width: "2rem", height: "2rem" }} />
        </Box>
        <Box>
          <IconButton onClick={handleClickAvatar} size="small">
            <Avatar sx={{ backgroundColor: "orange" }}>{"A"}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
