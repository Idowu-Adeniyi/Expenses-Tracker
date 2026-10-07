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
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState("");
  const [editingExpense, setEditingExpense] = useState(null); 
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [inputData, setInputData] = useState({
    description: "",
    amount: "", 
    date: new Date()
  });

  function handleChange(e) {
    const { name, value } = e.target
    setInputData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  function showToast(message) {
    setNotification(message);
        
    // Make it disappear automatically after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  function handleDateChange(selectedDate) {
    setInputData((prevData) => {
      return {
        ...prevData,
        date: selectedDate
      };
    });
  }
  
  //Handle Show Expense
  function handleShowForm() {
    setShowForm(true);
  }

  async function getAllExpenses() {
    try {
      // Get all expense from backend api route
      const response = await axios.get("http://localhost:3000/api/expenses");

      console.log("1. API Status:", response.status);
      console.log("2. Fetched Data:", response.data);

      // put the database items into the state
      setAllExpense(response.data);
    } catch(error) {
      console.error("Failed to load Expenses from database", error)
    }
  }

  useEffect(() => {
    getAllExpenses();
  }, []);

  // When form successfully saves an item, it will pass it here to update the list
  function handleAddNewExpense(savedExpense) {
    setExpense((prevExpense) => {
      return [...prevExpense, savedExpense];
    });
  }

  // Updating the List Array
  function handleUpdateExpenseList(updatedExpense) {
    setAllExpense((prevExpense) => {
      return prevExpense.map((item) => {
        //if the ID matches the edited, replace it with new data
        return item.id === updatedExpense.id ? updatedExpense : item;
      });
    });
    // Send the user back to the list view
    setShowForm(false);
  }

  async function deleteExpense(id) {
    //Confirmation popup and store true/false
    const userConfirmed = window.confirm("Are you sure you want to delete this expense?")
    if(!userConfirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/expenses/${id}`)

      setAllExpense((prevExpense) => {
        return prevExpense.filter((item) => {
          return item.id !== id;
        });
      });
   
      setTimeout(() => {
        alert("Item deleted successfully")
      }, 100); 

    } catch(error) {
      console.error(error.message)
      alert("Failed to delete the item. Please try again.");
    } 
  }

  // Updating expense
  async function updateExpense(id) {
    setShowForm(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses/${id}`);

      setInputData(response.data)
      console.log(response.data.date)

    } catch(error) {
      console.error(error.message)
      alert("Failed to update expense")
    }    
  }

  return (
    <>
      <Header
        showForm={showForm}
        getAllExpenses={() => {
          setShowForm(false);
          getAllExpenses();
        }} 
        handleShowForm={handleShowForm}
      />

      {showForm ? (
        <Form 
          handleAddNewExpense={handleAddNewExpense}
          handleUpdateExpenseList={handleUpdateExpenseList}
          inputData={inputData}
          showToast={showToast} 
          handleChange={handleChange} 
          handleDateChange={handleDateChange} 
          setInputData={setInputData} 
        /> 
      ) : (
        <ExpenseItems 
          allExpense={allExpense} 
          deleteExpense={deleteExpense} 
          updateExpense={updateExpense} 
        />
      )}

      {notification && (
        <div className="toast-notification">
          {notification}
        </div>
      )}
    </>
  )
}

export default App;
