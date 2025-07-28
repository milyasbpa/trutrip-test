import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export type CategoryFilterProductsProps = {
  title?: string;
  items?: { id: number; name: string }[];
  selected?: null | { id: number; name: string };
  onCheck?: (data: { id: number; name: string }) => void;
};

export const CategoryFilterProducts = ({
  title = "Category",
  selected,
  items,
  onCheck,
}: CategoryFilterProductsProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <FormGroup>
        {items?.map((item, index) => (
          <FormControlLabel
            key={index}
            label={item.name}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontWeight: 500,
                color: "#85888B",
                fontSize: "1rem",
              },
            }}
            control={
              <Checkbox
                checked={item.id === selected?.id}
                onChange={() => onCheck?.(item)}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
};
