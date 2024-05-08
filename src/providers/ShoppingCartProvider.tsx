import { ReactNode, useState } from "react";
import { ShoppingCartContext } from "contexts";

export const ShoppingCartProvider = ({
  children,
}: {
  children: Readonly<ReactNode>;
}) => {
  const storedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState<Cart>(
    storedCart ? JSON.parse(storedCart) : [],
  );

  const addItem = (item: Product) => {
    return setCart((prev) => {
      const updatedCart = [...prev, { item, qnt: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateItem = (itemIndex: number, action: "add" | "remove") => {
    setCart((prev) => {
      const prevCart = [...prev];
      if (action === "add") {
        prevCart[itemIndex].qnt += 1;
      } else {
        prevCart[itemIndex].qnt -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(prevCart));
      return prevCart;
    });
  };

  const deleteItem = (item: Product) => {
    return setCart((prev) => {
      const newCart = prev.filter(
        (selectedItem) => selectedItem.item.id !== item.id,
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const getCartValue = () => {
    return cart.reduce(
      (total, cartItem) =>
        total +
        cart.find((item) => item.item.id === cartItem.item.id)!.item.price *
          cartItem.qnt,
      0,
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addItem, deleteItem, updateItem, getCartValue }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
