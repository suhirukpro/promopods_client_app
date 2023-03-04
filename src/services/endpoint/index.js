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
export const GET_CUSTOMER = `/Customer/GetAllCustomer`;
export const CREATE_CUSTOMER = `/Customer/PostCustomer`;
export const UPDATE_CUSTOMER = `/Customer/PutCustomer`;
export const DELETE_CUSTOMER = `/Customer/DeleteCustomer`;