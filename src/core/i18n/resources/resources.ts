import en_common from "../locales/en/common.json";
import en_login from "../locales/en/login.json";
import en_products from "../locales/en/products.json";

export const resources = {
  en: {
    common: en_common,
    login: en_login,
    products: en_products,
  },
} as const;

export type Resources = typeof resources;
