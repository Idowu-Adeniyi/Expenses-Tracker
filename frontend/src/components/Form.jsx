import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Form({ inputData, setInputData, handleChange, handleDateChange, handleAddNewExpense, handleUpdateExpenseList, showToast }) {
   
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Pull values out of the object state for easy validation
    const description = inputData.description;
    const amount = inputData.amount;
    const rawDate = inputData.date;

    // Local input validation check
    if (!description || !amount || !rawDate || description.trim() === "") {
      showToast("Please fill out all fields!");
      return;
    }
    
    // Calendar format into YYYY-MM-DD string
    const formattedDate = rawDate.toISOString().split("T")[0];

    try {
      if (inputData.id) {
        const response = await axios.put(`http://Expense-tracker-backend-env.eba-gzp6whqm.us-east-1.elasticbeanstalk.com/api/expenses/${inputData.id}`, {
          description: description, 
          amount: Number(amount), 
          date: formattedDate
        });
        
        // Passing the updated database row back to App.js to update the list view
        handleUpdateExpenseList(response.data);
        showToast("Expense updated successfully!");
      } else {
        const response = await axios.post("http://Expense-tracker-backend-env.eba-gzp6whqm.us-east-1.elasticbeanstalk.com/api/expenses/", {
          description: description, 
          amount: Number(amount), 
          date: formattedDate
        });

        // The backend sends back the newly saved database row
        const savedExpense = response.data;

        // Send that item backup to APP.jsx to append to the master array
        handleAddNewExpense(savedExpense);

        showToast("Expense saved successfully!");
      }
      
      // clear out the form inputs
      setInputData({
        description: "",
        amount: "",
        date: new Date()
      });
        
    } catch(error) {
      console.error("failed to save to database", error);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-container">
        <h2>{inputData.id ? "Edit Expense" : "New Expense"}</h2>
        <p>{inputData.description}</p>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="description" 
            placeholder="Enter Description" 
            required 
            onChange={handleChange} 
            value={inputData.description}
          />
        </div>
        <div>
          <label htmlFor="user-amount">Enter Amount:</label>
          <input 
            type="number" 
            step="0.01" 
            id="user-amount" 
            name="amount" 
            placeholder="Enter Amount" 
            required 
            onChange={handleChange} 
            value={inputData.amount}
          />
        </div>
        <div className="date-picker">
          <DatePicker 
            selected={inputData.date} 
            onChange={(selectedDate) => {
              return handleDateChange(selectedDate);
            }} 
            inline 
            dateFormat="yyyy-MM-dd"
          />
          {/* <input type="date" id="datePicker" name="date" required/> */}
        </div>
      </div>
      <div className="btn-container">
        <button type="submit">
          {inputData.id ? "Update Expense" : "+ Add Expense"}
        </button>
      </div>
    </form>
  )
}

export default Form;
