// src/redux/recordsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../database/supabase";

// Async Thunks for CRUD operations

// Fetch records from Supabase
export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async () => {
    const { data, error } = await supabase
      .from("sales") // Replace with your Supabase table name
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);

// Insert a record into Supabase
export const insertRecord = createAsyncThunk(
  "records/insertRecord",
  async (record) => {
    const { data, error } = await supabase
      .from("sales") // Replace with your Supabase table name
      .insert([record]);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
);

// Update a record in Supabase
export const updateRecord = createAsyncThunk(
  "records/updateRecord",
  async ({ id, updatedData }) => {
    const { data, error } = await supabase
      .from("sales") // Replace with your Supabase table name
      .update(updatedData)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
);

// Delete a record from Supabase
export const deleteRecord = createAsyncThunk(
  "records/deleteRecord",
  async (id) => {
    const { error } = await supabase
      .from("sales") // Replace with your Supabase table name
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
const salesSlice = createSlice({
  name: "sales", //this is useful when you call the slice using useSelector
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling Fetching records
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Inserting a record
      .addCase(insertRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Updating a record
      .addCase(updateRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index >= 0) {
          state.records[index] = action.payload;
        }
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling Deleting a record
      .addCase(deleteRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(
          (record) => record.id !== action.payload
        );
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
