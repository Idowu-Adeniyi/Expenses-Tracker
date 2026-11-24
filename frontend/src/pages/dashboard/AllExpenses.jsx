import React from "react";
import ExpenseTable from "./ExpenseTable";
import { useOutletContext } from "react-router-dom";
import {getTotalExpenses} from "/src/utils/calculateStats.js";
import {formatCurrency} from "/src/utils/formatCurrency.js";

function AllExpenses() {
  const { allExpense } = useOutletContext();

  const totalExpenses = getTotalExpenses(allExpense);

  return (
    <div className="list-items">
      <ExpenseTable expenses={allExpense} title="All Expenses" showActions={true} />
      <div className="total-expense-footer">
        <p>
          Total Expenses:<strong>{formatCurrency(totalExpenses)}</strong>
        </p>
      </div>
    </div>
  );
}

export default AllExpenses;


