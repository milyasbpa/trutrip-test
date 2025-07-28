import {
  Box,
  Grid,
  Pagination,
  Skeleton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetProducts } from "../../react-query/hooks";
import { CardProducts } from "../../components/card";
import { PAGINATION } from "@/core/utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import type { GetProductsResponseInterface } from "@/core/types/api";
import { ItemNotFoundProducts } from "../../components/item_not_found";
import { useSearchParams } from "react-router";

const Root = styled(Box)();

const SkeletonGrid = styled(Grid)({
  width: "100%",
});

const ProductsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  placeContent: "start",
  placeItems: "start",
  gap: "1rem",
  width: "100%",
});

const ProductsGrid = styled(Grid)({
  width: "100%",
});

const PaginationBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
});

export const ItemsProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetValue = searchParams.get("offset") || "";
  const paginationOffset =
    offsetValue.length && !isNaN(Number(offsetValue)) ? Number(offsetValue) : 0;
  const [products, setProducts] = useState<GetProductsResponseInterface[]>([]);

  const { data, isFetching, isError } = useGetProducts();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (paginationOffset === 0) {
      setProducts(data || []);
    } else if (data && data.length) {
      setProducts((prev) => [...prev, ...data]);
    }
  }, [data, paginationOffset]);

  const currentPage = Math.floor(paginationOffset / PAGINATION.LIMIT) + 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    const newOffset = (newPage - 1) * PAGINATION.LIMIT;

    const params = {
      ...Object.fromEntries(searchParams),
    };

    if (!newOffset) {
      delete params.offset;
    } else {
      params.offset = String(newOffset);
    }

    setSearchParams(params);
  };

  // Infinite scroll handler
  const fetchNext = () => {
    const newOffset = paginationOffset + PAGINATION.LIMIT;

    const params = {
      ...Object.fromEntries(searchParams),
    };

    if (!newOffset) {
      delete params.offset;
    } else {
      params.offset = String(newOffset);
    }

    setSearchParams(params);
  };

  if (isFetching && !data?.length && !paginationOffset) {
    return (
      <Root>
        <SkeletonGrid container spacing={2}>
          {Array.from({ length: PAGINATION.LIMIT }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </SkeletonGrid>
      </Root>
    );
  }

  if (isError || !products.length) {
    return (
      <Root>
        <ItemNotFoundProducts
          message={"Product Not Found"}
          description={"Produk tidak ditemukan atau terjadi kesalahan."}
        />
      </Root>
    );
  }

  if (isMobile) {
    return (
      <Root>
        <ProductsContainer>
          <InfiniteScroll
            dataLength={products?.length || 0}
            next={fetchNext}
            hasMore={true}
            loader={
              <SkeletonGrid container spacing={2}>
                {Array.from({ length: PAGINATION.LIMIT }).map((_, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Skeleton variant="rectangular" height={200} />
                  </Grid>
                ))}
              </SkeletonGrid>
            }
          >
            <ProductsGrid container spacing={2} columns={12}>
              {products?.map((product, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <CardProducts
                    product={{
                      id: product.id.toString(),
                      name: product.title,
                      price: product.price,
                      image: product.images?.[0],
                      profit: 0,
                      description: product.description,
                    }}
                  />
                </Grid>
              ))}
            </ProductsGrid>
          </InfiniteScroll>
        </ProductsContainer>
      </Root>
    );
  }

  return (
    <Root>
      <ProductsContainer>
        <ProductsGrid container spacing={2} columns={12}>
          {data?.map((product, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <CardProducts
                product={{
                  id: product.id.toString(),
                  name: product.title,
                  price: product.price,
                  image: product.images?.[0],
                  profit: 0,
                  description: product.description,
                }}
              />
            </Grid>
          ))}
        </ProductsGrid>
        <PaginationBox>
          <Pagination
            count={3}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </PaginationBox>
      </ProductsContainer>
    </Root>
  );
};
