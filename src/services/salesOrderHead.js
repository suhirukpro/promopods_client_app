import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import {
  GET_SALES_ORDER_HEAD,
  CREATE_SALES_ORDER_HEAD,
  UPDATE_SALES_ORDER_HEAD,
  DELETE_SALES_ORDER_HEAD,
  GET_SALES_ORDER_HEADS_BY_CUSTOMER,
} from "./endpoint";

export const getAllSalesOrderHeadsBydCustomer = async (customerId) => {
  try {
    const res = await axiosClient({
      url: GET_SALES_ORDER_HEADS_BY_CUSTOMER,
      method: "GET",
      headers: authHeaders(),
      params: { customerId }, });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const createSalesOrderHead = async (data) => {
  try {
    const res = await axiosClient({
      url: CREATE_SALES_ORDER_HEAD,
      method: "POST",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? res.data : false;
  } catch (error) {
    return null;
  }
};

export const updateSalesOrderHead = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_SALES_ORDER_HEAD,
      method: "PUT",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const deleteSalesOrderHead = async (salesOrderHeadId) => {
  try {
    const res = await axiosClient({
      url: DELETE_SALES_ORDER_HEAD,
      method: "DELETE",
      headers: authHeaders(),
      params: { salesOrderHeadId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
