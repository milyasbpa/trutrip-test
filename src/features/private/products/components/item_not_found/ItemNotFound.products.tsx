import { Box, Typography, styled } from "@mui/material";
const NotFoundContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  placeContent: "center",
  placeItems: "center",
  gap: "2rem",
  width: "100%",
  minHeight: "600px",
});

const NotFoundContent = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  alignContent: "start",
  alignItems: "start",
  justifyContent: "center",
  justifyItems: "center",
  gap: "0.75rem",
  width: "100%",
  minHeight: "600px",
});

const NotFoundTitle = styled(Typography)({
  fontWeight: 500,
  color: "#151E15",
  fontSize: "1.5rem",
});

const NotFoundSubtitle = styled(Typography)({
  fontWeight: 400,
  color: "#4F5A66",
  fontSize: "1rem",
});

export interface ItemNotFoundProductsProps {
  message?: string;
  description?: string;
}

export const ItemNotFoundProducts = ({
  message,
  description,
}: ItemNotFoundProductsProps) => {
  return (
    <NotFoundContainer>
      <img src={"/images/products/products-not-found.svg"} />
      <NotFoundContent>
        <NotFoundTitle>{message}</NotFoundTitle>
        <NotFoundSubtitle>{description}</NotFoundSubtitle>
      </NotFoundContent>
    </NotFoundContainer>
  );
};
