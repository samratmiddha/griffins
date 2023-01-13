import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
