import React from "react";
import { useSelector } from "react-redux";
import Sales from "./Sales";
import Expenses from "./Expenses";
import Ledger from "./Ledger";
import Report from "./Report";

function Canvass() {
  const test = useSelector((state) => state.menu);

  return (
    <div className="canvassWrapper sectionContainer">
      <span>{test.value === "" && <Sales />}</span>
      <span>{test.value === "income" && <Sales />}</span>
      <span>{test.value === "expenses" && <Expenses />}</span>
      <span>{test.value === "ledger" && <Ledger />}</span>
      <span>{test.value === "report" && <Report />}</span>
    </div>
  );
}

export default Canvass;
