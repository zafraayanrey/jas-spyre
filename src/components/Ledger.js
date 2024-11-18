import React, { useEffect, useState } from "react";
import SalesReport from "./SalesReport";
import ExpensesReport from "./ExpensesReport";
import services from "../helpers/services";

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
    </div>
  );
}

export default Ledger;
