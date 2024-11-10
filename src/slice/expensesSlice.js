// src/redux/recordsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../database/supabase";

// Async Thunks for CRUD operations

// Fetch records from Supabase
export const fetchExpenses = createAsyncThunk(
  "records/fetchExpenses",
  async () => {
    const { data, error } = await supabase
      .from("expenses") // Replace with your Supabase table name
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);

// Insert a record into Supabase
export const insertExpenses = createAsyncThunk(
  "records/insertExpenses",
  async (record) => {
    const { data, error } = await supabase
      .from("expenses") // Replace with your Supabase table name
      .insert([record]);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
);

// Update a record in Supabase
export const updateExpenses = createAsyncThunk(
  "records/updateExpenses",
  async ({ id, updatedData }) => {
    const { data, error } = await supabase
      .from("expenses") // Replace with your Supabase table name
      .update(updatedData)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
);

// Delete a record from Supabase
export const deleteExpenses = createAsyncThunk(
  "records/deleteExpenses",
  async (id) => {
    const { error } = await supabase
      .from("expenses") // Replace with your Supabase table name
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return id;
  }
);

// Initial state for the slice
const initialState = {
  records: [],
  loading: false,
  error: null,
};

// Create the slice
const expensesSlice = createSlice({
  name: "expenses", //this is useful when you call the slice using useSelector
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling Fetching records
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Inserting a record
      .addCase(insertExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Updating a record
      .addCase(updateExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExpenses.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index >= 0) {
          state.records[index] = action.payload;
        }
      })
      .addCase(updateExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Deleting a record
      .addCase(deleteExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(
          (record) => record.id !== action.payload
        );
      })
      .addCase(deleteExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default expensesSlice.reducer;
