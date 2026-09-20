import React from "react";
import Header from "./Header"

function ExpenseItems(props){
    
    return (
    <div className="listItems">
    <ul>{props.allExpense.map((item)=>{
        return (
            <li key={item.id}>
                {item.description}
                {item.amount}
                {item.date}
        </li>
        );
    })}
    </ul>
    </div>
    )
 }

 export default ExpenseItems;