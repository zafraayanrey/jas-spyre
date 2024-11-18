import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";
import { format } from "@react-input/number-format";
import dateRange from "../utils/dateRange";
import { monthText } from "../utils/monthText";
// import dateRange from '../helpers/'

const options = { locales: "en", maximumFractionDigits: 2 };

function SalesReport() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState([]);
  const [monthNumber, setMonthNumber] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [year, setYear] = useState();

  async function salesData() {
    const dateContainer = [];
    const { data, error } = await supabase.from("sales").select("*");
    if (error) console.log(error);
    // if (data) data.map((el) => dateContainer.push(el.date));
    if (data) setRecords(data);
  }

  // function annualTotal() {
  //   const months = records
  //     .filter((el) => new Date(el.date).getFullYear() === monthNumber)
  //     .map((el) => el.price)
  //     .reduce((acc, curr) => acc + curr, 0);
  //   setMonthlyIncome(months);
  // }

  function monthlyTotal() {
    const monthSales = [];
    for (let x = 0; x < 12; x++) {
      const months = records
        .filter((el) => new Date(el.date).getFullYear() === year)
        .filter((el) => new Date(el.date).getMonth() === x)
        .map((el) => el.price)
        .reduce((acc, curr) => acc + curr, 0);
      // monthSales.push(months);
      monthSales.push(months);
    }

    return monthSales;
  }

  useEffect(() => {
    salesData();
    // monthlyTotal();
  }, [monthNumber]);

  function handleChange(e) {
    setYear(+e.target.value);
  }

  return (
    <div className="reportWrapper">
      <div>
        <label className="heading">Sales</label>
        <select onChange={handleChange} className="filterSales">
          {dateRange.map((year, i) => (
            <option key={i}>{year}</option>
          ))}
        </select>
      </div>
      <div className="monthlySalesWrapper">
        <table>
          <tbody>
            <tr>
              <th>Month</th>
              <th>Total Sales</th>
            </tr>

            {monthlyTotal().map((el, i) => (
              <tr key={i}>
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

export default SalesReport;
