import React, { useEffect } from "react";
import axios from "axios";
import "./PostLogin.css";
import Home from "./home/Home";
import Add from "./add/Add";
import Stats from "./stats/Stats";
import {
  GET_CATEGORIES,
  GET_EXPENSES,
  ADD_CATEGORY,
  ADD_EXPENSE,
} from "../../common/apis";

const PostLogin = ({ route, auth }) => {
  console.log(auth);
  const config = {
    headers: { Authorization: auth },
  };
  useEffect(() => {
    axios.get(GET_CATEGORIES, config).then((response) => {console.log(response)});
  }, []);

  switch (route) {
    case "home":
      return <Home />;
    case "add":
      return <Add />;
    case "stats":
      return <Stats />;
    default:
      return <></>;
  }
};

export default PostLogin;
