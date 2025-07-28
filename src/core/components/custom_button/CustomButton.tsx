import { Button, CircularProgress, type ButtonProps } from "@mui/material";

export interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const CustomButton = ({
  isLoading,
  ...otherProps
}: CustomButtonProps) => {
  return (
    <Button {...otherProps} type="submit" variant="contained">
      {isLoading && <CircularProgress />}
      {otherProps.children}
    </Button>
  );
};
