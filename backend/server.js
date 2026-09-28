import "dotenv/config";
import pool from "./db.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


// Test the database connection on startup
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error(" Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully at:", res.rows[0].now);
    }
});



app.get("/", (req, res) => {
    res.send("Hello World");
})

//CREAT A POST
app.post("/api/expenses", async(req, res) => {

    try{
        const {description, amount, date} = req.body;

        // Validate inputs
        if (!description || !amount || !date || description.trim() === "" || date.trim() === "") {
            return res.status(400).json({ message: "Fields cannot be empty or contain only spaces." });
        }

        //Convert the input to a strict number
        const parsedAmount = Number(amount);

        // Verify if amount is number
        if(isNaN(parsedAmount) || parsedAmount <= 0){
            return res.status(400).json({message: "Amount must be a valid number greater than 0"});
        }

        const newExpense = await pool.query("INSERT INTO expenses(description, amount, date) VALUES ($1, $2, $3) RETURNING *", [description, amount, date]);
        res.status(201).json(newExpense.rows[0])

    }catch(error) {
        console.error(error.message);
        res.status(500).json({message: "Server Error"})
    }
})

//READ ALL POST
app.get("/api/expenses", async (req, res) => {
    try{
        const allExpenses = await pool.query("SELECT * FROM expenses ORDER BY id ASC")
        res.status(200).json(allExpenses.rows)

    }catch(error){
        console.error(error.message)
        res.status(500).json({message: "Server Error"})
    }
})


// GET EXPENSES BY ID
app.get("/api/expenses/:id", async (req, res)=>{
    try{
        const {id} = req.params;

    // Validate id
    if(isNaN(id)){
        return res.status(400).json({message: "Invalid ID format, must be a number"})
    }
    // Query database
        const expense = await pool.query("SELECT * FROM expenses WHERE id = $1 ", [id]);
       
         // Validate
        if(expense.rows.length === 0){
            return res.status(404).json({message:"Expense not found"})
        }
        // Success if all validation pass
         res.status(200).json(expense.rows[0]);
        
    }catch(error){
        console.error(error.message)
        res.status(500).json({message: "Server Error"})
    }
})



//UPDATE EXPENSE
app.put("/api/expenses/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {description, amount, date} = req.body;
        // Validate  id
        if(isNaN(id)){
            return res.status(400).json({message: "Invalid ID format, but be a number"})
        }

        if(!description || !amount || !date || description.trim()=== ""  || date.trim()==="" ){
            return res.status(400).json({message: "Invalid input fields. All fields are required."})
        }
        // Query database
        const updateExpense = await pool.query("UPDATE expenses SET description = $1, amount = $2, date = $3 WHERE id = $4  RETURNING *", [description, amount, date, id]);

        //Validate if it exist
        if(updateExpense.rows.length === 0){
            return res.status(404).json({message: "Expense not found"})
        }
        // Success if found
        res.status(200).json(updateExpense.rows[0])

    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Server Error"})
    }
})



// DELETE EXPENSE
app.delete("/api/expenses/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        // Valid id
        if(isNaN(id)){
            return res.status(404).json({message:"Invalid format ID, must be a number"})
        }
        // Query database
        const deleteExpense = await pool.query("DELETE FROM expenses WHERE id = $1 RETURNING *", [id]);

        //Check if row exist
        if(deleteExpense.rows.length === 0){
            return res.status(404).json({message: "Expense not found"})
        }

        // return sucess if found
        res.status(200).json(deleteExpense.rows[0]);


    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Internal server error occurred while deleting"})
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})