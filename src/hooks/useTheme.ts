import { ThemeContext } from "contexts";
import { useContext } from "react";

export default function useTheme() {
  const { mode, toggleColorMode } = useContext(ThemeContext);
  return { mode, toggleColorMode };
}
