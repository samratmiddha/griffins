import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/slices/userSlice";
import stockPriceReducer from "./features/slices/stockPriceSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    stockPrice: stockPriceReducer,
  },
});

export default store;
