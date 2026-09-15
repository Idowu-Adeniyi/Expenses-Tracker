import React from "react";

function Header(){
    return(
        <div className = "header-container">
            <h1 className="logoText">Expense Tracker</h1>
            <div className="header-btn">
                <p>All Expenses</p>
                <p><span className="newExpenseText">New Expense</span></p>
            </div>
        </div>
    )
}

export default Header;