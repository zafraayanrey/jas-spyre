import React from "react";
import { useSelector } from "react-redux";
import Sales from "./components/Sales";
import Expenses from "./components/Expenses";
import Ledger from "./components/Ledger";
import Report from "./components/Report";
import Settings from "./components/Settings";

function Canvass() {
  const test = useSelector((state) => state.menu);

  return (
    <div className="canvassWrapper sectionContainer">
      <span>{test.value === "" && <Sales />}</span>
      <span>{test.value === "income" && <Sales />}</span>
      <span>{test.value === "expenses" && <Expenses />}</span>
      <span>{test.value === "ledger" && <Ledger />}</span>
      <span>{test.value === "report" && <Report />}</span>
      <span>{test.value === "settings" && <Settings />}</span>
    </div>
  );
}

export default Canvass;
