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
  const [expenses, setExpenses] = useState([]);
  const [ayaw, setAyaw] = useState();

  async function salesData() {
    const dateContainer = [];
    const { data, error } = await supabase.from("sales").select("*");
    if (error) console.log(error);
    // if (data) data.map((el) => dateContainer.push(el.date));
    if (data) {
      const mik = [];
      for (let x = 0; x < 12; x++) {
        const months = data
          .filter((el) => new Date(el.date).getMonth() === x)
          .map((el) => el.price)
          .reduce((acc, curr) => acc + curr, 0);
        if (months) mik.push(months);
      }
      setAyaw(mik);
    }

    const me = [];
    // dateContainer.map((el, i) => me.push(el.charAt(5).concat(el.charAt(6))));
    dateContainer.map((el, i) => me.push(new Date(el)));

    // console.log(me);

    // const uniqueMonths = [...new Set(me)]; // merging duplicate values
    // me.map((el) => [
    //   console.log(monthText[el.getMonth()]),
    //   console.log(el.getDate()),
    //   console.log(el.getFullYear()),
    // ]);
    // me.map((el) => console.log(el.getMonth()));
    // me.map((el) => console.log(el.getFullYear()));
    // setDate(me);
  }

  // console.log(date);

  // console.log(dateVariable);
  useEffect(() => {
    salesData();
  }, []);

  return (
    <div>
      {date.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
      {/* {ayaw.map((el) => el)} */}
    </div>
  );
}

export default Total;
