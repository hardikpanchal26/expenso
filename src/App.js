import "./App.css";
import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import AppHeader from "./application/header/AppHeader";
import AppContent from "./application/content/AppContent";
import AppFooter from "./application/footer/AppFooter";
import Cookies from "universal-cookie";

const App = () => {
  const [user, setUser] = useState({
    user_name: "",
    email: "",
  });
  const [auth, setAuth] = useState(null);
  const [route, setRoute] = useState("login");
  
  useEffect(() => {
    const cookies = new Cookies();
    if (!auth && cookies.get("auth")) {
      setAuth(cookies.get("auth"));
    }

    if (route) {
      if (!auth && !["login", "register"].includes(route)) {
        setRoute("login");
      }
      if (auth && !["home", "add", "stats"].includes(route)) {
        setRoute("home");
      }
    }
  }, [auth, route]);

  return (
    <Container>
      <div className="App">
        <AppHeader
          auth={auth}
          setAuth={setAuth}
          route={route}
          setRoute={setRoute}
        ></AppHeader>
        <AppContent
          auth={auth}
          setAuth={setAuth}
          user={user}
          setUser={setUser}
          route={route}
          setRoute={setRoute}
        ></AppContent>
        <AppFooter auth={auth} setRoute={setRoute}></AppFooter>
      </div>
    </Container>
  );
};

export default App;
