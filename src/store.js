import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menu/menuSlice";
import deleteSlice from "./sales/deleteSlice";
import salesSlice from "./slice/salesSlice";
import expensesSlice from "./slice/expensesSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    delete: deleteSlice,
    sales: salesSlice,
    expenses: expensesSlice,
  },
});

export default store;
