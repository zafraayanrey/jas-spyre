// redux/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../database/supabase";

// Async thunk for inserting a record into Supabase
export const insertRecordToSupabase = createAsyncThunk(
  "data/insertRecordToSupabase",
  async (newRecord, { rejectWithValue }) => {
    // Make the API call to Supabase to insert the record
    const { data, error } = await supabase
      .from("sales") // Replace with your actual table name
      .insert([newRecord]); // Insert the new record (it's wrapped in an array)

    if (error) {
      return rejectWithValue(error.message); // If there's an error, reject with error message
    }

    return data[0]; // Return the inserted record (data[0] because `insert()` returns an array)
  }
);

const insertSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle", // Loading status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertRecordToSupabase.pending, (state) => {
        state.status = "loading"; // Set loading status when inserting
      })
      .addCase(insertRecordToSupabase.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded status after insertion
        state.items.push(action.payload); // Add the inserted record to the items array
      })
      .addCase(insertRecordToSupabase.rejected, (state, action) => {
        state.status = "failed"; // Set failed status if insertion fails
        state.error = action.payload; // Store the error message
      });
  },
});

export default insertSlice.reducer;
