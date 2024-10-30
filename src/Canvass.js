import React from "react";
import { useSelector } from "react-redux";
import Income from "./Income";
import Expenses from "./Expenses";
import Ledger from "./Ledger";
import Report from "./Report";

function Canvass() {
  const test = useSelector((state) => state.menu);

  return (
    <div className="canvassWrapper sectionContainer">
      <span>{test.value === "" && <Income />}</span>
      <span>{test.value === "income" && <Income />}</span>
      <span>{test.value === "expenses" && <Expenses />}</span>
      <span>{test.value === "ledger" && <Ledger />}</span>
      <span>{test.value === "report" && <Report />}</span>
    </div>
  );
}

export default Canvass;
