import React, { useState, useEffect } from "react";
import "./PostLogin.css";
import Home from "./home/Home";
import Add from "./add/Add";
import Stats from "./stats/Stats";
import { getCategories } from "./Operations";

const PostLogin = ({ route, auth }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(auth).then((response) => {
      setCategories(response.data.categories);
    });
  }, [auth]);

  switch (route) {
    case "home":
      return <Home key={route} auth={auth} categories={categories} />;
    case "add":
      return (
        <Add
          key={route}
          auth={auth}
          categories={categories}
          updateCategories={setCategories}
        />
      );
    case "stats":
      return <Stats key={route} auth={auth} categories={categories} />;
    default:
      return <></>;
  }
};

export default PostLogin;
