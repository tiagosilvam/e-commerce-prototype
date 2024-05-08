import { ShoppingCartContext } from "contexts";
import { useContext } from "react";

export default function useShoppingCart() {
  const { cart, addItem, deleteItem, updateItem, getCartValue } =
    useContext(ShoppingCartContext);
  return { cart, addItem, deleteItem, updateItem, getCartValue };
}
