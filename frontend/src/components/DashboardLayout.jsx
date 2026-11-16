import React from "react";
import {useEffect} from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function DashboardLayout({ notification, contextData }) {

  useEffect(() => {
  const savedToken = localStorage.getItem("authToken");
  const savedUser = localStorage.getItem("currentUser");

  if (savedToken && savedUser) {
    const userObject = JSON.parse(savedUser);
    const id = userObject.id || userObject.user_id;
    console.log("User object:", userObject, "Extracted ID:", id); 
    contextData.getAllExpenses(id); 
  }
}, []);


  const navigate = useNavigate();
  function handleNewExpenseClick() {
    contextData.setInputData({
      description: "",
      amount: "",
      date: new Date()
    });
  }

    function handleLogout(){
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      contextData.setAllExpense([]);
      navigate("/",{ replace: true });
      console.log("clicked logout")
    }

  return (
    <div className="app-wrapper">
      <Header />
      <section className="dashboard-top-panel">
          {/* <h3>Spending Overview</h3> */}
       

        {/* Right or Bottom: Your Navigation Links */}
        <nav className="action-links">
          <div className="overview-allexpense">
            <NavLink to="/dashboard" end>
            Overview
          </NavLink>
          <NavLink to="/dashboard/all-expenses">
            All Expenses
          </NavLink>
          </div>
          <NavLink to="/dashboard/create-expense" onClick={handleNewExpenseClick} className="new-expense-btn">
            <AddOutlinedIcon/> New Expense
          </NavLink>
        </nav>
      </section>
      <div className="aside-main-wrapper">
            <aside>
                <NavLink to="/dashboard" className="nav-icon" title="Dashboard" >
                  <DashboardOutlinedIcon className="icon"/> Dashboard
                </NavLink>
                <NavLink to="/dashboard" className="nav-icon" title="Profile">
                  <ManageAccountsOutlinedIcon className="icon"/> Profile
                </NavLink>
                <NavLink to="/dashboard" className="nav-icon" title="Budget">
                  <ManageHistoryOutlinedIcon className="icon"/> Budget
                </NavLink>
                <NavLink to="/dashboard" className="nav-icon" title="Payment">
                  <AddCardOutlinedIcon className="icon"/> Payment
                </NavLink>
                
                <div className="aside-footer">
                  <hr/>
                <NavLink to="/dashboard" className="nav-icon" title="Settings">
                  <SettingsOutlinedIcon className="icon"/> Settings
                </NavLink>
                <NavLink to="/dashboard" className="nav-icon" title="Help">
                  <HelpOutlinedIcon className="icon"/> Help
                </NavLink>
               
                <button type="button" className="nav-icon logout-btn" onClick={handleLogout} title="Logout">
                  <LogoutOutlinedIcon className="icon"/> Logout
                </button>
                </div>
            </aside>
            <main className="dashboard-content">
                <Outlet context={contextData} />
            </main>
      </div>

      {notification && (
        <div className="toast-notification">
          {notification}
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
