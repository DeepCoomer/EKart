import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/productSlice";
import { userSlice } from "./features/userSlice";
import { cartSlice } from "./features/cartSlice";
import { orderSlice } from "./features/orderSlice";

export const store = configureStore({
    reducer: {
        productReducer: productSlice.reducer,
        userReducer: userSlice.reducer,
        cartReducer: cartSlice.reducer,
        orderReducer: orderSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})