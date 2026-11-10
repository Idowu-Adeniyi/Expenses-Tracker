import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview"; // Your default route overview
import CreateExpense from "./pages/dashboard/CreateExpense";
import AllExpenses from "./pages/dashboard/AllExpenses";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [allExpense, setAllExpense] = useState([]);
  const [notification, setNotification] = useState("");
  const [inputData, setInputData] = useState({
    description: "",
    amount: "", 
    date: new Date()
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function showToast(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  }

  function handleDateChange(selectedDate) {
    setInputData((prevData) => ({
      ...prevData,
      date: selectedDate
    }));
  }

  async function getAllExpenses(userIdFromArgument) {
    let targetId = userIdFromArgument;
    if (!targetId) {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        const userObject = JSON.parse(savedUser);
        targetId = userObject.id || userObject.user_id;
      }
    }
    if (!targetId) return;
    
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses/user/${targetId}`);
      setAllExpense(response.data);
    } catch(error) {
      console.error("Failed to load Expenses from database", error);
    }
  }
  
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("currentUser");
    if(savedToken && savedUser){
      const userObject = JSON.parse(savedUser);
      getAllExpenses(userObject.id);
    }
  }, []);

  function handleAddNewExpense(savedExpense) {
    setAllExpense((prevExpense) => [...prevExpense, savedExpense]);
  }

  function handleUpdateExpenseList(updatedExpense) {
    setAllExpense((prevExpense) => 
      prevExpense.map((item) => item.id === updatedExpense.id ? updatedExpense : item)
    );
  }

  async function deleteExpense(id) {
    const userConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if(!userConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/expenses/${id}`);
      setAllExpense((prevExpense) => prevExpense.filter((item) => item.id !== id));
      setTimeout(() => alert("Item deleted successfully"), 100); 
    } catch(error) {
      console.error(error.message);
      alert("Failed to delete the item. Please try again.");
    } 
  }

  // Pack up state and handler operations into a clean bundle for useOutletContext()
  const contextData = {
    allExpense,
    inputData,
    setInputData,
    handleChange,
    handleDateChange,
    handleAddNewExpense,
    handleUpdateExpenseList,
    showToast,
    deleteExpense,
    getAllExpenses
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout Core Wrapper */}
        <Route 
          path="/dashboard" 
          element={<DashboardLayout notification={notification} contextData={contextData} />}
        >
          {/* Index Route handles the default root endpoint: /dashboard */}
          <Route index element={<AllExpenses />} />
          
          {/* Form Routing endpoints: /dashboard/create-expense */}
          <Route path="create-expense" element={<CreateExpense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;








