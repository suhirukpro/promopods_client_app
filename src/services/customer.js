import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import {
  GET_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from "./endpoint";

export const getAllCustomerData = async () => {
  try {
    const res = await axiosClient({
      url: GET_CUSTOMER,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const createCustomer = async (data) => {
  try {
    const res = await axiosClient({
      url: CREATE_CUSTOMER,
      method: "POST",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const updateCustomer = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_CUSTOMER,
      method: "PUT",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const res = await axiosClient({
      url: DELETE_CUSTOMER,
      method: "DELETE",
      headers: authHeaders(),
      params: { customerId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
