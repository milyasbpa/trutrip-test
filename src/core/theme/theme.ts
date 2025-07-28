import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  palette: {
    primary: {
      main: "#207c3d",
    },
    success: {
      main: "#a2d9b1",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#85888B",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          textTransform: "none",
          "&.Mui-disabled": {
            backgroundColor: "#207c3d",
            color: "#fff",
            opacity: 0.4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#4CAF50",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2E7D32",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#85888B",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2E7D32",
          },
          "& input::placeholder": {
            color: "#85888B",
            opacity: 1,
          },
          "& input": {
            color: "#000",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#207c3d",
          "&.Mui-focused": {
            color: "#207c3d",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#207c3d",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#207c3d",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#207c3d",
          },
        },
      },
    },
  },
});

export default theme;
