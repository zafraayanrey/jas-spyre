import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";
import { format } from "@react-input/number-format";
import dateRange from "../helpers/dateRange";
// import dateRange from '../helpers/'

const monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const options = { locales: "en", maximumFractionDigits: 2 };

function ExpensesReport() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState([]);
  const [monthNumber, setMonthNumber] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [year, setYear] = useState();

  async function salesData() {
    const dateContainer = [];
    const { data, error } = await supabase.from("expenses").select("*");
    if (error) console.log(error);
    if (data) setRecords(data);
  }

  function monthlyTotal() {
    const monthSales = [];
    for (let x = 0; x < 12; x++) {
      const months = records
        .filter((el) => new Date(el.date).getFullYear() === year)
        .filter((el) => new Date(el.date).getMonth() === x)
        .map((el) => el.amount)
        .reduce((acc, curr) => acc + curr, 0);

      monthSales.push(months);
    }

    return monthSales;
  }

  useEffect(() => {
    salesData();
  }, [monthNumber]);

  function handleChange(e) {
    setYear(+e.target.value);
  }

  return (
    <div className="reportWrapper">
      <div>
        <label>Filter By Year: {year}</label>
        <select onChange={handleChange} className="filterSales">
          {dateRange.map((year) => (
            <option>{year}</option>
          ))}
        </select>
      </div>
      <div className="monthlySalesWrapper">
        {monthlyTotal().map((el, i) => (
          <div className="monthlyExpenses">
            <div>{monthText[i]}</div>
            <div>Total Expenses:</div>
            <div>{format(el, options)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensesReport;
