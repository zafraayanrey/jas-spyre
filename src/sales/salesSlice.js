// redux/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../database/supabase";

// Define async thunk to fetch data from Supabase
export const fetchDataFromSupabase = createAsyncThunk(
  "data/fetchDataFromSupabase",
  async () => {
    const { data, error } = await supabase
      .from("sales") // specify your table
      .select("*"); // or any specific columns

    if (error) throw error;
    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    testing: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromSupabase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataFromSupabase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchDataFromSupabase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { testing } = dataSlice.actions;
export default dataSlice.reducer;
