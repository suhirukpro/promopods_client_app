import { createSlice } from "@reduxjs/toolkit";

const initial = {
  authUser: {
    email: null,
    name: null,
    roles: null,
    logged: null,
    token: null,
    tokenExpireTime: null,
    userId: null,
    unique_name:null
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    logOut: (state) => {
      state.authUser = null;
    },
  },
});

export const { setAuthUser, logOut } = authSlice.actions;

export default authSlice.reducer;