import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Informe o usuário" })
    .min(3, "Usuário inválido"),
  password: z
    .string({ required_error: "Informe a senha" })
    .min(6, "A senha deve conter 6 caracteres"),
});
