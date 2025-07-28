import { Grid } from "@mui/material";
import { styled } from "@mui/system";

import { Header } from "../components/header";
import { ItemsProducts } from "../fragments/items";
import { HeaderProducts } from "../fragments/header";
import { FilterProducts } from "../fragments/filter";

const ProductsWrapper = styled(Grid)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: "6rem 0",
  [theme.breakpoints.down("lg")]: {
    padding: "6rem 1rem",
  },
}));

const ProductLayout = {
  header: { sm: 12, md: 12 },
  filter: { sm: 12, md: 3 },
  content: { sm: 12, md: 9 },
};

export const ProductsContainer = () => {
  return (
    <>
      <Header />
      <ProductsWrapper container spacing={3}>
        <Grid {...ProductLayout.header}>
          <HeaderProducts />
        </Grid>
        <Grid {...ProductLayout.filter}>
          <FilterProducts />
        </Grid>
        <Grid {...ProductLayout.content}>
          <ItemsProducts />
        </Grid>
      </ProductsWrapper>
    </>
  );
};
