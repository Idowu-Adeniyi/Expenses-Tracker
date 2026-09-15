import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form(){
    const [expenseDate, setExpenseDate] = useState(new Date());

    return (
        <form >
            <div className="form-container">
                <h2>New Expense</h2>
                <div>
                    <lable htmlFor = "title">Title:</lable>
                    <input type="text" id="title" name="description" placeholder="Enter Description" required/>
                </div>
                <div>
                    <lable htmlFor="user-amount">Enter Amount:</lable>
                    <input type="number" id="user-amount" name="amount" placeholder="Enter Amount" required/>
                </div>
                <div className="date-picker">
                    <DatePicker 
                        selected={expenseDate} 
                        onChange={(date) => setExpenseDate(date)} 
                        inline 
                        dateFormat="yyyy-MM-dd"
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