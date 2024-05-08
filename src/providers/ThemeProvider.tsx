import { useMediaQuery } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "contexts";
import { useState, ReactNode } from "react";
import { darkTheme, lightTheme } from "theme";

export const ThemeProvider = ({
  children,
}: {
  children: Readonly<ReactNode>;
}) => {
  const selectedTheme = localStorage.getItem("theme") as "dark" | "light";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    !selectedTheme ? (prefersDarkMode ? "dark" : "light") : selectedTheme,
  );

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MUIThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
