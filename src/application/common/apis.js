const BASE_URL = 'https://expense-manager-shipmnts.herokuapp.com/'

/* Register/Login */
export const REGISTER = `${BASE_URL}api/v1/register`
export const LOGIN = `${BASE_URL}api/v1/login`

/* USER GET APIS */
export const GET_EXPENSES = `${BASE_URL}api/v1/user/expense_details`
export const GET_CATEGORIES = `${BASE_URL}api/v1/user/categories`

/* USER POST APIS */
export const ADD_EXPENSE = `${BASE_URL}api/v1/user/add_expense`
export const ADD_CATEGORY = `${BASE_URL}api/v1/user/add_category`
