import {
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
  Drawer,
  useMediaQuery,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetCategories } from "../../react-query/hooks/useGetCategories";
import { CategoryFilterProducts } from "../../components/category_filter";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router";

const StyledPaper = styled(Paper)({
  boxShadow: "0px 16px 48px 0px #00000014",
  paddingInline: "1.5rem",
  paddingBlock: "1.5rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  width: "100%",
  gap: "1rem",
});

const FullWidthGrid = styled(Grid)({
  width: "100%",
});

const SectionTitle = styled(Typography)({
  fontWeight: "bold",
});

export const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const categoryValue = searchParams.get("category") || "";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const { data } = useGetCategories();
  const items = data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));

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

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [searchInput, setSearchInput] = useState(searchValue);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchInput(value);
    if (!isMobile) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        const params = {
          ...Object.fromEntries(searchParams),
        };
        if (value) {
          params.search = value;
        } else {
          delete params.search;
        }
        setSearchParams(params);
      }, 500);
    }
  };

  const handleApplySearch = () => {
    const params = {
      ...Object.fromEntries(searchParams),
    };
    if (searchInput) {
      params.search = searchInput;
    } else {
      delete params.search;
    }
    setSearchParams(params);
    setOpen(false);
  };
  const selectedCategory =
    items?.find((item) => String(item.id) === categoryValue) || null;

  const filterContent = (
    <Box sx={{ position: "relative", pb: isMobile ? "5.5rem" : 0 }}>
      <Grid container gap={1}>
        <FullWidthGrid>
          <SectionTitle variant="subtitle1" gutterBottom>
            {"Search"}
          </SectionTitle>
        </FullWidthGrid>
        <FullWidthGrid>
          <TextField
            label={"Search product in catalog"}
            value={searchInput}
            onChange={handleChangeSearch}
            fullWidth
          />
        </FullWidthGrid>
      </Grid>

      <Grid container gap={1}>
        <FullWidthGrid>
          <CategoryFilterProducts
            selected={selectedCategory}
            items={items}
            onCheck={handleCheckCategoryFilter}
          />
        </FullWidthGrid>
      </Grid>

      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1201,
            px: 2,
            py: 2,
            background: "white",
          }}
        >
          <Button
            variant="contained"
            onClick={handleApplySearch}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Terapkan Filter
          </Button>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" onClick={() => setOpen(true)} fullWidth>
          {"Filter"}
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
          {filterContent}
        </Drawer>
      </Box>
    );
  }

  return <StyledPaper elevation={0}>{filterContent}</StyledPaper>;
};
