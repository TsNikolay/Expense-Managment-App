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
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

//Порт
const PORT = 3000;

//Прослуховування серверу
app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT} port`);
});
