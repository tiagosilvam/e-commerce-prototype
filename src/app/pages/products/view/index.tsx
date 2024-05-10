import {
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import {
  AddCardRounded,
  ProductionQuantityLimits,
  Error,
} from "@mui/icons-material";
import { Button, Input, Loader, MaskedInput } from "components";
import { useShoppingCart } from "hooks";
import { fetcher, formatCurrency } from "utils";
import axios, { AxiosError } from "axios";
import { Controller, UseFormSetError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CepSchema } from "schemas/CepSchema";
import { z } from "zod";
import { useState } from "react";

const searchCEP = async (
  cep: string,
  setFormError: UseFormSetError<z.infer<typeof CepSchema>>,
) => {
  return await axios
    .get(
      `https://viacep.com.br/ws/${cep.replaceAll(".", "").replaceAll("-", "")}/json/`,
    )
    .then(({ data }) => {
      if (data.erro) {
        setFormError("cep", {
          message: "CEP não encontrado",
        });
        return null;
      }
      return data;
    });
};

export default function ProductView() {
  const { productId } = useParams();
  const { cart, addItem, updateItem } = useShoppingCart();
  const navigate = useNavigate();
  const [city, setCity] = useState<CEP>();
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<z.infer<typeof CepSchema>>({
    resolver: zodResolver(CepSchema),
    mode: "all",
  });

  const {
    data: product,
    isLoading,
    error,
  }: {
    data: Product;
    isLoading: boolean;
    error?: AxiosError;
  } = useSWRImmutable(
    `${process.env.REACT_APP_PRODUCTS_API_URL}/products/${productId}`,
    fetcher,
  );

  if (isLoading) {
    return <Loader type="linear" label="Carregando produto..." />;
  } else if (error) {
    return (
      <div className="m-auto space-y-1 self-center max-sm:px-4">
        <div className="flex items-center max-sm:flex-col max-sm:space-y-3 sm:space-x-3">
          <Error />
          <Typography className="max-sm:text-center">
            Erro ao carregar produto, tente novamente mais tarde.
          </Typography>
        </div>
        <Typography className="text-center text-xs italic text-gray-500">
          Error: {error.message}
        </Typography>
      </div>
    );
  } else if (!product) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <ProductionQuantityLimits fontSize="large" />
          <Typography>Ops, produto não encontrado.</Typography>
        </div>
      </div>
    );
  }

  return (
    <Container maxWidth="xl">
      <Breadcrumbs className="py-4" separator=">">
        <Typography className="hover:underline" component={Link} to="/">
          produtos
        </Typography>
        <Typography
          className="hover:underline"
          component={Link}
          to={`/?category=${product.category}`}
        >
          {product.category}
        </Typography>
        <Typography>{product.title}</Typography>
      </Breadcrumbs>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Paper className="rounded-xl p-6 shadow-md">
            <Grid container>
              <Grid className="flex min-h-[400px] p-4" item xs={12} md={4}>
                <img className="self-center" src={product.image} />
              </Grid>
              <Grid className="space-y-4 px-8 py-4" item xs={12} md={8}>
                <div className="flex items-center space-x-2">
                  <Rating
                    value={product.rating.rate}
                    precision={0.1}
                    readOnly
                  />
                  <Typography className="font-bold">
                    {product.rating.rate.toFixed(1)}
                  </Typography>
                  <Typography>({product.rating.count} avaliações)</Typography>
                </div>
                <Typography className="text-2xl">{product.title}</Typography>
                <Typography>Categoria: {product.category}</Typography>
                <Typography>{product.description}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          className="flex flex-col justify-between space-y-5 max-sm:py-4 md:px-4"
          item
          xs={12}
          md={3}
        >
          <Paper className="rounded-xl p-6 shadow-md">
            <Typography className="text-2xl font-bold">
              R$ {formatCurrency(product.price - product.price * 0.1)}
            </Typography>
            <Typography className="text-sm">
              A vista no PIX com 10% OFF
            </Typography>
            <Typography className="my-2">ou</Typography>
            <Typography className="font-bold">
              R$ {formatCurrency(product.price)}
            </Typography>
            <Typography className="text-sm">
              Em até 10x no cartão de crédito
            </Typography>
          </Paper>
          <Paper className="flex flex-col rounded-xl p-6 shadow-md">
            <Typography className="mb-2 font-bold">
              Calcular frete e prazo
            </Typography>
            <form
              className="flex items-center space-x-2"
              onSubmit={handleSubmit(({ cep }) =>
                searchCEP(cep, setError)
                  .then(setCity)
                  .catch(() =>
                    setError("cep", {
                      message: "Houve um problema ao buscar o CEP",
                    }),
                  ),
              )}
            >
              <Controller
                control={control}
                name="cep"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Informe seu CEP"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      inputComponent: MaskedInput,
                      inputProps: {
                        mask: "00.000-000",
                      },
                    }}
                    error={!!errors.cep}
                    helperText={errors.cep?.message}
                  />
                )}
              />
              <Button className="mb-6" name="Calular" type="submit" />
            </form>
            {city && (
              <div>
                <Typography className="text-sm">
                  <b>Endereço:</b> {city.logradouro}, {city.bairro}
                </Typography>
                <Typography className="text-sm">
                  <b>Cidade:</b> {city.localidade} - {city.uf}
                </Typography>
                <Typography className="text-sm">
                  <b>Valor do frete:</b> N/A
                </Typography>
              </div>
            )}
          </Paper>
          <Paper className="flex flex-col space-y-4 rounded-xl p-6 shadow-md">
            <Button
              name="Comprar"
              onClick={() => {
                addItem(product);
                navigate("/payment");
              }}
            />
            <Button
              name="Adicionar ao carrinho"
              startIcon={<AddCardRounded />}
              onClick={() => {
                const existingItemIndex = cart.findIndex(
                  (cartItem) => cartItem.item.id === product.id,
                );
                if (existingItemIndex !== -1) {
                  updateItem(existingItemIndex, "add");
                } else {
                  addItem(product);
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
