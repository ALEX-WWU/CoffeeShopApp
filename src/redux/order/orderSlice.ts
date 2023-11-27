import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  user: null,
  customer: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
