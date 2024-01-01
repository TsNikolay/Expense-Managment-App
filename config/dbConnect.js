const mongoose = require("mongoose").default;
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Server is running on ${mongoose.connection.host}`);
  } catch (exception) {
    console.error(exception);
  }
};

module.exports = dbConnect;
