const baseUrl1 = process.env.REACT_APP_API_URL1;
const baseUrl2 = process.env.REACT_APP_API_URL2;

export const SIGN_IN = `/Token/get-customer-token`;

//Users
export const SIGN_UP = `/User/PostUser`;
export const UPDATE_USER = `/User/PutUser`;
export const DELETE_USER = `/User/DeleteUser`;
export const GET_ALL_USERS = `User/GetAllUsers`;

//Cohorts
export const GET_COHORT = `/Cohort/GetAllCohort`;
export const CREATE_COHORT = `/Cohort/PostCohort`;
export const UPDATE_COHORT = `/Cohort/PutCohort`;
export const DELETE_COHORT = `Cohort/DeleteCohort`;

//Customers
export const GET_CUSTOMERS = `/Customer/GetAllCustomer`;
export const GET_CUSTOMER = `/Customer/GetCustomer`;
export const CREATE_CUSTOMER = `/Customer/PostCustomer`;
export const UPDATE_CUSTOMER = `/Customer/updateCustomer`;
export const UPDATE_PROFILE_IMAGE = `/image/updateProfileImage`;
export const DELETE_CUSTOMER = `/Customer/DeleteCustomer`;
export const GET_PROFILE_IMAGE = `/image/GetProfileImage`;

//CohortDeliveries
export const GET_COHORT_DELIVERY = `/CohortDelivery/GetAllCohortDelivery`;
export const GET_ALL_COHORT = `/Cohort/GetAllCohort`;
export const CREATE_COHORT_DELIVERY = `/CohortDelivery/PostCohortDelivery`;
export const UPDATE_COHORT_DELIVERY = `/CohortDelivery/PutCohortDelivery`;
export const DELETE_COHORT_DELIVERY = `/CohortDelivery/DeleteCohortDelivery`;
export const GET_ALL_CORHORT_DELIVERIES_BY_CORHORT = `/CohortDelivery/GetAllCohortDeliveryByCohort`;

//SalesOrderHeads
export const GET_SALES_ORDER_HEADS_BY_CUSTOMER = `/SalesOrderHead/GetSalesOrderHeadsByCustomer`;
export const CREATE_SALES_ORDER_HEAD = `/SalesOrderHead/PostSalesOrderHead`;
export const UPDATE_SALES_ORDER_HEAD = `/SalesOrderHead/PutSalesOrderHead`;
export const DELETE_SALES_ORDER_HEAD = `/SalesOrderHead/DeleteSalesOrderHead`;

//SalesOrderLines
export const GET_SALES_ORDER_LINE_BY_SALES_ORDER = `/SalesOrderLine/GetSalesOrderLinesBySalesOrder`;
export const GET_SALES_ORDER_LINE = `/SalesOrderLine/GetAllSalesOrderLine`;
export const CREATE_SALES_ORDER_LINE = `/SalesOrderLine/PostSalesOrderLine`;
export const UPDATE_SALES_ORDER_LINE = `/SalesOrderLine/PutSalesOrderLine`;
export const DELETE_SALES_ORDER_LINE = `/SalesOrderLine/DeleteSalesOrderLine`;