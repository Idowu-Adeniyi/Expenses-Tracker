import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";

function DashboardLayout({ notification, contextData }) {
  function handleNewExpenseClick() {
    contextData.setInputData({
      description: "",
      amount: "",
      date: new Date()
    });
  }

  return (
    <div className="app-wrapper">
      <Header />
      
      <section className="dashboard-top-panel">
        {/* Left or Top: Your Chart Statistics */}
        <div className="chart-box">
          <h3>Spending Overview</h3>
          {/* Your chart component goes here */}
        </div>

        {/* Right or Bottom: Your Navigation Links */}
        <nav className="action-links">
          <NavLink to="/dashboard" end>
            Overview
          </NavLink>
          <NavLink to="/dashboard/all-expenses">
            All Expenses
          </NavLink>
          <NavLink to="/dashboard/create-expense" onClick={handleNewExpenseClick}>
            New Expense
          </NavLink>
        </nav>
      </section>
      <div className="aside-main-wrapper">
            <aside>
                <p>Dashboard</p>
            </aside>
            <main className="dashboard-content">
                <Outlet context={contextData} />
            </main>
      </div>

      {notification && (
        <div className="toast-notifications">
          {notification}
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
