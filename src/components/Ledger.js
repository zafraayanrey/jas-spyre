import React, { useState } from "react";
import SalesReport from "./SalesReport";
import ExpensesReport from "./ExpensesReport";

function Ledger() {
  // console.log(DataFetching());
  // DataFetching();

  const [navigator, setNavigator] = useState("");

  function handleChange(e) {
    setNavigator(e.target.value);
  }

  return (
    <div className="ledgerContainer">
      <SalesReport />
      <ExpensesReport />
    </div>
  );
}

export default Ledger;
