import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";

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

function Total() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState([]);
  const [monthNumber, setMonthNumber] = useState();
  const [ayaw, setAyaw] = useState();

  async function salesData() {
    const dateContainer = [];
    const { data, error } = await supabase.from("sales").select("*");
    if (error) console.log(error);
    // if (data) data.map((el) => dateContainer.push(el.date));
    if (data) setRecords(data);
  }

  function monthlyTotal() {
    const months = records
      .filter((el) => new Date(el.date).getMonth() === monthNumber)
      .map((el) => el.price)
      .reduce((acc, curr) => acc + curr, 0);
    setAyaw(months);
  }

  useEffect(() => {
    salesData();
    monthlyTotal();
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

  // console.log(monthNumber);
  return (
    <div>
      <select onChange={selectedMonth}>
        {monthText.map((el) => (
          <option>{el}</option>
        ))}
      </select>
      {ayaw}
    </div>
  );
}

export default Total;
