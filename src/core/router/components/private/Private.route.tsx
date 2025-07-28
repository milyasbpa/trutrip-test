import React, { type JSX } from "react";
import { Navigate, useParams } from "react-router";
import { PublicRouteURL } from "../../constants";

interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  const { locale } = useParams();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={PublicRouteURL.routeToLogin({
        locale: locale,
      })}
    />
  );
};

export default PrivateRoute;
