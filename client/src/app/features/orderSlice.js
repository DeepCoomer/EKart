import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, myOrderDetails, myOrders } from "../api/orders/order";

const initialState = {
  orders: [],
  order: {},
  loading: false,
  errorMessage: "",
};

export const createOrderAsync = createAsyncThunk(
  "order/create",
  async (formData) => {
    const response = await createOrder(formData);
    return response.response;
  }
);

export const getMyOrdersAsync = createAsyncThunk("order/myorders", async () => {
  const response = await myOrders();
  return response.response;
});

export const getMyOrderDetailsAsync = createAsyncThunk(
  "order/myorderdetails", async (id) => {
    const response = await myOrderDetails(id);
    return response.response;
  }
)

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        // state.orders.push(action.payload);
        // state.order = action.payload;
        state.loading = false;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        // state.orders = [];
        // state.order = {};
        state.loading = false;
        state.errorMessage = "Order failed !!";
      })
      .addCase(getMyOrdersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.orders = action.payload.data.orders;
        state.loading = false;
      })
      .addCase(getMyOrdersAsync.rejected, (state, action) => {
        state.orders = [];
        state.order = {};
        state.loading = false;
        state.errorMessage = "Something went wrong!!";
      })
      .addCase(getMyOrderDetailsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyOrderDetailsAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.order = action.payload.data.order;
        state.loading = false;
      })
      .addCase(getMyOrderDetailsAsync.rejected, (state, action) => {
        state.orders = [];
        state.order = {};
        state.loading = false;
        state.errorMessage = "Something went wrong!!";
      })
  },
});

export const { clearErrors } = orderSlice.actions;
