import React, { useState, useEffect } from "react";
import "./Home.css";
import { Header, Icon } from "semantic-ui-react";
import dateFormat from "dateformat";
import { fetchExpenses } from "../Operations";

const Home = ({ auth, categories }) => {
  const [yearlyExpenses, setYearlyExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  const getSum = (total, obj) => total + obj.amount;

  const yearly = () => {
    const year = dateFormat(Date(), "yyyy");
    const start_date = `${year}-01-01`;
    const end_date = dateFormat(Date(), "yyyy-mm-dd");
    return {
      start_date: start_date,
      end_date: end_date,
    };
  };

  const monthly = () => {
    const year_month = dateFormat(Date(), "yyyy-mm");
    const start_date = `${year_month}-01`;
    const end_date = dateFormat(Date(), "yyyy-mm-dd");
    return {
      start_date: start_date,
      end_date: end_date,
    };
  };

  useEffect(() => {
    fetchExpenses(auth, monthly).then((response) => {
      setMonthlyExpenses(response.data.reduce(getSum, 0));
    });
    fetchExpenses(auth, yearly).then((response) => {
      setYearlyExpenses(response.data.reduce(getSum, 0));
    });
  }, []);

  return (
    <div className="home">
      <Header size="large" className="blue-color">
        Home
      </Header>
      <div>
        <Header size="medium" className="heading">
          My Expenses Breif
        </Header>
        <div className="expenses">
          <div className="box-container b1">
            <div className="box">
              <Header size="medium" className="heading">
                Yearly Expenses
              </Header>
              <div className="amount-container">
                <Icon name="rupee" className="icon" size="big" />
                <div className="amount">{yearlyExpenses}</div>
              </div>
            </div>
          </div>
          <div className="box-container b2">
            <div className="box">
              <Header size="medium" className="heading">
                Monthly Expenses
              </Header>
              <div className="amount-container">
                <Icon name="rupee" className="icon" size="big" />
                <div className="amount">{monthlyExpenses}</div>
              </div>
            </div>
          </div>
        </div>
        <Header size="medium" className="heading">
          My Expenditure Categories
        </Header>
        <div className="categories">
          {categories.map((value, index) => (
            <div key={index} className="category-container">
              <div className="category">
                <Icon name="payment" className="icon" size="big" />
                <div className="text">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
