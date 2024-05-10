import { Error } from "@mui/icons-material";
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { ProductCard, Loader } from "components";
import { useShoppingCart } from "hooks";
import { Link, useSearchParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "utils";

export default function Products() {
  const { cart, addItem, updateItem } = useShoppingCart();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const {
    data: products,
    isLoading,
    error,
  }: {
    data: Product[];
    isLoading: boolean;
    error?: AxiosError;
  } = useSWRImmutable(
    `${process.env.REACT_APP_PRODUCTS_API_URL}/products`,
    fetcher,
  );

  if (isLoading) {
    return <Loader type="linear" label="Carregando produtos..." />;
  } else if (error) {
    return (
      <div className="m-auto space-y-1 self-center max-sm:px-4">
        <div className="flex items-center max-sm:flex-col max-sm:space-y-3 sm:space-x-3">
          <Error />
          <Typography className="max-sm:text-center">
            Erro ao carregar a lista de produtos, tente novamente mais tarde.
          </Typography>
        </div>
        <Typography className="text-center text-xs italic text-gray-500">
          Error: {error.message}
        </Typography>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    if (categoryParam) {
      return product.category === categoryParam;
    }
    return product;
  });

  return (
    <Container maxWidth="xl">
      {categoryParam ? (
        <Breadcrumbs className="py-4" separator=">">
          <Typography className="hover:underline" component={Link} to="/">
            produtos
          </Typography>
          <Typography>{categoryParam}</Typography>
        </Breadcrumbs>
      ) : (
        <Typography className="py-4 text-xl font-bold">Produtos</Typography>
      )}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((item, index) => (
            <Grid item key={index} xs={12} md={6} lg={4} xl={3}>
              <ProductCard
                item={item}
                onClick={() => {
                  const existingItemIndex = cart.findIndex(
                    (cartItem) => cartItem.item.id === item.id,
                  );
                  if (existingItemIndex !== -1) {
                    updateItem(existingItemIndex, "add");
                  } else {
                    addItem(item);
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          Desculpe, não existem produtos a serem exibidos na categoria.
        </Typography>
      )}
    </Container>
  );
}
