import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import {getTotalExpenses} from "/src/utils/calculateStats.js";
import {formatCurrency} from "/src/utils/formatCurrency.js";
import ExpenseTable from "./ExpenseTable";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SafetyCheckOutlinedIcon from '@mui/icons-material/SafetyCheckOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';


function DashboardOverview() {
  const { allExpense } = useOutletContext();

  const totalExpenses = getTotalExpenses(allExpense);

  const user = localStorage.getItem("currentUser");
  const loggedInUser = JSON.parse(user)
  console.log(loggedInUser.username);

  return (
    <div className="overview-container">
      <h2>Dashboard Overview</h2>
      <p>Welcome back <strong>{loggedInUser.username}</strong>! Select an option above or view your recent activity here.</p>
     <div className="analytic-card-container">

         <div className="analytic-card card-1">
           <p className="analytic-text"><MonetizationOnOutlinedIcon className="analytic-icon"/> Total Expenses</p>
           <p className="analytic-value">{formatCurrency(totalExpenses)}</p>
         </div>

         <div className="analytic-card card-2">
           <p className="analytic-text"><SafetyCheckOutlinedIcon className="analytic-icon" />Remaining Budget</p>
           <p className="analytic-value">$50000</p>
         </div>

         <div className="analytic-card card-3">
           <p className="analytic-text"><TrendingUpOutlinedIcon className="analytic-icon" />Average Daily Spend</p>
           <p className="analytic-value">$50000</p>
         </div>

         <div className="analytic-card card-4">
           <p className="analytic-text"><StarRateOutlinedIcon className="analytic-icon" />Top Spending Category</p>
           <p className="analytic-value">Groceries</p>
         </div>
     </div>
     <div className="recent-expenses-section list-items">
        <ExpenseTable 
          expenses={allExpense.slice(0, 5)} 
          title="Recent Expenses" 
          showActions={false} 
        />
      </div>
      <div className="view-all-expenses">
        <Link to="/dashboard/all-expenses">View All Expenses →</Link>
      </div>
    </div>
  );
}

export default DashboardOverview;
