import React, {useEffect} from "react";
import DatePicker from "react-datepicker";
import { useOutletContext, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateExpense() {
  // Grab shared properties automatically from the Layout
  const { 
    inputData, 
    setInputData, 
    handleChange, 
    handleDateChange, 
    handleAddNewExpense, 
    handleUpdateExpenseList, 
    showToast 
  } = useOutletContext();

  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();

    const description = inputData.description;
    const amount = inputData.amount;
    const rawDate = inputData.date;

    if (!description || !amount || !rawDate || description.trim() === "") {
      showToast("Please fill out all fields!");
      return;
    }
    
    // Safety verification check if it's a raw date object
    const parsedDate = rawDate instanceof Date ? rawDate : new Date(rawDate);
    const formattedDate = parsedDate.toISOString().split("T")[0];

    const savedUser = localStorage.getItem("currentUser");
    let activeUserId = null;

    if (savedUser) {
      const userObject = JSON.parse(savedUser);
      activeUserId = userObject.id || userObject.user_id;
    }

    try {
      if (inputData.id) {
        const response = await axios.put(`http://localhost:3000/api/expenses/${inputData.id}`, {
          description: description, 
          amount: Number(amount), 
          date: formattedDate
        });
        
        handleUpdateExpenseList(response.data);
        showToast("Expense updated successfully!");
      } else {
        const response = await axios.post("http://localhost:3000/api/expenses", {
          description: description, 
          amount: Number(amount), 
          date: formattedDate,
          user_id: activeUserId 
        });

        handleAddNewExpense(response.data);
        showToast("Expense saved successfully!");
      }
      
      setInputData({
        description: "",
        amount: "",
        date: new Date()
      });
      
      // Instantly route back to main lists view naturally
      navigate("/dashboard");
        
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
            selected={inputData.date instanceof Date ? inputData.date : new Date(inputData.date)} 
            onChange={(selectedDate) => handleDateChange(selectedDate)} 
            inline 
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="btn-container">
        <button type="submit">
          {inputData.id ? "Update Expense" : "+ Add Expense"}
        </button>
      </div>
    </form>
  );
}

export default CreateExpense;




