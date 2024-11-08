// redux/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../database/supabase";
// import supabase from "./supabase";

// Async thunk for deleting a record from Supabase
export const deleteRecordFromSupabase = createAsyncThunk(
  "data/deleteRecordFromSupabase",
  async (id, { rejectWithValue }) => {
    // Make the API call to Supabase to delete the record
    const { data, error } = await supabase
      .from("sales") // Replace with your actual table name
      .delete()
      .eq("id", id); // Assuming 'id' is the primary key column

    if (error) {
      return rejectWithValue(error.message); // If there's an error, reject with error message
    }

    return id; // If successful, return the id of the deleted record
  }
);

const deleteSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle", // Loading status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRecordFromSupabase.pending, (state) => {
        state.status = "loading"; // Set loading status when deleting
      })
      .addCase(deleteRecordFromSupabase.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded status after deletion
        // Remove the deleted item from the items array in the Redux state
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteRecordFromSupabase.rejected, (state, action) => {
        state.status = "failed"; // Set failed status if deletion fails
        state.error = action.payload; // Store the error message
      });
  },
});

export default deleteSlice.reducer;
