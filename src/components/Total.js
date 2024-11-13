import React, { useEffect, useState } from "react";
import supabase from "../database/supabase";

function Total() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);

  async function salesData() {
    const { data, error } = await supabase.from("sales").select("*");
    if (error) console.log(error);
    if (data) setSales(data);
  }
  console.log(sales);

  useEffect(() => {
    salesData();
  }, []);

  return (
    <div>
      {sales.map((el) => (
        <div>{el.date}</div>
      ))}
    </div>
  );
}

export default Total;
