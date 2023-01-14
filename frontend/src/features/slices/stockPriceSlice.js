import { createSlice } from "@reduxjs/toolkit";

const stockPriceSlice = createSlice({
  name: "stockPrice",
  initialState: {
    symbol: "",
    price: 0,
    currency: "",
  },
  reducers: {
    changeSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    changePrice: (state, action) => {
      state.price = action.payload;
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export default stockPriceSlice.reducer;
export const { changeCurrency, changeSymbol, changePrice } =
  stockPriceSlice.actions;
