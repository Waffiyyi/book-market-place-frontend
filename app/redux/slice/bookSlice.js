import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {api, API_URL} from "@/app/config/api";

const initialState = {
  books: [],
  categories:[],
  book: null,
  isLoading: false,
  error: null,
  success: false,
};

export const createBook = createAsyncThunk(
  "book/createBook",
  async (bookData, {rejectWithValue}) => {
    try {
      const {data} = await api.post(`/create-book`, bookData,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async ({ bookId, jwt }, { rejectWithValue }) => { // Destructure the object in payload
    try {
      console.log("entering fetch book");
      const { data } = await api.get(`/get-book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data from fetch book", data);
      return data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.errorMessage ||
        error.response?.data?.message ||
        error.message
      );
    }
  }
);



export const fetchAllBooks = createAsyncThunk(
  "book/fetchAllBooks",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/get-all-book`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data success", data)
      return data;
    } catch (error) {
      console.log("errr", error)
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const searchBooks = createAsyncThunk(
  "book/searchBooks",
  async ({ query, jwt }, { rejectWithValue }) => {
    try {
      console.log("jwt in thunk", jwt)
      console.log("query in thunk", query)
      const { data } = await api.get(
        `/search-book?query=${query}`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errorMessage ||
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

export const filterBooks = createAsyncThunk(
  "book/filterBooks",
  async (category, jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/filter-book`, {params: {query: category}},{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const getBestSellingBooks = createAsyncThunk(
  "book/getBestSellingBooks",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/best-selling-book`,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);
export const getFeaturedBooks = createAsyncThunk(
  "book/getFeaturedBooks",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/featured-books`,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const getAllCategories = createAsyncThunk(
  "book/getAllCategories",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/all-book-categories`,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const getFeaturedCategories = createAsyncThunk(
  "book/getFeaturedCategories",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/featured-categories`,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);
export const getFrequentlyBoughtWith = createAsyncThunk(
  "book/getFrequentlyBoughtWith",
  async (jwt, {rejectWithValue}) => {
    try {
      const {data} = await api.get(`/frequently-bought-with`,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errorMessage ||
        error.response?.data?.message ||
        error.message,
      );
    }
  },
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBook: (state) => {
      state.book = null;
      state.success = false;
      state.successMessage = "";
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem("jwt");
      return {
        ...state,
        cartItems: [],
        cart: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.books.push(action.payload);
    })
    .addCase(createBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    .addCase(fetchBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    })
    .addCase(fetchBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })



    .addCase(fetchAllBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(fetchAllBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })



    .addCase(searchBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(searchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })



    .addCase(filterBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(filterBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(filterBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })



    .addCase(getBestSellingBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getBestSellingBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(getBestSellingBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getFeaturedBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getFeaturedBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(getFeaturedBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getFeaturedCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getFeaturedCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    })
    .addCase(getFeaturedCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getFrequentlyBoughtWith.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getFrequentlyBoughtWith.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    .addCase(getFrequentlyBoughtWith.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

export const {resetBook, logout: bookLogoutAction, clearError} = bookSlice.actions;
export default bookSlice.reducer;