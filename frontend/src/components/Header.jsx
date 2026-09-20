import React from "react";



function Header(props){

    return(
        <div className = "header-container">
            <h1 className="logoText">Expense Tracker</h1>
            <div className="header-btn">
                <p>
                    <a href="#" onClick={props.getAllExpenses}>All Expenses</a>
                </p>
                <p>
                    <a href="#">New Expense</a>
                </p>
            </div>
        </div>
    )
}

export default Header;