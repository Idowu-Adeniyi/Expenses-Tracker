import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios"; 

function AllExpenses() {
  // Grab shared properties automatically from the Layout Context
  const { allExpense, deleteExpense, setInputData } = useOutletContext();
  const navigate = useNavigate();

  const totalExpenses = allExpense.reduce((accumulator, item) => {
    const amount = Number(item.amount) || 0; 
    return accumulator + amount;
  }, 0);

  // Pre-fill form state configuration details and swap screens gracefully via URLs
  async function triggerEditRoute(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses/${id}`);
      
      // Parse the date string safely into a JS object for the Datepicker element
      const fetchedExpense = response.data;
      fetchedExpense.date = fetchedExpense.date ? new Date(fetchedExpense.date) : new Date();
      
      setInputData(fetchedExpense);
      navigate("/dashboard/create-expense");
    } catch(error) {
      console.error(error.message);
      alert("Failed to fetch expense details for editing");
    }
  }

  return (
    <div className="list-items">
      <h2>All Expenses</h2>
      <div className="table-head">
        <p>Invoice</p>
        <p>Amount</p>
        <p>Date</p>        
        <p>Action</p>        
      </div>
      <ul>
        {allExpense.map((item) => {
          return (
            <li key={item.id} className="list-data">
              <span className="row-data">{item.description}</span>
              <span className="row-data">$ {item.amount} CAD</span> 
              <span className="row-data">
                {item.date ? item.date.split("T")[0] : ""}
              </span>
              <div className="btn-action">
                <button 
                  onClick={() => triggerEditRoute(item.id)} 
                  className="btn-edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteExpense(item.id)} 
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="total-expense-footer">
        <p><strong>Total Expenses:</strong> $ {totalExpenses.toFixed(2)} CAD</p>
      </div>
    </div>
  );
}

export default AllExpenses;


