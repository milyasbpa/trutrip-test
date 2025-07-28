import { ProductsPage } from "../../../features/private/products/page";
import { LoginPage } from "../../../features/public/login/page";

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  isPrivate: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/:locale",
    component: LoginPage,
    isPrivate: false,
  },
  {
    path: "/:locale/products",
    component: ProductsPage,
    isPrivate: true,
  },
];
