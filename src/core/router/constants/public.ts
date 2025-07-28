import { LocaleRoute } from "./locale";

export const PublicRouteURL = {
  routeToLogin: (data?: { locale?: string }) =>
    `/:locale`.replace(":locale", data?.locale ?? LocaleRoute.default),
};
