# Expense Tracker Application

A clean, responsive, full-stack web application designed to track day-to-day expenditures. Built using React (Vite) for the frontend, Express/Node.js for the REST API, and PostgreSQL for persistent data storage.

## Features
* Full CRUD Operations: Create, Read, Update, and Delete expenses seamlessly.
* Smart UI State Matching: The same form handles adding new expenses and updating existing ones, dynamically updating headers and buttons.
* Optimized Local UI Sync: App synchronizes updates directly into the UI state tree without redundant secondary network fetches.
* Integrated Date Management: Built-in react-datepicker calendar syncs perfectly with time zones across client-server lines.
* Custom Floating Toast System: Snappy notifications drop down from the top right corner of the window instead of blocking native browser loops.

---

## Tech Stack

### Frontend
* React 18 (Vite template environment)
* Axios (HTTP Client layer)
* React Datepicker (Interactive inline calendars)
* Custom Vanilla CSS

### Backend
* Node.js & Express
* pg (node-postgres) (Relational database client pooling)
* Cors (Cross-Origin Resource Sharing)
* Dotenv (Environment isolation management)

### Database
* PostgreSQL

---

## Database Schema Setup

To create the necessary tables in your PostgreSQL database instance, execute the following script inside your SQL query terminal:

```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL
);
```

---

## Installation & Getting Started

### Prerequisites
* Ensure you have Node.js and npm installed locally.
* A running PostgreSQL database server instance.

### 1. Backend API Repository Setup
1. Open your terminal inside your server/backend codebase directory.
2. Install your required backend package modules:
   ```bash
   npm install
   ```
3. Create a `.env` file in your backend root folder structure and add your connection variables (replace the placeholders below with your actual credentials):
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgresql_username
   DB_PASSWORD=your_postgresql_password
   DB_DATABASE=expenses_tracker
   ```
4. Fire up the Express service worker node:
   ```bash
   node server.js
   ```

### 2. Frontend Framework Setup
1. Open a secondary split terminal inside your UI layout project directory.
2. Pull down required production packages:
   ```bash
   npm install
   ```
3. Boot up the Vite local server environment:
   ```bash
   npm run dev
   ```
4. Access the working tracker directly by opening the local host URL target (e.g., http://localhost:5173) printed out inside the active node interface stream.

---

## API Architecture Specifications

| Method | Endpoint | Description | Payload Schema |
| :--- | :--- | :--- | :--- |
| GET | /api/expenses | Fetches every single recorded table row ordered sequentially by ID numbers. | None |
| GET | /api/expenses/:id | Isolates and validates a single unique database match. | None |
| POST | /api/expenses | Adds a newly validated transaction string block directly into the database. | { "description": "Groceries", "amount": 42.50, "date": "2026-10-06" } |
| PUT | /api/expenses/:id | Modifies an existing expense target matching the given router ID. | { "description": "Updated Title", "amount": 50.00, "date": "2026-10-06" } |
| DELETE | /api/expenses/:id | Safely drops target row mapping matching target route parameters. | None |
