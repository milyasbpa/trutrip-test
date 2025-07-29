import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  profit: number;
  description: string;
};

type Props = {
  product: Product;
};

const StyledCard = styled(Card)({
  boxShadow: "0px 16px 48px 0px #00000014",
  border: "1px solid #EBF0F4",
  width: "100%",
  height: "100%",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
});

const ProductTitle = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "bold",
});

const ProductPrice = styled(Typography)({
  color: "text.secondary",
  fontWeight: "bold",
  marginBlock: "0.5rem",
});

const ProductDescription = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const CardProducts = ({ product }: Props) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent>
        <ProductTitle variant="subtitle1">{product.name}</ProductTitle>
        <ProductPrice>${product.price.toLocaleString("en-US")}</ProductPrice>
        <ProductDescription variant="caption">
          {product.description}
        </ProductDescription>
      </CardContent>
    </StyledCard>
  );
};
