import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";
import { format } from "@react-input/number-format";
import dateRange from "../helpers/dateRange";
import { monthText } from "../helpers/monthText";
// import dateRange from '../helpers/'

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
        <label className="heading">Expenses</label>
        <select onChange={handleChange} className="filterSales">
          {dateRange.map((year) => (
            <option>{year}</option>
          ))}
        </select>
      </div>
      <div className="monthlyExpensesWrapper">
        <table>
          <tbody>
            <tr className="tableHeading">
              <th>Month</th>
              <th>Total Expenses</th>
            </tr>

            {monthlyTotal().map((el, i) => (
              <tr className="tableContent">
                <td>{monthText[i]}</td>

                <td>{format(el, options)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesReport;
