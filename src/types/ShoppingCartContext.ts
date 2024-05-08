type ShoppingCartContext = {
  cart: Cart;
  addItem: (item: Product) => void;
  deleteItem: (item: Product) => void;
  updateItem: (itemIndex: number, action: "add" | "remove") => void;
  getCartValue: () => number;
};
