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
  const searchParam = searchParams.get("category");
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
    <Typography>
      Erro ao carregar a lista de produtos, tente novamente mais tarde
    </Typography>;
  }

  const filteredProducts = products.filter((product) => {
    if (searchParams.get("category")) {
      return product.category === searchParam;
    }
    return product;
  });

  return (
    <Container maxWidth="xl">
      {searchParam ? (
        <Breadcrumbs className="py-4" separator=">">
          <Typography className="hover:underline" component={Link} to="/">
            produtos
          </Typography>
          <Typography>{searchParam}</Typography>
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
          Não existem produtos a serem exibidos na categoria '{searchParam}'.
        </Typography>
      )}
    </Container>
  );
}
