import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menu/menuSlice";
import salesSlice from "./sales/salesSlice";
import deleteSlice from "./sales/deleteSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    data: salesSlice,
    delete: deleteSlice,
  },
});

export default store;
