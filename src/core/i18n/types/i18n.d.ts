import "react-i18next";
import type { Resources } from "../resources/resources";

declare module "react-i18next" {
  interface Resources extends Resources {}
}
