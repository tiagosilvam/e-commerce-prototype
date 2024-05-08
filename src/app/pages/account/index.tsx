import { Container, Grid, Paper, Typography } from "@mui/material";
import { Input } from "components";
import { useSession } from "hooks";

export default function Account() {
  const { user } = useSession();

  return (
    <Container maxWidth="xl">
      <Typography className="py-4 text-xl font-bold">Conta</Typography>
      <Paper className="space-y-4 rounded-xl p-8 shadow-md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="flex flex-col space-y-2">
              <Typography className="mb-2 font-bold">
                Informações de cadastro
              </Typography>
              <Input
                label="Nome"
                variant="outlined"
                value={user?.firstName}
                disabled
              />
              <Input
                label="Sobrenome"
                variant="outlined"
                value={user?.lastName}
                disabled
              />
              <Input
                label="Email"
                variant="outlined"
                value={user?.email}
                disabled
              />
              <Input
                label="Sexo"
                variant="outlined"
                value={user?.gender === "female" ? "Feminino" : "Masculino"}
                disabled
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="mb-2 font-bold">
              Informações de endereço
            </Typography>
            <Typography className="text-sm italic text-gray-500">
              Nenhum endereço cadastrado
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
