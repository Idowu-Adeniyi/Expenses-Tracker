import React from "react";

function Form(){
    return (
        <div className="form-container">
        <h2>New Expense</h2>
        <div>
            <lable for = "title">Title:</lable>
             <input type="text" id="title" name="description" placeholder="Enter Description" required/>
        </div>
        <div>
            <lable for="user-amount">Enter Amount:</lable>
             <input type="number" id="user-amount" name="amount" placeholder="Enter Amount" required/>
        </div>
        </div>
    )
}

export default Form;