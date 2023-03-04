import { createSlice } from "@reduxjs/toolkit";
import RoutePaths from "../../routes/RoutePaths";

const initial = {
  menuItem: {
    menuKey: '1',
    url: RoutePaths.product, //Initial Load Url,
    openKeys:''
  },
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState: initial,
  reducers: {
    setMenuItem: (state, action) => {
      state.menuItem = action.payload;
    },
  },
});

export const { setMenuItem } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;
