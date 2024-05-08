import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "routes";
import { AuthProvider, ShoppingCartProvider } from "providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ShoppingCartProvider>
        <AuthProvider>
          <RouterProvider router={appRoutes} />
        </AuthProvider>
      </ShoppingCartProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
