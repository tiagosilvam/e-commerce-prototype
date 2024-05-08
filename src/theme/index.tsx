"use client";

import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material/styles";
import "@fontsource/inter";

export const baseTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiLoadingButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minHeight: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    background: {
      default: "#FBFBFB",
    },
  },
  components: {
    ...baseTheme.components,
    MuiFilledInput: {
      ...baseTheme.components?.MuiFilledInput,
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
  },
});
