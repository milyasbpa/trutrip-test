import { Box, Typography, styled } from "@mui/material";

const Root = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const ContentBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "start",
  justifyItems: "start",
  width: "100%",
  gap: "0.5rem",
});

const Title = styled(Typography)(({ theme }) => ({
  color: "#151E15",
  fontSize: "2.25rem",
  fontWeight: 700,
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: "#4F5A66",
  fontSize: "1rem",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

export const HeaderProducts = () => {
  return (
    <Root>
      <ContentBox>
        <Title variant="h1">Produk Makanan paling viral buat kamu!</Title>
        <Subtitle>
          Beli paket reseller di Kaldoo dan dapatkan paket konten gratis!
        </Subtitle>
      </ContentBox>
    </Root>
  );
};
