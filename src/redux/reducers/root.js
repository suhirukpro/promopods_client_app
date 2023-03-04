import { combineReducers } from "redux";

import auth from "./auth";
import sideMenu from "./sideMenu";
import salesOrderHead from "./salesOrderHead";


const appReducer = combineReducers({
  auth,
  sideMenu,
  salesOrderHead
});

export default appReducer;