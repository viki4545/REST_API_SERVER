// src/slices/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const fetchCrudThunk = createAsyncThunk(
  "api/fetchCrud",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCrudThunk = createAsyncThunk(
  "api/addCrud",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/create`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCrudThunk = createAsyncThunk(
  "api/updateCrud",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/update/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCrudThunk = createAsyncThunk(
  "api/deleteCrud",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const crudSlice = createSlice({
  name: "cruds",
  initialState: {
    items: [],
    status: {
      fetchCrudThunk: "idle",
      addCrudThunk: "idle",
      updateCrudThunk: "idle",
      deleteCrudThunk: "idle",
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrudThunk.pending, (state) => {
        state.status.fetchCrudThunk = "loading";
      })
      .addCase(fetchCrudThunk.fulfilled, (state, action) => {
        state.status.fetchCrudThunk = "succeeded";
        state.items = action.payload.data;
      })
      .addCase(fetchCrudThunk.rejected, (state, action) => {
        state.status.fetchCrudThunk = "failed";
        state.error = action.payload;
      })
      .addCase(addCrudThunk.pending, (state) => {
        state.status.addCrudThunk = "loading";
      })
      .addCase(addCrudThunk.fulfilled, (state, action) => {
        state.status.addCrudThunk = "succeeded";
        state.items.push(action.payload.data);
      })
      .addCase(addCrudThunk.rejected, (state, action) => {
        state.status.addCrudThunk = "failed";
        state.error = action.payload;
      })
      .addCase(updateCrudThunk.pending, (state) => {
        state.status.updateCrudThunk = "loading";
      })
      .addCase(updateCrudThunk.fulfilled, (state, action) => {
        state.status.updateCrudThunk = "succeeded";
        const index = state.items.findIndex(
          (crud) => crud._id === action.payload.data._id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(updateCrudThunk.rejected, (state, action) => {
        state.status.updateCrudThunk = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCrudThunk.pending, (state) => {
        state.status.deleteCrudThunk = "loading";
      })
      .addCase(deleteCrudThunk.fulfilled, (state, action) => {
        state.status.deleteCrudThunk = "succeeded";
        state.items = state.items.filter(
          (crud) => crud._id !== action.payload.data
        );
      })
      .addCase(deleteCrudThunk.rejected, (state, action) => {
        state.status.deleteCrudThunk = "failed";
        state.error = action.payload;
      });
  },
});

export default crudSlice.reducer;
