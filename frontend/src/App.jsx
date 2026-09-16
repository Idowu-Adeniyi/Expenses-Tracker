import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'

function App() {
  // This state tracks your complete list of expenses
  const [expense, setExpense] = useState([]);

  // When form successfully saves an item, it will pass it here to update the list
  function handleAddNewExpense(savedExpense){
    setExpense((prevExpense)=>{
      return [...prevExpense, savedExpense];
    });
  }


  return (
    <>
      <Header/>
      <Form
      // handleChange = {handleChange}
      // inputData ={inputData}
      // handleFormSubmit ={handleFormSubmit}
      handleAddNewExpense={handleAddNewExpense}
      />
    </>
  )
}

export default App
