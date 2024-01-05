import React from "react";
import { Progress } from "antd";

const Charts = ({ data }) => {
  //Прибуток і витрати. Кількість
  const numberOfTransactions = data.length;
  const numberOfIncomes = data.filter((transaction) => transaction.type === "income").length;
  const numberOfExpenses = data.filter((transaction) => transaction.type === "expense").length;
  const totalIncomePercentage = (numberOfIncomes / numberOfTransactions) * 100;
  const totalExpensePercentage = (numberOfExpenses / numberOfTransactions) * 100;

  //Прибуток і витрати. Гроші
  const moneyFlow = data.reduce((acc, transaction) => acc + transaction.amount, 0);
  const sumOfIncomes = data
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const sumOfExpenses = data
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const actualIncome = sumOfIncomes - sumOfExpenses;
  const sumOfIncomesPercentage = (sumOfIncomes / moneyFlow) * 100;
  const sumOfExpensesPercentage = (sumOfExpenses / moneyFlow) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-3 mx-auto">
          <div className="card">
            <div className="card-header">Total Transactions : {numberOfTransactions}</div>
            <div className="card-body mx-auto">
              <h5 className="text-success ">Income : {numberOfIncomes}</h5>
              <h5 className="text-danger">Expense : {numberOfExpenses}</h5>
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2 d-block "
                  percent={totalIncomePercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="card">
            <div className="card-header">Money flow : {actualIncome}</div>
            <div className="card-body mx-auto">
              <h5 className="text-success">Income : {sumOfIncomes}</h5>
              <h5 className="text-danger">Expense : {sumOfExpenses}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2 d-block"
                  percent={sumOfIncomesPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={sumOfExpensesPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
