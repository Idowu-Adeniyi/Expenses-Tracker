import "dotenv/config";
import pool from "./db.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: "http://my-expense-tracker-frontend-app.s3-website-us-east-1.amazonaws.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// }));


const PORT = process.env.PORT || 3000;

// Test the database connection on startup
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully at:", res.rows[0].now);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Register user 
app.post("/api/register", async (req, res) => {
  const {username, password, confirmpassword} = req.body;

  // validate user
    if (!username || username.trim() == "" ||!password || password.trim() == "") {
      return res.status(400).json({ message: "Fields cannot be empty"});
    }
    if(password !== confirmpassword){
      return res.status(400).json({message: "Passwords do not match"})
    }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *", [username, passwordHash]);

    // Destructure out the password_hash, and gather everything else into 'safeUser'
    const { password_hash, ...safeUser } = user.rows[0];

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser // Automatically contains only id and username!
    });

  }catch(error){
    console.error(error.message)
    if(error.code === '23505'){
      return res.status(409).json({message: "Username already taken"})
    }
    return res.status(500).json({ message: "Database or server error" })
  }
})


// Login User
app.post("/api/login", async (req, res) =>{
  const {username, password} = req.body;
  // validate username and password
  if(!username || !password){
    return res.status(400).json({message: "Invalid username or password!"})
  }
  // Check if user fields are empty 
  if(username.trim()==="" || password.trim()===""){
    return res.status(400).json({message: "Fields cannot be empty!"})
  }
  try{
    const result = await pool.query("SELECT * FROM users WHERE username = $1",[username]);

    if(result.rows.length === 0){
      return res.status(401).json({message:"Invalid username or password."})
    }
    // If user found
    const user = result.rows[0];

    // Compare password 
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if(!isMatch){
      return res.status(401).json({message:"Invalid username or password."});
    }
    // User Token
    const token = jwt.sign(
      {id: user.id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    const {password_hash, ...safeUser} = user;
    // If user exists
    return res.status(200).json({ 
      message: "Login successful!",
      token: token,
      user: safeUser 
    });

  }catch(error){
    console.error(error.message)
    return res.status(500).json({message:"Server error!"})
  }
})


// CREATE A NEW EXPENSE
app.post("/api/expenses", async (req, res) => {
  try {
    const { description, amount, date, user_id } = req.body;

    // Validate inputs
    if (!description || !amount || !date || description.trim() === "" || date.trim() === "") {
      return res.status(400).json({ message: "Fields cannot be empty or contain only spaces." });
    }

    // Convert the input to a strict number
    const parsedAmount = Number(amount);

    // Verify if amount is number
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a valid number greater than 0" });
    }

    const newExpense = await pool.query(
      "INSERT INTO expenses (description, amount, date, user_id) VALUES ($1, $2, $3, $4) RETURNING *", 
      [description, amount, date, user_id]
    );
    res.status(201).json(newExpense.rows[0]);

  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// READ ALL POSTS
app.get("/api/expenses/user/:userId", async (req, res) => {
  try {
    const {userId} = req.params;

    const allExpenses = await pool.query("SELECT * FROM expenses WHERE user_id = $1 ORDER BY id ASC", [userId]);
    res.status(200).json(allExpenses.rows);

  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET EXPENSE BY ID
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format, must be a number" });
    }
    
    // Query database
    const expense = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
       
    // Validate
    if (expense.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    
    // Success if all validations pass
    res.status(200).json(expense.rows[0]);
        
  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE EXPENSE
app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;
    
    // Validate id
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format, must be a number" });
    }

    if (!description || !amount || !date || description.trim() === "" || date.trim() === "") {
      return res.status(400).json({ message: "Invalid input fields. All fields are required." });
    }
    
    // Query database
    const updateExpense = await pool.query(
      "UPDATE expenses SET description = $1, amount = $2, date = $3 WHERE id = $4 RETURNING *", 
      [description, amount, date, id]
    );

    // Validate if it exists
    if (updateExpense.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    
    // Success if found
    res.status(200).json(updateExpense.rows[0]);

  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE EXPENSE
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate id
    if (isNaN(id)) {
      return res.status(404).json({ message: "Invalid format ID, must be a number" });
    }
    
    // Query database
    const deleteExpense = await pool.query("DELETE FROM expenses WHERE id = $1 RETURNING *", [id]);

    // Check if row exists
    if (deleteExpense.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Return success if found
    res.status(200).json(deleteExpense.rows[0]);

  } catch(error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error occurred while deleting" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
