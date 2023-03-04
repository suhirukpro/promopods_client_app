import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import { DELETE_USER, SIGN_IN, SIGN_UP, UPDATE_USER, GET_ALL_USERS } from "./endpoint";

export const getAllUsers = async () => {
  try {
    const res = await axiosClient({
      url: GET_ALL_USERS,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res?.data : [];
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const userSingIn = async (userDetails) => {
  try {
    const res = await axiosClient({
      url: SIGN_IN,
      method: "GET",
      params: userDetails,
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const userSingUp = async (data) => {
  try {
    const res = await axiosClient({
      url: SIGN_UP,
      method: "POST",
      data,
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(error.response.data.message);
    return null;
  }
};

export const updateUser = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_USER,
      method: "PUT",
      data,
    });
    return res.status === SUCCESS_STATUS ? res?.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axiosClient({
      url: DELETE_USER,
      method: "DELETE",
      headers: authHeaders(),
      params: { userId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
