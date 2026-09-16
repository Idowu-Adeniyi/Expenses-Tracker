import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Form(props){
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [inputData, setInputData]= useState({
        description: "",
        amount: "", 
        date: new Date()
    });

     function handleChange(e){
        const {name, value} = e.target
    
        setInputData((prevData) => {
        return {
            ...prevData,
            [name]: value
        };
    });
    }

    function handleDateChange(selectedDate){
        setInputData((prevData)=> {
          return {
             ...prevData,
            date: selectedDate
          };
        })
    }

async function handleFormSubmit(e){
    e.preventDefault();

    // Pull values out of the object state for easy validdation
    const description = inputData.description;
    const amount = inputData.amount;
    const rawDate = inputData.date;

    // Local input validation check
    if (!description || !amount || !rawDate || description.trim() === "" ) {
        alert("Please fill out all fields");
        return;
        }
    
    // Calendar format into YYYY-MM-DD string
    const formattedDate = rawDate.toISOString().split("T")[0];

    try{
        // Send formatted fields to backend Express server
      const response = await axios.post("http://localhost:3000/api/expenses/", {
      description: description, 
      amount: Number(amount), 
      date: formattedDate
    });

    // The backend sends back the newly saved database row
      const savedExpense = response.data;

    // Send that item backup to APP.jsx to append to the master array
    props.handleAddNewExpense(savedExpense);

    // clear out the form inputs
    setInputData({
        description: "",
        amount: "",
        date: new Date()
    });

    alert("Expense saved successfully!");

    }catch(error){
      console.error("failed to save to database",error);
    }
  }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-container">
                <h2>New Expense</h2>
                <div>
                    <label htmlFor = "title">Title:</label>
                    <input type="text" id="title" name="description" placeholder="Enter Description" required onChange={handleChange} value={inputData.description}/>
                </div>
                <div>
                    <label htmlFor="user-amount">Enter Amount:</label>
                    <input type="number" step="0.01" id="user-amount" name="amount" placeholder="Enter Amount" required onChange={handleChange} value={inputData.amount}/>
                </div>
                <div className="date-picker">
                    <DatePicker 
                        selected={inputData.date} 
                        onChange={(date) => handleDateChange(date)} 
                        inline 
                        dateFormat="yyyy-MM-dd"
                        // onChange={props.handleChange}
                        // value={props.inputData}
                        // name="date"
                    />
                    {/* <input type="date" id="datePicker" name="date" required/> */}
                </div>
            </div>
            <div className="btn-container">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Form;