import { createSlice } from "@reduxjs/toolkit";

const initial = {
  selectSalesOrderHead: null,
};

export const salesOrderHeadSlice = createSlice({
  name: "salesOrderHead",
  initialState: initial,
  reducers: {
    setSelectSalesOrderHead: (state, action) => {
      state.selectSalesOrderHead = action.payload;
    },
  },
});

export const { setSelectSalesOrderHead } = salesOrderHeadSlice.actions;

export default salesOrderHeadSlice.reducer;
