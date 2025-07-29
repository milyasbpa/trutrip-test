import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Drawer,
  useMediaQuery,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useSearchParams } from "react-router";

import { useGetCategories } from "../../react-query/hooks/useGetCategories";
import { CategoryFilterProducts } from "../../components/category_filter";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { useTranslation } from "react-i18next";

export const StyledPaper = styled(Paper)({
  boxShadow: "0px 16px 48px 0px #00000014",
  paddingInline: "1.5rem",
  paddingBlock: "1.5rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  width: "100%",
  gap: "1rem",
});

export const FullWidthGrid = styled(Grid)({
  width: "100%",
});

export const SectionTitle = styled(Typography)({
  fontWeight: "bold",
});

export const MobileFilterButton = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1201,
  padding: theme.spacing(2),
  background: "white",
}));

interface FilterContentProps {
  searchInput: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: { id: number; name: string } | null;
  items?: Array<{ id: number; name: string }>;
  handleCheckCategoryFilter: (data: { id: number; name: string }) => void;
  isMobile: boolean;
  handleApplySearch?: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  searchInput,
  handleChangeSearch,
  selectedCategory,
  items,
  handleCheckCategoryFilter,
  isMobile,
  handleApplySearch,
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ position: "relative", pb: isMobile ? "5.5rem" : 0 }}>
      <Grid container gap={1}>
        <FullWidthGrid>
          <SectionTitle
            data-testid="filter_search"
            variant="subtitle1"
            gutterBottom
          >
            {t("products:filter_search")}
          </SectionTitle>
        </FullWidthGrid>
        <FullWidthGrid>
          <TextField
            data-testid="filter_search_placeholder"
            label={t("products:filter_search_placeholder")}
            value={searchInput}
            onChange={handleChangeSearch}
            fullWidth
          />
        </FullWidthGrid>
      </Grid>

      <Grid container gap={1}>
        <FullWidthGrid>
          <CategoryFilterProducts
            title={t("products:filter_categories")}
            selected={selectedCategory}
            items={items}
            onCheck={handleCheckCategoryFilter}
          />
        </FullWidthGrid>
      </Grid>

      {isMobile && handleApplySearch && (
        <MobileFilterButton>
          <Button
            variant="contained"
            onClick={handleApplySearch}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            {t("products:filter_apply")}
          </Button>
        </MobileFilterButton>
      )}
    </Box>
  );
};

export const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const searchValue = searchParams.get("search") || "";
  const categoryValue = searchParams.get("category") || "";

  const { data } = useGetCategories();
  const items = data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const { searchInput, handleChangeSearch, handleApplySearch } =
    useFilterSearch(searchValue);

  const handleCheckCategoryFilter = (data: { id: number; name: string }) => {
    const params = {
      ...Object.fromEntries(searchParams),
    };

    if (categoryValue === String(data.id)) {
      delete params.category;
    } else {
      params.category = String(data.id);
    }

    setSearchParams(params);
  };

  const selectedCategory =
    items?.find((item) => String(item.id) === categoryValue) || null;

  if (isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" onClick={() => setOpen(true)} fullWidth>
          {t("products:filter")}
        </Button>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "16px 16px 0 0",
                padding: 2,
                minHeight: "40vh",
                maxHeight: "80vh",
              },
            },
          }}
        >
          <FilterContent
            searchInput={searchInput}
            handleChangeSearch={(e) => handleChangeSearch(e, isMobile)}
            selectedCategory={selectedCategory}
            items={items}
            handleCheckCategoryFilter={handleCheckCategoryFilter}
            isMobile={isMobile}
            handleApplySearch={() => {
              handleApplySearch();
              setOpen(false);
            }}
          />
        </Drawer>
      </Box>
    );
  }

  return (
    <StyledPaper elevation={0}>
      <FilterContent
        searchInput={searchInput}
        handleChangeSearch={(e) => handleChangeSearch(e, isMobile)}
        selectedCategory={selectedCategory}
        items={items}
        handleCheckCategoryFilter={handleCheckCategoryFilter}
        isMobile={isMobile}
      />
    </StyledPaper>
  );
};
