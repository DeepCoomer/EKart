import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {}
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const id = action.payload.id;
      const newQuantity = action.payload.newQty;
      //   console.log(id)
      //   console.log(action.payload)

      const productIndex = state.cartItems.findIndex((p) => p.product === id);
      //   console.log(productIndex);
      state.cartItems[productIndex].quantity = newQuantity;
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemsFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    removeAllItemsFromCart: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  },
});

export const { addToCart, updateQuantity, removeItemsFromCart, saveShippingInfo, removeAllItemsFromCart } =
  cartSlice.actions;
