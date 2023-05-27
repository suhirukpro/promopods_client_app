import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import {
  GET_COHORT_DELIVERY,
  GET_ALL_COHORT,
  CREATE_COHORT_DELIVERY,
  UPDATE_COHORT_DELIVERY,
  DELETE_COHORT_DELIVERY,
  GET_ALL_CORHORT_DELIVERIES_BY_CORHORT,
} from "./endpoint";

export const getAllCohort = async () => {
  try {
    const res = await axiosClient({
      url: GET_ALL_COHORT,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const getAllCohortDeliveryByCohort = async (cohortId) => {
  
  try {
    const res = await axiosClient({
      url: GET_ALL_CORHORT_DELIVERIES_BY_CORHORT+"?cohortId="+cohortId,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const createCohortDelivery = async (data) => {
  try {
    const res = await axiosClient({
      url: CREATE_COHORT_DELIVERY,
      method: "POST",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const updateCohortDelivery = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_COHORT_DELIVERY,
      method: "PUT",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const deleteCohortDelivery = async (cohortDeliveryId) => {
  try {
    const res = await axiosClient({
      url: DELETE_COHORT_DELIVERY,
      method: "DELETE",
      headers: authHeaders(),
      params: { cohortDeliveryId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
