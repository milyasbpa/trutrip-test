import { ProductsContainer } from "../container";
import { ProductsProvider } from "../context";

export const ProductsPage = () => {
  return (
    <ProductsProvider>
      <ProductsContainer />
    </ProductsProvider>
  );
};
