import React from "react";
import { UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";

import styles from "../pages/Homepage.module.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
const Filters = ({
  dateRange,
  setDateRange,
  chosenDate,
  setChosenDate,
  type,
  setType,
  dataVisualization,
  setDataVisualization,

  setModalVisibility,
}) => {
  return (
    <div className={styles.filters}>
      <div>
        <h5>Select range of date</h5>
        <select
          className="form-select"
          id="exampleInputDateRange"
          name="dateRange"
          aria-label="Default select example"
          value={dateRange}
          onChange={(event) => setDateRange(event.target.value)}
        >
          <option defaultValue="select"></option>
          <option value="7">Last 1 week</option>
          <option value="30">Last 1 month</option>
          <option value="90">Last 3 months</option>
          <option value="365">Last 1 year</option>
          <option value="custom">Custom</option>
        </select>
        {dateRange === "custom" && (
          <RangePicker
            value={chosenDate}
            onChange={(dates) => setChosenDate(dates)}
          />
        )}
      </div>
      <div>
        <h5>Select transaction type</h5>
        <select
          className="form-select"
          id="exampleInputType"
          name="type"
          aria-label="Default select example"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option defaultValue="select"></option>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <h5>Select transaction type</h5>
        <div className={styles.iconsContainer}>
          <UnorderedListOutlined
            className={`mx-2 ${
              dataVisualization === "table"
                ? styles.activeIcon
                : styles.inactiveIcon
            }`}
            onClick={() => {
              setDataVisualization("table");
            }}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              dataVisualization === "charts"
                ? styles.activeIcon
                : styles.inactiveIcon
            }`}
            onClick={() => {
              setDataVisualization("charts");
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setModalVisibility(true)}
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default Filters;
