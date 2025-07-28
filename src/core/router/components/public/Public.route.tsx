import React, { type JSX } from "react";
import { Navigate, useParams } from "react-router";
import { PrivateRouteURL } from "../../constants";

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  const { locale } = useParams();

  return isAuthenticated ? (
    <Navigate to={PrivateRouteURL.routeToProductsURL({ locale })} />
  ) : (
    children
  );
};

export default PublicRoute;
