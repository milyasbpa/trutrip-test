import { Grid } from "@mui/material";

import { Header } from "../components/header";
import { ItemsProducts } from "../fragments/items";
import { HeaderProducts } from "../fragments/header";
import { FilterProducts } from "../fragments/filter";

export const ProductsContainer = () => {
  return (
    <>
      <Header />
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: 1200,
          marginX: "auto",
          paddingBlock: "6rem",
          px: { xs: "1rem", lg: "0rem" },
        }}
      >
        <Grid size={{ sm: 12, md: 12 }}>
          <HeaderProducts />
        </Grid>
        <Grid size={{ sm: 12, md: 3 }}>
          <FilterProducts />
        </Grid>
        <Grid size={{ sm: 12, md: 9 }}>
          <ItemsProducts />
        </Grid>
      </Grid>
    </>
  );
};
