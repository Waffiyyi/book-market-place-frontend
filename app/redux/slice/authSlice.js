import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {api, API_URL, API_URL_LOCAL} from "@/app/config/api";
import {logoutCart} from "@/app/redux/slice/cartSlice";
import {logoutBooks} from "@/app/redux/slice/bookSlice";

const initialState = {
  user: null, isLoading: false, error: null, jwt: null, success: false, successMessage: "",
};

const setTokenWithExpiration = (token) => {
  const now = new Date().getTime();
  const expirationTime = now + 23 * 60 * 60 * 1000;
  localStorage.setItem("jwt", token);
  localStorage.setItem("expirationTime", expirationTime.toString());
};

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("expirationTime");
  if (!expirationTime) return true;

  const now = new Date().getTime();
  return now > parseInt(expirationTime, 10);
};


export const registerUser = createAsyncThunk("auth/registerUser",
  async (reqData, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
      if (data.jwt) {
        setTokenWithExpiration(data.jwt);
        reqData.router.push("/");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage || error.response?.data?.message || error.message);
    }
  });

export const loginUser = createAsyncThunk("auth/loginUser",
  async (reqData, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(`${API_URL}/auth/login`, reqData.userData);
      if (data.jwt) {
        setTokenWithExpiration(data.jwt);
        reqData.router.push("/");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage || error.response?.data?.message || error.message);
    }
  });

export const getUser = createAsyncThunk("auth/getUser",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`${API_URL}/auth/get-profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage || error.response?.data?.message || error.message);
    }
  });
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, {dispatch}) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("recentlyViewedBooks");
  dispatch(logoutAction())
  dispatch(logoutBooks());
  dispatch(logoutCart());
});
export const checkTokenExpirationMiddleware = () => (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logoutUser());
  }
};


export const authSlice = createSlice({
  name: "auth", initialState, reducers: {
    logout: (state) => {
      return {...initialState};
    }, clearError: (state) => {
      state.error = null;
    },
  }, extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      return {...initialState};
    })
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
      state.successMessage = "Registration successful!";
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
      state.success = "Login Success";
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    })
    .addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {logout: logoutAction, clearError} = authSlice.actions;
export default authSlice.reducer;