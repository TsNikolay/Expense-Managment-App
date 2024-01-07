# Expense Manager

Expense Manager is a web application for financial management. With this application, you can view transaction analytics, add new transactions, and edit or delete existing ones. The app provides convenient control over your finances, allowing you to track your expenses and income.

## Features

- **Transaction Analytics:** View statistics and analytics of your finances for more informed budget management.

- **Add Transactions:** Easily add new transactions, specifying the date, description, category, amount, and type (income or expense).

- **Edit and Delete Transactions:** Make changes to existing transactions or delete them when needed.

- **Authentication and Registration:** Ensure data security with user authentication and registration system.

## Tech Stack

- **MERN Stack:**
  - MongoDB (NoSQL database)
  - Express.js (Web application framework for Node.js)
  - React (Library for building user interfaces)
  - Node.js (JavaScript runtime environment on the server)

- **Ant Design:** Used for styling components and providing a modern interface design.

- **JWT (JSON Web Tokens):** For secure user authentication and authorization.

## Installation and Setup

1. **Install Dependencies:**
   ```bash
   cd client
   npm install

   cd server
   npm install
   ```

2. **Configure Database:**

Ensure MongoDB is installed and running on your computer.
Create a .env file in the server folder and specify your database connection parameters:
env
```
MONGODB_URI=your_connection_string
```
3. **Run the Application:**
```
# Run the client side (in the client folder)
npm start

# Run the server side (in the server folder)
npm start
```
