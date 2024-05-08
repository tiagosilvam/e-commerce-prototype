import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "app";
import SignIn from "app/pages/signIn";
import ProductView from "app/pages/products/view";
import Products from "app/pages/products";
import Cart from "app/pages/cart";
import Payment from "app/pages/payment";
import Page404 from "app/pages/page404";
import { Login } from "components";
import { useSession } from "hooks";
import Account from "app/pages/account";

const PrivateRoute = ({ component: Component }: { component: FC }) => {
  const { user } = useSession();

  if (user) {
    return <Component />;
  }

  return <Login />;
};

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:productId",
        element: <ProductView />,
      },
      {
        path: "payment",
        element: <PrivateRoute component={Payment} />,
      },
      {
        path: "account",
        element: <PrivateRoute component={Account} />,
      },
    ],
  },
]);
