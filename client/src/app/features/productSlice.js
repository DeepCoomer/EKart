import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getProductDetails, getProducts } from "../api/products/products";

const initialState = {
  loading: false,
  products: [],
  productCount: 0,
  product: {},
  resultPerPage: 0,
  errormessage: "",
  price: [0, 100000],
  currentPage: 1,
  category: "",
  success: false
};

let page = initialState.currentPage;
let filterPrice = initialState.filterPrice;
let filterCategory = initialState.category;

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async (keyword) => {
    const response = await getProducts(keyword, page, filterPrice, filterCategory);
    // console.log(currentPage)
    // console.log("Respone",response.response);
    return response.response;
  }
);

export const getProductDetailsAsync = createAsyncThunk(
  "product/getProductDetails",
  async (id) => {
    const response = await getProductDetails(id);
    // console.log("Respone",response.response);
    return response.response;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (formData) => {
    const response = await createProduct(formData);
    return response.response;
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.errormessage = "";
    },
    changePage: (state, action) => {
      // console.log(action.payload);
      state.currentPage = action.payload;
      page = state.currentPage;
    },
    changePrice: (state, action) => {
      state.price = action.payload;
      filterPrice = state.price;
    },
    changeCategories: (state, action) => {
      state.category = action.payload;
      filterCategory = state.category;
    },
    successValue: (state, action) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload.data.products;
          state.productCount = action.payload.data.productCount;
          // state.filteredProductsCount = action.payload.data.filteredProductsCount;
          state.resultPerPage = action.payload.data.resultPerPage;
        }
        state.loading = false;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.errormessage = "Something went wrong";
        // alert(action.payload)
      })
      .addCase(getProductDetailsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.product = action.payload.data.product;
        }
        state.loading = false;
      })
      .addCase(getProductDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.product = {};
        state.errormessage = "Something went wrong";
      })
      .addCase(createProductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          // state.product = action.payload.data.product;
          state.success = true;
        }
        state.loading = false;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.product = {};
        state.errormessage = "Something went wrong";
      })
  },
});

export const { clearError, changePage, changePrice, changeCategories, successValue } = productSlice.actions;
