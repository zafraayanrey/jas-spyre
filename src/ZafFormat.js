import React, { useState } from "react";
import { format, useNumberFormat } from "@react-input/number-format";

const options = { locales: "en", maximumFractionDigits: 2 };

function ZafFormat() {
  const [value, setValue] = useState();

  function handleChage(e) {
    // const testValue = format(e.target.value, options);
    // setValue(testValue);
    // setValue(Number(value).toLocaleString());
    // setValue(testValue.replace(/[^0-9\.]/g, ""));
    const zaf = e.target.value.replace(/[^0-9]/g, "");
    // console.log(zaf);
    setValue(format(zaf, options));
  }

  return (
    <>
      <input type="text" value={value} onChange={handleChage}></input>
      {value}
    </>
  );
}

export default ZafFormat;
