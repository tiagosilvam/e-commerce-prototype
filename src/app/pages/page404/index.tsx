import { Container, Typography } from "@mui/material";

export default function Page404() {
  return (
    <Container
      className="flex h-screen w-screen items-center justify-center"
      maxWidth="xl"
    >
      <Typography className="text-lg text-gray-500">
        404 - Página não encontrada
      </Typography>
    </Container>
  );
}
