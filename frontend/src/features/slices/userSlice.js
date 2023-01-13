import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addressCollected: (state, action) => {
      state.userAddress = action.payload;
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { addressCollected } = userSlice.actions;
