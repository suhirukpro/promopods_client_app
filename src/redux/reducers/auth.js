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
  userProfileImage:'',
  currentUser:{}
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
    setUserProfileImage: (state, action) => {
      
      state.userProfileImage = action.payload;
    },
    setCurrentUser:(state, action)=>{
      
      state.currentUser = action.payload;
    }
  },
});

export const { setAuthUser, logOut,setUserProfileImage, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;