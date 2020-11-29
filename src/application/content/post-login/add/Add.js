import React, { useState, useEffect } from "react";
import "./Add.css";
import classNames from "classnames";
import { Button, Header, Icon } from "semantic-ui-react";
import dateFormat from "dateformat";
import { addCategory, addExpense } from "../Operations";

const Add = ({ auth, categories, updateCategories }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (formData.category === "")
      setFormData({ ...formData, category: categories[0] });
  }, [categories]);

  const selectCategory = (value) => {
    setFormData({ ...formData, category: value });
  };

  const onChangeCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const onBlurCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const addNewCategory = (value) => {
    if (newCategory.length <= 0) return;
    addCategory(auth, { name: newCategory }).then((response) => {
      console.log(response.data.category_resource);
      if (response.data.category_resource !== null) {
        updateCategories([...categories, newCategory]);
      }
      setFormData({ ...formData, category: newCategory });
      setNewCategory("");
    });
  };

  const onChangeDesciption = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const onChangeAmount = (e) => {
    setFormData({ ...formData, amount: e.target.value });
  };

  const onBlurDesciption = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const onBlurAmount = (e) => {
    setFormData({ ...formData, amount: e.target.value });
  };

  const onClickAdd = () => {
    if (formData.amount.length <= 0 || formData.category.length <= 0) {
      alert("Invalid input data. Please enter valid values");
      return;
    }
    addExpense(auth, formData).then(
      (response) => {
        alert("Successfully added new expense");
        setFormData({
          amount: "",
          category: categories[0],
          description: "",
        });
      },
      (error) => {
        alert("Invalid input. Please enter valid values");
        setFormData({
          amount: "",
          category: categories[0],
          description: "",
        });
      }
    );
  };

  return (
    <div className="add-expense">
      <Header size="large" className="blue-color">
        Add Expense
      </Header>
      <div>
        <Header size="medium" className="amount-heading">
          Amount
        </Header>
        <div className="amount">
          <Icon name="rupee" size="big" />
          <input
            type="text"
            className="amount-input"
            placeholder="Enter"
            value={formData.amount}
            onBlur={onBlurAmount}
            onChange={onChangeAmount}
          />
        </div>
        <div className="date">
          <Icon
            name="calendar alternate outline"
            className="blue-color"
            size="big"
          />
          <Header size="medium" className="blue-color date-heading">
            {dateFormat(Date(), "dddd, dS mmmm")}
          </Header>
        </div>
      </div>
      <Header size="medium" className="categories-heading">
        Select Category / Add and Select new Category
      </Header>
      <div className="categories">
        {categories.map((value, index) => (
          <div key={index} className="category-container">
            <div
              className={classNames("category", {
                selected: formData.category === value,
              })}
              onClick={() => selectCategory(value)}
            >
              <Icon name="payment" className="icon" size="big" />
              <div className="text">{value}</div>
            </div>
          </div>
        ))}
        <div className="category-container">
          <div className="category add-new">
            <Icon
              name="plus circle"
              className={classNames("icon", { disabled: newCategory === "" })}
              size="huge"
              onClick={addNewCategory}
            />
            <input
              type="text"
              className="input-category"
              value={newCategory}
              placeholder="Enter Category"
              onChange={onChangeCategory}
              onBlur={onBlurCategory}
            />
          </div>
        </div>
      </div>
      <Header size="medium" className="description-heading">
        Description
      </Header>
      <textarea
        className="textarea-input"
        placeholder="Enter here..."
        value={formData.description}
        onBlur={onBlurDesciption}
        onChange={onChangeDesciption}
      ></textarea>
      <Button
        primary
        onClick={(e) => {
          e.preventDefault();
          onClickAdd();
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default Add;
