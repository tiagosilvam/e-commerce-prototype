import { CssBaseline } from "@mui/material";
import { Navbar, Loader } from "components";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ThemeProvider } from "providers";
import { useSession } from "hooks";

export default function App() {
  const { loading } = useSession();

  return (
    <ThemeProvider>
      <CssBaseline />
      {!loading ? (
        <Fragment>
          <header>
            <Navbar />
          </header>
          <main className="flex min-h-[calc(100dvh-160px)] pb-4">
            <Outlet />
          </main>
        </Fragment>
      ) : (
        <Loader type="logo" />
      )}
    </ThemeProvider>
  );
}
