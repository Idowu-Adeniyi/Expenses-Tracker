import { useState, useEffect } from 'react'
import axios from 'axios'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import ExpenseItems from './components/ExpenseItems'

function App() {
  // This state tracks your complete list of expenses
  const [expense, setExpense] = useState([]);
  const [allExpense, setAllExpense] = useState([]);
  const [showForm, setShowForm]=useState(false);
  

  //Handle Show Expense
function handleShowForm(){
  setShowForm(true);
}


   async function getAllExpenses(){
    try{
      // Get all expense from backend api route
      const response = await axios.get("http://localhost:3000/api/expenses");

      console.log("1. API Status:", response.status);
      console.log("2. Fetched Data:", response.data);

      // put the database items into the state
      setAllExpense(response.data);
    }catch(error){
      console.error("Failed to load Expenses from database", error)
    }
}

useEffect(()=>{
     getAllExpenses();
},[]);


  // When form successfully saves an item, it will pass it here to update the list
  function handleAddNewExpense(savedExpense){
    setExpense((prevExpense)=>{
      return [...prevExpense, savedExpense];
    });
  }


  function deleteItem(){
    alert("Item has been deleted!");
  }



  return (
    <>
      <Header
          getAllExpenses={() => {
              setShowForm(false);
              getAllExpenses();
            }} 
              handleShowForm={handleShowForm}
           />

     {showForm ?  (
      <Form handleAddNewExpense={handleAddNewExpense}/> ):(<ExpenseItems allExpense={allExpense} deleteItem={deleteItem} />)}
      
    </>
  )
}

export default App
