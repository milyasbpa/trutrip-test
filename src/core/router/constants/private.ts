import { LocaleRoute } from "./locale";

export const PrivateRouteURL = {
  // products
  routeToProductsURL: (data?: { locale?: string }) =>
    `/:locale/products`.replace(":locale", data?.locale ?? LocaleRoute.default),
};
