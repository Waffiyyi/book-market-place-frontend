import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {api, API_URL} from "@/app/config/api";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const findUserCart = createAsyncThunk(
  "cart/findUserCart",
  async (jwt, {rejectWithValue}) => {
    try {
      const response = await api.get(`/cart/user`, {
        headers: {Authorization: `Bearer ${jwt}`},
      });
      console.log("respnse user car", response)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({reqData}, {dispatch, rejectWithValue}) => {
    try {
      const {data} = await api.put(`/cart/add`, reqData, {
        headers: {Authorization: `Bearer ${reqData.jwt}`},
      });
      dispatch(findUserCart(reqData.jwt));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);


export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (reqData, {dispatch, rejectWithValue}) => {
    try {
      const {data} = await api.put(`/cart-item/update`, reqData, {
        headers: {Authorization: `Bearer ${reqData.jwt}`},
      });
      dispatch(findUserCart(reqData.jwt));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({cartItemId, jwt}, {rejectWithValue}) => {
    try {
      await api.delete(`/cart-item/remove`, {
        params: {cartItemId},
        headers: {Authorization: `Bearer ${jwt}`},
      });
      return cartItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.put(`/cart/clear`, {}, {
        headers: {Authorization: `Bearer ${jwt}`},
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (reqData, {dispatch, rejectWithValue}) => {
    try {
      const {data} = await api.post(`/payment-checkout`, reqData.cartDTO, {
        headers: {Authorization: `Bearer ${reqData.jwt}`},
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    logout: (state) => {
      return {
        ...initialState,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(findUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(findUserCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.cartItems = action.payload.items;
    })
    .addCase(findUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = [action.payload, ...state.cartItems];
    })
    .addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    })
    .addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(removeCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    })
    .addCase(removeCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = [];
      state.cart = action.payload;
    })
    .addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(checkoutCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(checkoutCart.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(checkoutCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {logout: logoutCart, clearError} = cartSlice.actions;
export default cartSlice.reducer;