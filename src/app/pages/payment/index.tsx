import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Input, Button, MaskedInput } from "components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useShoppingCart } from "hooks";
import { CardSchema } from "schemas/CardSchema";
import { formatCurrency } from "utils";

const cardInstallments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const handleLogin = async (values: z.infer<typeof CardSchema>) => {
  console.log(values);
};

export default function Payment() {
  const { cart, getCartValue } = useShoppingCart();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      // cardNumber: "1234123412341234",
      // cardName: "Joao da S Oliveira",
      // cardDate: "05/25",
      // cardCvv: "123",
      cardInstallments: 1,
    },
    mode: "all",
  });

  return (
    <Container className="flex flex-col" maxWidth="xl">
      <Typography className="py-4 text-xl font-bold">Pagamento</Typography>
      <Paper className="flex rounded-lg p-8 shadow-md max-md:flex-col max-md:space-y-12 md:space-x-12">
        <div className="space-y-4 md:w-1/2">
          <Typography className="font-bold">
            Dados do cartão de crédito
          </Typography>
          <form
            id="paymentForm"
            onSubmit={handleSubmit((formValues) => {
              handleLogin(formValues);
            })}
          >
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Número do cartão"
                      variant="outlined"
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                      fullWidth
                      InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: {
                          mask: "0000 0000 0000 0000",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cardName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nome impresso no cartão"
                      variant="outlined"
                      error={!!errors.cardName}
                      helperText={errors.cardName?.message}
                      fullWidth
                      InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: {
                          mask: /[a-z ]$/i,
                          prepareChar: (str: string) => str.toUpperCase(),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="cardDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Validade"
                      variant="outlined"
                      fullWidth
                      error={!!errors?.cardDate}
                      helperText={errors.cardDate?.message}
                      InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: {
                          mask: "00/00",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="cardCvv"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="CVV"
                      variant="outlined"
                      fullWidth
                      error={!!errors?.cardCvv}
                      helperText={errors.cardCvv?.message}
                      InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: {
                          mask: "000",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="cardInstallments"
                  render={({ field: { onChange, value } }) => (
                    <FormControl size="small" fullWidth>
                      <InputLabel>Parcelas</InputLabel>
                      <Select
                        label="Parcelas"
                        value={value}
                        defaultValue={1}
                        onChange={({ target: { value } }) => {
                          onChange(value);
                        }}
                        error={!!errors?.cardInstallments}
                      >
                        {cardInstallments.map((installment) => (
                          <MenuItem key={installment} value={installment}>
                            <Typography>
                              {installment}x R${" "}
                              {formatCurrency(getCartValue() / installment)}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <div className="space-y-4 md:w-1/2">
          <Typography className="font-bold">Dados da compra</Typography>
          <div className="space-y-2">
            <Typography className="font-bold">
              Valor total: R$ {formatCurrency(getCartValue())}
            </Typography>
            <div className="space-y-1">
              <Typography>Itens no carrinho:</Typography>
              {cart.map(({ item: { image, id, title }, qnt }) => (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div className="flex w-10/12 items-center space-x-4">
                    <img
                      className="h-8 w-8 object-contain"
                      src={image}
                      alt={title}
                    />
                    <Typography
                      component={Link}
                      className="truncate hover:underline"
                      to={`/product/${id}`}
                    >
                      {title}
                    </Typography>
                  </div>
                  <Typography className="mr-2">{qnt} un.</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Paper>
      <Button
        className="mt-4 self-end"
        name="Finalizar"
        type="submit"
        form="paymentForm"
      />
    </Container>
  );
}
