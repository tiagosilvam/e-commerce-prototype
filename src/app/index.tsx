import { Navbar, Loader, BasicModal } from "components";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSession } from "hooks";

export default function App() {
  const { loading } = useSession();

  return !loading ? (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="flex min-h-[calc(100dvh-160px)] pb-4">
        <Outlet />
        <BasicModal />
      </main>
    </Fragment>
  ) : (
    <Loader type="logo" />
  );
}
