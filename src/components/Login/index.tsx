import { Paper, Typography } from "@mui/material";
import { Input, Button } from "components";
import { useForm, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "schemas/LoginSchema";
import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "hooks";
import { ChevronRight } from "@mui/icons-material";

const handleLogin = async (
  { username, password }: Credentials,
  setFormError: UseFormSetError<z.infer<typeof LoginSchema>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>,
  signIn: ({ username, password }: Credentials) => Promise<boolean>,
) => {
  setLoadingState(true);
  await signIn({ username, password })
    .catch((error) => {
      setFormError("username", {
        type: "invalid",
        message: undefined,
      });
      setFormError("password", {
        type: "invalid",
        message: error.response.data.message,
      });
    })
    .finally(() => setLoadingState(false));
};

export const Login = () => {
  const { signIn } = useSession();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
    mode: "all",
  });

  return (
    <Paper className="m-auto flex min-w-80 flex-col space-y-8 rounded-lg px-10 py-10 shadow-lg">
      <Typography className="self-center text-lg font-semibold">
        Faça seu login
      </Typography>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((formValues) => {
          handleLogin(formValues, setError, setLoading, signIn);
        })}
      >
        <Input
          label="Usuário"
          {...register("username")}
          error={!!errors.username}
          variant="outlined"
        />
        <Input
          label="Senha"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
        />
        <Button
          className="mt-1"
          name="Entrar"
          loading={loading}
          type="submit"
        />
      </form>
      <div className="space-y-2">
        <Link
          to="/signin"
          className="flex cursor-pointer items-center justify-center text-blue-600 hover:text-blue-800"
        >
          <Typography className="mb-0.5 text-sm">
            Esqueci minha senha
          </Typography>
          <ChevronRight fontSize="small" />
        </Link>
        <Link
          to="/signin"
          className=" flex cursor-pointer items-center justify-center text-blue-600 hover:text-blue-800"
        >
          <Typography className="mb-0.5 text-sm">Cadastrar conta</Typography>
          <ChevronRight fontSize="small" />
        </Link>
      </div>
    </Paper>
  );
};
