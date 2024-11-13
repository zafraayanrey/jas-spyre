// src/redux/recordsSlice.js

import { createSlice } from "@reduxjs/toolkit";

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
});

export default salesSlice.reducer;
