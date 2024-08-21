import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "../features/crud/crudSlice";
export const store = configureStore({
  reducer: {
    cruds: crudReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the middleware
    }),
});
