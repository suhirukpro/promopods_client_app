import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import {
  GET_SALES_ORDER_LINE,
  CREATE_SALES_ORDER_LINE,
  UPDATE_SALES_ORDER_LINE,
  DELETE_SALES_ORDER_LINE,
  GET_SALES_ORDER_LINE_BY_SALES_ORDER
} from "./endpoint";

export const getAllSalesOrderLineData = async () => {
  try {
    const res = await axiosClient({
      url: GET_SALES_ORDER_LINE,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const GetSalesOrderLinesBySalesOrder = async (salesOrderId) => {
  try {
    debugger
    const res = await axiosClient({
      url: GET_SALES_ORDER_LINE_BY_SALES_ORDER,
      method: "GET",
      headers: authHeaders(),
      params: { salesOrderId },
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const createSalesOrderLine = async (data) => {
  try {
    const res = await axiosClient({
      url: CREATE_SALES_ORDER_LINE,
      method: "POST",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const updateSalesOrderLine = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_SALES_ORDER_LINE,
      method: "PUT",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const deleteSalesOrderLine = async (salesOrderLineId) => {
  try {
    const res = await axiosClient({
      url: DELETE_SALES_ORDER_LINE,
      method: "DELETE",
      headers: authHeaders(),
      params: { salesOrderLineId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
