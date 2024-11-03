import React from "react";

function Button({ children }) {
  return (
    <>
      <button className="addIncome">{children}</button>
    </>
  );
}

export default Button;
