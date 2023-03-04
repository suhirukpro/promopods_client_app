//Validation
export const EMAIL_VALIDATE_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_VALIDATE_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const POSITIVE_NUMBERS_REGEX = /^\d+$/;

export const PASSWORD_VALIDATION_REGEX =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const EXCEL_FILE_TYPE =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

//Date time formats
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME = "YYYY/MM/DD hh:mm";
export const MONTH = "MMMM";
export const YEAR = "YYYY";
export const DAY = "dddd";
export const DATE = "DD";
export const TIME = "hh:mm a";
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const SLOT_START_TIME_FE_FORMAT = "h:mma";
export const DAY_WITH_ORDINAL = "Do";
export const MONTH_DATE_FORMAT = "MMMM DD";
export const MONTH_DATE_YEAR_FORMAT = "MMMM DD YYYY";
export const DEALERSHIP_DATE_FORMAT = "dddd, MMMM Do";

//Print page action
export const PRINT_VIEW_LOADED = "print-view-loaded";

//Status code
export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;

//Auth
export const AUTH_USERNAME = "auth_username";
export const ACCESS_TOKEN = "accessToken";
export const AUTH = "Authorization";
export const BEARER = "Bearer";
export const AUTH_USER = "AuthUser";

//Timeout
export const DEFAULT_TIME_OUT = 100000;

//Messages
export const Messages = {
  DefaultErrorMessage: "Oops something went wrong. Please try again",
  DataNotFound: "No data available",
  DefaultSaveSuccessMessage: "Record saved successfully!",
  DefaultUpdateSuccessMessage: "Record updated successfully!",
  DefaultDeleteSuccessMessage: "Record saved successfully!",
};

export const DEFAULT_ERROR_MESSAGE =
  "Oops something went wrong. Please try again";
export const DATA_NOT_FOUND = "No data available";
export const DEFAULT_SAVE_SUCCESS_MESSAGE = "Record saved successfully!";
export const DEFAULT_UPDATE_SUCCESS_MESSAGE = "Record updated successfully!";
export const DEFAULT_DELETE_SUCCESS_MESSAGE = "Record deleted successfully!";

//enum
export const UserRoles = {
  Admin: 1,
  Staff: 2,
  Customer: 3,
};

export const UserRolesPermission = {
  Admin: "Admin",
  Staff: "Staff",
};

export const SalesOrderHeadStatus = [
  {
    key: "Active",
    value: 1,
  },
  {
    key: "Inactive",
    value: 2,
  },
];

export const SalesOrderLineStatus = [
  {
    key: "Completed",
    value: 1,
  },
  {
    key: "Pending",
    value: 2,
  },
];

export const DeliveryNoteStatus = [
  {
    key: "Completed",
    value: 1,
  },
  {
    key: "Pending",
    value: 2,
  },
];
