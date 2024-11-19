import React, { useEffect, useState } from "react";
import SalesReport from "./SalesReport";
import ExpensesReport from "./ExpensesReport";
import services from "../helpers/services";
import NetIncome from "./NetIncome";

function Ledger() {
  // console.log(DataFetching());
  // DataFetching();

  const [navigator, setNavigator] = useState([]);

  function handleChange(e) {
    setNavigator(e.target.value);
  }

  useEffect(() => {
    services()
      .then((res) => setNavigator(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ledgerContainer">
      <SalesReport />
      <ExpensesReport />
      <NetIncome />
    </div>
  );
}

export default Ledger;
