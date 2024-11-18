import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    income: (state, action) => {
      //   const one = { ...state, value: "Zaf" };
      return { ...state, value: "income" };
    },
    expenses: (state, action) => {
      return { ...state, value: "expenses" };
    },
    ledger: (state, action) => {
      return { ...state, value: "ledger" };
    },
    report: (state, action) => {
      return { ...state, value: "report" };
    },
    settings: (state, action) => {
      return { ...state, value: "settings" };
    },
  },
});

export const { income, expenses, ledger, report, settings } = menu.actions;
export default menu.reducer;
