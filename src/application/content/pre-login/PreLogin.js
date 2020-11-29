import React, { useState } from "react";
import "./PreLogin.css";
import { Header, Button } from "semantic-ui-react";
import classNames from "classnames";
import axios from "axios";
import { REGISTER, LOGIN } from "../../common/apis";
import Cookies from 'universal-cookie';

const PreLogin = ({ auth, setAuth, user, setUser, route, setRoute }) => {

  const [formData, setFormData] = useState({
    user_name: {
      value: "",
      error: null,
    },
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputBlur = (e) => {
    setErrorMessage("");
    const target = e.target;
    const newFormData = { ...formData };
    newFormData[target.name].value = target.value;
    setFormData(newFormData);
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    const target = e.target;
    const newFormData = { ...formData };
    newFormData[target.name].value = target.value;
    setFormData(newFormData);
  };

  const loginSubmit = () => {
    axios
      .post(LOGIN, {
        email: formData.email.value,
        password: formData.password.value,
      })
      .then(
        (response) => {
          const cookies = new Cookies();
          cookies.set('auth', response.data.token);
          setAuth(response.data.token);
        },
        (error) => {
          if (error.response.data.message) {
            const message = error.response.data.message;
            setErrorMessage(message);
          } else setErrorMessage("Some error occured. Please try again");
        }
      )
      .catch((error) => console.log(error));
  };

  const registerSubmit = () => {
    axios
      .post(REGISTER, {
        user_name: formData.user_name.value,
        email: formData.email.value,
        password: formData.password.value,
      })
      .then(
        (response) => {
          setUser(response.user);
          loginSubmit();
        },
        (error) => {
          if (error.response.data.message) {
            const message = error.response.data.message;
            setErrorMessage(message);
          } else setErrorMessage("Some error occured. Please try again");
        }
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="App-pre-login">
      <div className="register-login">
        <Header as="h2" className="blue-color">{`${route
          .charAt(0)
          .toUpperCase()}${route.slice(1)}`}</Header>

        {route === "register" && (
          <div>
            <div className="input-container">
              <input
                className="input"
                type="text"
                name="user_name"
                value={formData.user_name.value}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                required
              />
              <label
                className={classNames({
                  valid: formData.user_name.value.length > 0,
                })}
              >
                Username
              </label>
            </div>
          </div>
        )}
        <div>
          <div className="input-container">
            <input
              className="input"
              type="text"
              name="email"
              value={formData.email.value}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              required
            />
            <label
              className={classNames({ valid: formData.email.value.length > 0 })}
            >
              Email
            </label>
          </div>
        </div>
        <div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password.value}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              required
            />
            <label
              className={classNames({
                valid: formData.password.value.length > 0,
              })}
            >
              Password
            </label>
          </div>
        </div>
        <div className="red error-message">{errorMessage}</div>
        <div>
          {route === "register" ? (
            <Button
              primary
              onClick={(e) => {
                e.preventDefault();
                registerSubmit();
              }}
            >
              Register
            </Button>
          ) : (
            <Button
              primary
              onClick={(e) => {
                e.preventDefault();
                loginSubmit();
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreLogin;
