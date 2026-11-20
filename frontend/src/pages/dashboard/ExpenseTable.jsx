import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function ExpenseTable({ expenses = [], title = "All Expenses", showActions = true }) {
  const { deleteExpense, setInputData } = useOutletContext();
  const navigate = useNavigate();

  async function triggerEditRoute(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses/${id}`);
      const fetchedExpense = response.data;
      fetchedExpense.date = fetchedExpense.date ? new Date(fetchedExpense.date) : new Date();

      setInputData(fetchedExpense);
      navigate("/dashboard/create-expense");
    } catch (error) {
      console.error(error.message);
      alert("Failed to fetch expense details for editing");
    }
  }

  return (
    <>
      <h2>{title}</h2>
      <div className="table-head">
        <p>Date</p>
        <p>Description</p>
        <p>Amount</p>
        {showActions && <p>Actions</p>}
      </div>
      <ul>
        {expenses.map((item) => (
          <li key={item.id} className="list-data">
            <span className="row-data">
              {item.date ? item.date.split("T")[0] : ""}
            </span>
            <span className="row-data">{item.description}</span>
            <span className="row-data">${item.amount} CAD</span>
            
            {showActions && (
              <div className="btn-action">
                <BorderColorOutlinedIcon
                  onClick={() => triggerEditRoute(item.id)}
                  className="btn-edit"
                />
                <DeleteOutlinedIcon
                  onClick={() => deleteExpense(item.id)}
                  className="btn-delete"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ExpenseTable;
