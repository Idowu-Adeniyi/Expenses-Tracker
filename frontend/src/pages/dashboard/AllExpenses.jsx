import React from "react";
import ExpenseTable from "./ExpenseTable";
import { useOutletContext } from "react-router-dom";

function AllExpenses() {
  const { allExpense } = useOutletContext();

  const totalExpenses = allExpense.reduce((accumulator, item) => {
    const amount = Number(item.amount) || 0;
    return accumulator + amount;
  }, 0);

  return (
    <div className="list-items">
      <ExpenseTable expenses={allExpense} title="All Expenses" showActions={true} />
      <div className="total-expense-footer">
        <p>
          Total Expenses:<strong> ${totalExpenses.toFixed(2)} CAD</strong>
        </p>
      </div>
    </div>
  );
}

export default AllExpenses;


