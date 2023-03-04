import store from "../../redux/store";
import { AUTH, BEARER } from "../constants";

export const authHeaders = () => {
  const state = store.getState();
  const { auth } = state;
  return { [AUTH]: `${BEARER} ${auth.authUser?.token}` };
};