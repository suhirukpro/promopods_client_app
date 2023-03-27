import { message } from "antd";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from "../utils/constants";
import { authHeaders } from "../utils/helper/authHeaders";
import { axiosClient } from "./client";
import {
  GET_COHORT,
  CREATE_COHORT,
  UPDATE_COHORT,
  DELETE_COHORT,
} from "./endpoint";

export const getAllCohortData = async () => {
  try {
    const res = await axiosClient({
      url: GET_COHORT,
      method: "GET",
      headers: authHeaders(),
    });
    return res.status === SUCCESS_STATUS ? res.data : null;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};

export const createCohort = async (data) => {
  try {
    const res = await axiosClient({
      url: CREATE_COHORT,
      method: "POST",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const updateCohort = async (data) => {
  try {
    const res = await axiosClient({
      url: UPDATE_COHORT,
      method: "PUT",
      headers: authHeaders(),
      data,
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    return null;
  }
};

export const deleteCohort = async (cohortId) => {
  try {
    const res = await axiosClient({
      url: DELETE_COHORT,
      method: "DELETE",
      headers: authHeaders(),
      params: { cohortId },
    });
    return res.status === SUCCESS_STATUS ? true : false;
  } catch (error) {
    message.error(DEFAULT_ERROR_MESSAGE);
    return null;
  }
};
