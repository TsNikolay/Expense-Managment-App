const mongoose = require("mongoose").default;
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Expense-Managment-App-Database");
    console.log(`Server is running on ${mongoose.connection.host}`);
  } catch (exception) {
    console.error(exception);
  }
};

module.exports = dbConnect;
