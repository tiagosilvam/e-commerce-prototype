import { z } from "zod";

export const CardSchema = z.object({
  cardNumber: z
    .string({ required_error: "Número do cartão obrigatório" })
    .length(19, "Número do cartão inválido"),
  cardName: z
    .string({ required_error: "Nome obrigatório" })
    .min(6, "Nome inválido"),
  cardDate: z
    .string({ required_error: "Data obrigatória" })
    .length(5, "Data inválida"),
  cardCvv: z
    .string({ required_error: "CVV obrigatório" })
    .length(3, "CVV inválido"),
  cardInstallments: z.number(),
});
