import { z } from "zod";

export const CepSchema = z.object({
  cep: z.string({ required_error: "Informe o CEP" }).length(10, "CEP inválido"),
});
