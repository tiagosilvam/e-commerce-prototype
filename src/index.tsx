import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "routes";
import { AuthProvider, ShoppingCartProvider, ThemeProvider } from "providers";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <CssBaseline />
        <ShoppingCartProvider>
          <AuthProvider>
            <RouterProvider router={appRoutes} />
          </AuthProvider>
        </ShoppingCartProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
