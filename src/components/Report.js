import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import supabase from "../database/supabase";
import { monthText } from "../helpers/monthText";
import dateRange from "../helpers/dateRange";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
        <p className="label">{`Total sales: ${payload[0].value}`}</p>
        <p className="label">{`Total expenses: ${payload[1].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }
};

function Report() {
  const [filterDropdown, setFilterDropdown] = useState(2024);
  const [barData, setBarData] = useState();

  async function salesChart() {
    const chartData = [];

    const { data: salesData, error: salesError } = await supabase
      .from("sales")
      .select("*");
    const { data: expensesData, error: expensesError } = await supabase
      .from("expenses")
      .select("*");

    if (salesError) console.log(salesError);
    if (expensesError) console.log(expensesError);

    // if (salesData) console.log(salesData);
    // if (expensesData) console.log(expensesData);

    const chartObject = {
      month: "",
      sales: "",
      expenses: "",
    };

    if (salesData && expensesData) {
      const overAllDataArray = [];
      for (let x = 0; x < 12; x++) {
        const monthSales = salesData
          .filter((el) => new Date(el.date).getFullYear() === filterDropdown)
          .filter((el) => new Date(el.date).getMonth() === x)
          .map((el) => el.price)
          .reduce((acc, curr) => acc + curr, 0); //change later the date do not hardcode //change later the day

        const monthExpenses = expensesData
          .filter((el) => new Date(el.date).getFullYear() === filterDropdown)
          .filter((el) => new Date(el.date).getMonth() === x)
          .map((el) => el.amount)
          .reduce((acc, curr) => acc + curr, 0); //change later the date do not hardcode //change later the day

        const overAllData = {
          ...chartObject,
          month: monthText[x],
          sales: monthSales,
          expenses: monthExpenses,
        };
        overAllDataArray.push(overAllData);
      }

      setBarData(overAllDataArray);
    }
  }

  useEffect(() => {
    salesChart();
  }, [filterDropdown]);

  function handleChange(e) {
    setFilterDropdown(+e.target.value);
  }

  return (
    <div className="reportContainer">
      <span>SELECT YEAR</span>
      <select className="filterSales" onChange={handleChange}>
        {dateRange.map((el) => (
          <option>{el}</option>
        ))}
      </select>

      <div className="barGraph">
        <ResponsiveContainer style={{ height: "100dvh" }}>
          <BarChart
            data={barData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: "rgb(26, 26, 26)" }}
            />
            <Legend />
            <Bar
              dataKey="sales"
              fill="green"
              activeBar={<Rectangle fill="yellow" stroke="gray" />}
            />
            <Bar
              dataKey="expenses"
              fill="red"
              activeBar={<Rectangle fill="redorange" stroke="gray" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Report;
