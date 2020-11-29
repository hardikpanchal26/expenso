import axios from "axios";
import {
  GET_CATEGORIES,
  FETCH_EXPENSES,
  ADD_CATEGORY,
  ADD_EXPENSE,
} from "../../common/apis";

export const getCategories = (auth, data) => {
  const config = {
    headers: { Authorization: auth },
  };
  return axios.get(GET_CATEGORIES, config);
};

export const fetchExpenses = (auth, category = "", data) => {
  const config = {
    headers: { Authorization: auth },
  };
  if (category !== "") category = `/${category}`;
  return axios.post(`${FETCH_EXPENSES}${category}`, data, config);
};

export const addCategory = (auth, data) => {
  const config = {
    headers: { Authorization: auth },
  };
  return axios.post(ADD_CATEGORY, data, config);
};

export const addExpense = (auth, data) => {
  const config = {
    headers: { Authorization: auth },
  };
  return axios.post(ADD_EXPENSE, data, config);
};
