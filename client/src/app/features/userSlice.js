import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, Register, changePassword, getUser, updateUser } from "../api/user/users";

const initialState = {
  loading: false,
  userdata: {},
  isAuthenticated: false,
  isUpdated: false,
  token: "",
  errorMessage: "",
};

export const LoginUserAsync = createAsyncThunk(
  "user/login",
  async (formData) => {
    const response = await Login(formData);
    console.log(response.response);
    return response.response;
  }
);

export const RegisterUserAsync = createAsyncThunk(
  "user/register",
  async (formData) => {
    const response = await Register(formData);
    return response.response;
  }
);

export const getUserAsync = createAsyncThunk("user/me", async () => {
  const response = await getUser();
  return response.response;
});

export const updateUserAsync = createAsyncThunk(
  "user/updateme",
  async (formData) => {
    const response = await updateUser(formData);
    return response.response;
  }
);

export const updatePasswordAsync = createAsyncThunk(
  "user/updatepassword",
  async (formData) => {
    const response = await changePassword(formData);
    return response.response;
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.errorMessage = "";
    },
    clearToken: (state, action) => {
      state.token = "";
    },
    logout: (state, action) => {
      state.userdata = {};
      state.isAuthenticated = false;
    },
    changeIsUpdated: (state, action) => {
      state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.userdata = action.payload.data.user;
          state.isAuthenticated = true;
          state.token = action.payload.data.token;
          localStorage.setItem('ekarttoken', action.payload.data.token);
          // document.cookie('token', action.payload.data.token)
        }
        state.loading = false;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.userdata = {};
        state.isAuthenticated = false;
        state.loading = false;
        state.errorMessage = "Invalid Email or Password";
      })
      .addCase(RegisterUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(RegisterUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.userdata = action.payload.data.user;
          state.isAuthenticated = true;
          localStorage.setItem('ekarttoken', action.payload.data.token)
        }
        state.loading = false;
      })
      .addCase(RegisterUserAsync.rejected, (state, action) => {
        state.userdata = {};
        state.isAuthenticated = false;
        state.loading = false;
        state.errorMessage = "Something went wrong!!";
      })
      .addCase(getUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.userdata = action.payload.data.user;
          state.isAuthenticated = true;
          state.token = action.payload.data.token;
          
        }
        state.loading = false;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.userdata = {};
        state.isAuthenticated = false;
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.errorMessage = "Update unsuccessful !!.";
      })
      .addCase(updatePasswordAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.loading = false;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.errorMessage = "Update unsuccessful !!.";
      })
  },
});

export const { clearError, clearToken, logout, changeIsUpdated } = userSlice.actions;
