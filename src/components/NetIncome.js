import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";
import { monthText } from "../utils/monthText";
import { format } from "@react-input/number-format";
import dateRange from "../utils/dateRange";

const options = { locales: "en", maximumFractionDigits: 2 };

function NetIncome() {
  const [monthlyNetIncome, setMonthlyNetIncome] = useState([]);
  const [annualNet, setAnnualNet] = useState();
  const [selectedYear, setSelectedYear] = useState();

  async function allRecords() {
    const { data: salesData, error: salesError } = await supabase
      .from("sales")
      .select("*");
    const { data: expensesData, error: expensesError } = await supabase
      .from("expenses")
      .select("*");
    if (salesError && expensesError) console.log([salesError, expensesError]);
    if (salesData && expensesData) {
      const monthlyNet = [];
      for (let x = 0; x < 12; x++) {
        const mSales = salesData
          .filter((el) => new Date(el.date).getFullYear() === selectedYear)
          .filter((el) => new Date(el.date).getMonth() === x)
          .map((el) => el.price)
          .reduce((acc, curr) => acc + curr, 0);

        const mExpenses = expensesData
          .filter((el) => new Date(el.date).getFullYear() === selectedYear)
          .filter((el) => new Date(el.date).getMonth() === x)
          .map((el) => el.amount)
          .reduce((acc, curr) => acc + curr, 0);

        // monthSales.push(months);
        monthlyNet.push({
          month: monthText[x],
          sales: mSales,
          expenses: mExpenses,
          netIncome: mSales - mExpenses,
        });
      }

      const annualNetIncome = monthlyNet
        .map((el) => el.netIncome)
        .reduce((acc, cur) => acc + cur, 0);

      setMonthlyNetIncome(monthlyNet);
      setAnnualNet(annualNetIncome);
    }
  }

  useEffect(() => {
    allRecords();
  }, [selectedYear]);

  function handleChange(e) {
    setSelectedYear(+e.target.value);
    console.log(selectedYear);
  }
  return (
    <div className="reportWrapper">
      <div>
        <label className="heading">Net Income</label>
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
              <th>Total Expenses</th>
              <th>Net Income</th>
            </tr>

            {monthlyNetIncome.map((el, i) => (
              <tr key={i}>
                <td className="month">{monthText[i]}</td>
                <td className="totalSales">{format(el.sales, options)}</td>
                <td className="totalExpenses">
                  {format(el.expenses, options)}
                </td>
                <td
                  // className="aboveZero"
                  // style={{ backgroundColor: "red" }}
                  className={el.netIncome < 0 ? "belowZero" : "aboveZero"}
                >
                  {format(el.netIncome, options)}
                </td>
              </tr>
            ))}
            <tr className="annualNet">
              <td colSpan={3}>Annual Net Income</td>
              <td>{!annualNet ? 0 : format(annualNet, options)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NetIncome;
