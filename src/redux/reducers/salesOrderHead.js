import { createSlice } from "@reduxjs/toolkit";

const initial = {
  selectSalesOrderHead: null,
};

export const salesOrderHeadSlice = createSlice({
  name: "salesOrderHead",
  initialState: initial,
  reducers: {
    setSelectSalesOrderHead: (state, action) => {
      console.log(action.payload);
      state.selectSalesOrderHead = action.payload;
    },
  },
});

export const { setSelectSalesOrderHead } = salesOrderHeadSlice.actions;

export default salesOrderHeadSlice.reducer;
