import { z } from "zod";

export const CardSchema = z.object({
  cardNumber: z.string().length(16, "Número do cartão inválido"),
  cardName: z.string().min(6, "Nome inválido"),
  cardDate: z.string().length(5, "Data inválida"),
  cardCvv: z.string().length(3, "CVV inválido"),
  cardInstallments: z.number(),
});
