const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
// Файл конфігу dot env;
dotenv.config();

//База даних
dbConnect();

const app = express();

//Мідлвари
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Маршрутизація
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

//Порт
const PORT = 8080 || process.env.PORT;

//Прослуховування серверу
app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT} port`);
});
