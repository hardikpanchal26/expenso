import React, { useState, useEffect } from "react";
import "./Stats.css";
import { Header, Table } from "semantic-ui-react";
import dateFormat from "dateformat";
import { fetchExpenses } from "../Operations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Stats = ({ auth, categories }) => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [dates, setDates] = useState({
    start_date: "2001-01-01",
    end_date: dateFormat(Date(), "yyyy-mm-dd"),
  });

  const leastDate = "2001-01-01";
  const maxDate = dateFormat(Date(), "yyyy-mm-dd");

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

  const validateStartDate = (date) => {
    const min = new Date(leastDate);
    const end = new Date(endDate);
    if (date > end || date < min) {
      alert("Invalid start date");
      return;
    }
    setStartDate(date);
    setDates({ ...dates, start_date: dateFormat(date, "yyyy-mm-dd") });
  };

  const validateEndDate = (date) => {
    const max = new Date(maxDate);
    const start = new Date(startDate);
    if (date < start || date > max) {
      alert("Invalid end date");
      return;
    }
    setEndDate(date);
    setDates({ ...dates, end_date: dateFormat(date, "yyyy-mm-dd") });
  };

  useEffect(() => {
    fetchExpenses(auth, dates, category).then((response) => {
      setExpenses(response.data);
    });
  }, [category, dates]);
  return (
    <div className="stats">
      <Header size="large" className="blue-color">
        Stats
      </Header>
      <div>
        <Header size="medium" className="heading">
          Choose Filters
        </Header>
        <div className="filters-container">
          <div className="select mb-4">
            <div className="blue-color mb-2">Category filter</div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-</option>
              {categories.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <div className="blue-color mb-2">Date filter</div>
            <div className="date-picker-stat">
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => validateStartDate(date)}
                />
              </div>
              <div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => validateEndDate(date)}
                />
              </div>
            </div>
          </div>
        </div>
        <Header size="medium" className="heading">
          Expenses Data (filtered)
        </Header>
        <div className="data-container">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Added at</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {expenses.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.amount}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>
                    {dateFormat(item.date_added, "dd mm yyyy, dddd")}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Stats;
