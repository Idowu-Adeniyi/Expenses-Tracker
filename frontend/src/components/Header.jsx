import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {

  function handleNewExpenseClick(){
    if(props.setInputData) {
      props.setInputData({
        description: "",
        amount: "",
        date: new Date()
      });
    }
  }
  return (
    <div className="header-container">
      <h1 className="logoText">Expense Tracker</h1>
      <div className="header-btn">
        <p>
          {/* end ensures it only matches exactly "/dashboard" */}
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => isActive ? "active" : ""}
          >
            All Expenses
          </NavLink>
        </p>
        <p>
          <NavLink 
            to="/dashboard/create-expense" 
            onClick={handleNewExpenseClick}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            New Expense
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Header;

