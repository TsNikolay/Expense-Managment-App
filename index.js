const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const path = require("path");

// Файл конфигурации dot env;
dotenv.config();

connectDb();

const app = express();

// Мидлвари
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Маршрутизация
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

// Статичный файл
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Порт
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
