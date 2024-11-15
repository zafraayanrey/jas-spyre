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

function Total() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState([]);
  const [monthNumber, setMonthNumber] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState([]);

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

  function selectedMonth(e) {
    const selectMon = e.target.value;
    switch (selectMon) {
      case monthText[0]:
        setMonthNumber(0);
        break;
      case monthText[1]:
        setMonthNumber(1);
        break;
      case monthText[2]:
        setMonthNumber(2);
        break;
      case monthText[3]:
        setMonthNumber(3);
        break;
      case monthText[4]:
        setMonthNumber(4);
        break;
      case monthText[5]:
        setMonthNumber(5);
        break;
      case monthText[6]:
        setMonthNumber(6);
        break;
      case monthText[7]:
        setMonthNumber(7);
        break;
      case monthText[8]:
        setMonthNumber(8);
        break;
      case monthText[9]:
        setMonthNumber(9);
        break;
      case monthText[10]:
        setMonthNumber(10);
        break;
      case monthText[11]:
        setMonthNumber(11);
        break;
      default:
        return selectMon;
    }
  }

  return (
    <div className="reportWrapper">
      <div>
        <label>Search By Year</label>
        <select className="filterSales">
          {dateRange.map((year) => (
            <option>{year}</option>
          ))}
        </select>
      </div>
      <div className="monthlySalesWrapper">
        {monthlyTotal().map((el, i) => (
          <div className="monthlySales">
            <div>{monthText[i]}</div>
            <div>Total Sales:</div>
            <div>{format(el, options)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Total;
