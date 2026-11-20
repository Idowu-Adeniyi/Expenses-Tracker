// import React from "react";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import axios from "axios"; 
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// function AllExpenses() {
//   // Grab shared properties automatically from the Layout Context
//   const { allExpense, deleteExpense, setInputData } = useOutletContext();
//   const navigate = useNavigate();

//   const totalExpenses = allExpense.reduce((accumulator, item) => {
//     const amount = Number(item.amount) || 0; 
//     return accumulator + amount;
//   }, 0);

//   // Pre-fill form state configuration details and swap screens gracefully via URLs
//   async function triggerEditRoute(id) {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/expenses/${id}`);
      
//       // Parse the date string safely into a JS object for the Datepicker element
//       const fetchedExpense = response.data;
//       fetchedExpense.date = fetchedExpense.date ? new Date(fetchedExpense.date) : new Date();
      
//       setInputData(fetchedExpense);
//       navigate("/dashboard/create-expense");
//     } catch(error) {
//       console.error(error.message);
//       alert("Failed to fetch expense details for editing");
//     }
//   }

//   return (
//     <div className="list-items">
//       <h2>All Expenses</h2>
//       <div className="table-head">
//         <p>Date</p> 
//         <p>Invoice</p>
//         <p>Amount</p>    
//         <p>Actions</p>        
//       </div>
//       <ul>
//         {allExpense.map((item) => {
//           return (
//             <li key={item.id} className="list-data">
//               <span className="row-data">
//                 {item.date ? item.date.split("T")[0] : ""}
//               </span>
//               <span className="row-data">{item.description}</span>
//               <span className="row-data">${item.amount} CAD</span> 
//               <div className="btn-action">
//                 <BorderColorOutlinedIcon
//                 onClick={() => triggerEditRoute(item.id)} 
//                   className="btn-edit"
//                 />
//                 <DeleteOutlinedIcon 
//                 onClick={() => deleteExpense(item.id)} 
//                   className="btn-delete"
//                 />

//               </div>
//             </li>
//           );
//         })}
//       </ul>
//       <div className="total-expense-footer">
//         <p>Total Expenses:<strong> ${totalExpenses.toFixed(2)} CAD</strong></p>
//       </div>
//     </div>
//   );
// }

// export default AllExpenses;


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


