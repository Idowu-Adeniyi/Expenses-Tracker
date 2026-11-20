import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import ExpenseTable from "./ExpenseTable";
function DashboardOverview() {
  const { allExpense } = useOutletContext();

  const user = localStorage.getItem("currentUser");
  const loggedInUser = JSON.parse(user)
  console.log(loggedInUser.username);

  return (
    <div className="overview-container">
      <h2>Dashboard Overview</h2>
      <p>Welcome back <strong>{loggedInUser.username}</strong>! Select an option above or view your recent activity here.</p>
     <div className="analytic-card-container">
         <div className="analytic-card card-1">
           <p>Total Expenses</p>
           <p>$50000</p>
         </div>
         <div className="analytic-card card-2">
           <p>Remaining Budget</p>
           <p>$50000</p>
         </div>
         <div className="analytic-card card-3">
           <p>Average Daily Spend</p>
           <p>$50000</p>
         </div>
         <div className="analytic-card card-4">
           <p>Top Spending Category</p>
           <p>$50000</p>
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
