import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Checkbox,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  Add,
  ChevronRight,
  Delete,
  Remove,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useShoppingCart } from "hooks";
import { Button } from "components";
import { formatCurrency } from "utils";

const deleteItems = (
  selectedItems: Cart,
  setSelectedItems: Dispatch<SetStateAction<Cart>>,
  deleteItem: (item: Product) => void,
) => {
  selectedItems.map((selectedItem) => deleteItem(selectedItem.item));
  setSelectedItems([]);
};

export default function Cart() {
  const { cart, deleteItem, updateItem, getCartValue } = useShoppingCart();
  const [selectedItems, setSelectedItems] = useState<Cart>([]);
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Typography className="py-4 text-xl font-bold">Seu carrinho</Typography>
      <div className="flex flex-col space-y-4">
        <Paper className="flex flex-col space-y-2 rounded-lg p-4 shadow-md">
          <div className="space-x-4">
            <Button
              name={`Selecionar todos (${cart.length})`}
              variant="text"
              onClick={() => setSelectedItems(cart)}
              hidden={cart.length === 0}
              size="small"
            />
            <Button
              name={`Excluir selecionados (${selectedItems.length})`}
              variant="text"
              hidden={selectedItems.length === 0}
              onClick={() =>
                deleteItems(selectedItems, setSelectedItems, deleteItem)
              }
              size="small"
            />
          </div>
          <div className="flex flex-col space-y-4">
            {cart.length > 0 ? (
              cart.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex space-x-4 rounded-lg border p-2"
                >
                  <div className="flex min-w-24 items-center space-x-2">
                    <Checkbox
                      size="small"
                      checked={selectedItems.some(
                        (selectedItem) =>
                          selectedItem.item.id === cartItem.item.id,
                      )}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedItems((prev) => {
                            const updatedCart = [...prev, cartItem];
                            return updatedCart;
                          });
                        } else {
                          setSelectedItems((prev) => {
                            const newCart = prev.filter(
                              (selectedItem) =>
                                selectedItem.item.id !== cartItem.item.id,
                            );
                            return newCart;
                          });
                        }
                      }}
                    />
                    <img
                      className="h-12 w-12 cursor-pointer object-contain"
                      src={cartItem.item.image}
                      alt={cartItem.item.title}
                      onClick={() => navigate(`/product/${cartItem.item.id}`)}
                    />
                  </div>
                  <div className="flex w-full justify-between max-md:flex-col">
                    <div>
                      <Typography
                        className="hover:underline"
                        component={Link}
                        to={`/product/${cartItem.item.id}`}
                      >
                        {cartItem.item.title}
                      </Typography>
                      <Typography className="font-bold">
                        Preço: R$ {formatCurrency(cartItem.item.price)}
                      </Typography>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateItem(index, "add");
                        }}
                      >
                        <Add />
                      </IconButton>
                      <Typography>{cartItem.qnt}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (cartItem.qnt > 1) {
                            updateItem(index, "remove");
                          } else {
                            deleteItem(cartItem.item);
                            setSelectedItems((prev) => {
                              const newCart = prev.filter(
                                (selectedItem) =>
                                  selectedItem.item.id !== cartItem.item.id,
                              );
                              return newCart;
                            });
                          }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteItem(cartItem.item);
                          setSelectedItems((prev) => {
                            const newCart = prev.filter(
                              (selectedItem) =>
                                selectedItem.item.id !== cartItem.item.id,
                            );
                            return newCart;
                          });
                        }}
                      >
                        <Delete className="text-red-500" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-h-32 w-full">
                <div className="m-auto flex flex-col items-center justify-center space-y-4 self-center">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <ProductionQuantityLimits />
                    <Typography className="text-sm italic">
                      Não existem produtos no carrinho
                    </Typography>
                  </div>
                  <Button
                    name="Procurar produtos"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>
            )}
            {cart.length > 0 && (
              <div className="flex space-x-1 self-end px-2">
                <Typography className="font-bold">Total:</Typography>
                <Typography>R$ {formatCurrency(getCartValue())}</Typography>
              </div>
            )}
          </div>
        </Paper>
        {cart.length > 0 && (
          <Button
            className="self-end"
            name={`Pagamento (R$ ${formatCurrency(getCartValue())})`}
            endIcon={<ChevronRight />}
            onClick={() => navigate("/payment")}
          />
        )}
      </div>
    </Container>
  );
}
