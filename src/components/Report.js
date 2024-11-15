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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="label">{`${label[1]} : ${payload[1].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        <p className="desc">Anything you want can be displayed here.</p>
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
  console.log(barData);
  console.log(data);
  return (
    <div className="reportContainer">
      <select className="filterSales" onChange={handleChange}>
        {dateRange.map((el) => (
          <option>{el}</option>
        ))}
      </select>
      {filterDropdown}
      <div className="barGraph">
        <ResponsiveContainer style={{ height: "100dvh" }}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: "rgb(26, 26, 26)" }}
            />
            <Legend />
            <Bar
              dataKey="uv"
              fill="white"
              activeBar={<Rectangle fill="white" stroke="gray" />}
            />
            <Bar
              dataKey="pv"
              fill="red"
              activeBar={<Rectangle fill="red" stroke="gray" />}
            />
            <Bar
              dataKey="amt"
              fill="orange"
              activeBar={<Rectangle fill="yellow" stroke="green" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="barGraph">
        <ResponsiveContainer style={{ height: "100dvh" }}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="uv"
              fill="#B3CDAD"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="pv"
              fill="#FF5F5E"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

export default Report;
