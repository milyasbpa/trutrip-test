import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./core/theme/theme.ts";
import "../src/core/i18n";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./features/private/auth/context/Auth.context.tsx";
import { ReactQueryProvider } from "./core/react-query/ReactQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ReactQueryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ReactQueryProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
