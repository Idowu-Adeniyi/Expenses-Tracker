import React from "react";
import Header from "./Header"


function ExpenseItems(props){
    // 1. Calculate total expenses using reduce
    const totalExpenses = props.allExpense.reduce((accumulator, item) => {
        // Convert to Number to prevent bugs if amount is passed as a string
        const amount = Number(item.amount) || 0; 
        return accumulator + amount;
    }, 0);


    return (
    <div className="list-items">
        <h2>All Expenses</h2>
        <div className ="table-head">
            <p>Invoice</p>
            <p>Amount</p>
            <p>Date</p>        
            <p>Action</p>        
        </div>
        <ul>{props.allExpense.map((item)=>{
            
            return (
            
                <li key={item.id} className="list-data">
                    <span className="row-data">{item.description}</span>
                    <span className="row-data">$ {item.amount} CAD</span> 
                    <span className="row-data">{item.date.split("T")[0]}</span>
                    <div className="btn-action">
                        <button className="btn-edit">Edit</button>
                        <button onClick={()=>{
                            props.deleteExpense(item.id)
                        }} className="btn-delete">Delete</button>
                    </div>
            </li>
            
            );
        })}
        </ul>
        <div className="total-expense-footer">
                <p><strong>Total Expense:</strong> $ {totalExpenses.toFixed(2)} CAD</p>
            </div>
    </div>
    
    )
 }

 export default ExpenseItems;