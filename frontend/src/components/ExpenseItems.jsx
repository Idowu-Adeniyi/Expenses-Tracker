import React from "react";
import Header from "./Header"

function ExpenseItems(props){
    
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
                <span className="row-data">{item.date}</span>
                <div className="btn-action">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                </div>
        </li>
        );
    })}
    </ul>
    </div>
    )
 }

 export default ExpenseItems;