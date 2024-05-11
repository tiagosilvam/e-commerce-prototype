import { InfoOutlined } from "@mui/icons-material";
import {
  Typography,
  Modal,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Button } from "components";
import { useState } from "react";

export const BasicModal = () => {
  const modalKey = localStorage.getItem("readInformations");
  const [open, setOpen] = useState(!!modalKey ?? true);
  const toggleModal = () => setOpen((prev) => !prev);
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      open={!open}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="m-auto w-2/5 self-center max-md:w-3/4"
      disablePortal
      disableAutoFocus
    >
      <Paper className="flex flex-col rounded-lg p-6 shadow-none">
        <div className="mb-3 flex items-center space-x-2">
          <InfoOutlined />
          <Typography className="text-xl font-bold">
            Sobre este projeto
          </Typography>
        </div>
        <div className="max-h-[500px] space-y-3 overflow-y-auto border-b border-t py-3">
          <div className="space-y-2">
            <Typography className="mb-2 font-bold">Informações</Typography>
            <Typography>
              Está página trata-se de um portfólio. Para a realização deste
              projeto foram usadas APIs totalmente gratuitas.
            </Typography>
            <Typography>
              No desenvolvimento desse projeto optei por utilizar ReactJS
              (v18.3.1) junto com Material UI (v5.15.15) e TailwindCSS para o
              desenvolvimento da interface, no gerenciamento de formulários
              utilizei React Hook Form e ZOD para as validações, e para fetch de
              dados foram utilizadas as bibliotecas SWR e Axios.
            </Typography>
            <Typography>
              O projeto possui ESLint e Prettier configurados e ordenação
              automática de classes do TailwindCSS.
            </Typography>
            <Typography>
              Este projeto possui contextos para tema, autenticação e carrinho.
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography className="mb-2 font-bold">Considerações</Typography>
            <Typography>
              Por limitações das APIs utilizadas, algumas acões foram realizadas
              via frontend, entre elas: Carrinho e busca por produtos. Por
              limitaçãoes a sessão de favoritos não foi desenvolvida.
            </Typography>
            <Typography>
              Este projeto não teve como foco a realização fictícia de
              pagamentos ao clicar no botão de comprar.
            </Typography>
            <Typography className="text-sm font-bold">
              Em determinados momentos as APIs utilizadas podem estar
              indisponíveis.
            </Typography>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <FormControlLabel
            label="Não exibir novamente"
            control={
              <Checkbox onChange={(e) => setChecked(e.target.checked)} />
            }
          />
          <Button
            className="self-end"
            name="Confirmar"
            onClick={() => {
              if (checked) {
                localStorage.setItem("readInformations", "true");
              }
              toggleModal();
            }}
          />
        </div>
      </Paper>
    </Modal>
  );
};
