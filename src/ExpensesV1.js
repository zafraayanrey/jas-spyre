import { format } from "@react-input/number-format";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const mop = ["Cash", "Check", "Online Transfer"];
const options = { locales: "en", maximumFractionDigits: 2 };

function Expenses() {
  const [amount, setamount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [id, setId] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setId(() => id + 1);
    setExpenses((prevArray) => [...prevArray, data]);
    console.log(id);
  }

  function actionClick(e) {
    const deleteItem = expenses.filter((number) => number.id !== e.target.id);
    setExpenses(deleteItem);
    toast.success("Deleted");
  }

  function amountChange(e) {
    const formattedNumber = e.target.value.replace(/[^0-9]/g, ""); //setting the input box to only accepts numeric values
    setamount(format(formattedNumber, options));
    // setamount(e.target.value);
    // console.log(e.target.value);
    // console.log(e.target.value);
  }

  return (
    <div className="expensesWrapper">
      <div>EXPENSES</div>
      <div className="expensesEntries">
        <input
          {...register("id")}
          type="text"
          placeholder="Id"
          value={id}
          hidden
        ></input>
        <input
          type="date"
          placeholder="Date"
          className="expensesInput date"
          {...register("date", { required: true })}
        ></input>
        <input
          type="number"
          placeholder="OR Number"
          className="expensesInput orNumber"
          {...register("orNumber", { required: true })}
        ></input>
        <input
          type="text"
          placeholder="Agency"
          className="expensesInput agency"
          {...register("agency", { required: true })}
        ></input>
        <div className="expensesErrors">
          {errors.date && <span className="errorDate">Date is required</span>}
          {errors.orNumber && (
            <span className="errorOrNumber">OR Number is required</span>
          )}
          {errors.agency && (
            <span className="errorAgency">Agency is required</span>
          )}
        </div>
        <input
          type="text"
          placeholder="Payor"
          className="expensesInput payor"
          {...register("payor", { required: true })}
        ></input>
        <input
          type="text"
          placeholder="Particulars"
          className="expensesInput particulars"
          {...register("particulars", { required: true })}
        ></input>
        {/* <input
          type="text"
          placeholder="amount"
          className="expensesInput amount"
          onChange={handleChange}
          // value={amount}
          {...register("amount", { required: true })}
        ></input> */}
        <input
          {...register("amount", { required: true })}
          type="text"
          onChange={amountChange}
          onFocus={(e) => setamount("")}
          onClick={(e) => setamount("")}
          placeholder="amount"
          className="expensesInput amount"
          value={amount}
        ></input>
        <div className="expensesErrors">
          {errors.payor && (
            <span className="errorPayor">Payor is required</span>
          )}
          {errors.particulars && (
            <span className="errorParticulars">Particulars is required</span>
          )}
          {errors.amount && (
            <span className="erroramount">amount is required</span>
          )}
        </div>
        <select
          className="expensesInput mop"
          {...register("mop", { required: true })}
        >
          {mop.map((el, i) => (
            <option key={i}>{el}</option>
          ))}
        </select>
        <div className="expensesErrors">
          {errors.mop && (
            <span className="errorMop">Mode of payment is required</span>
          )}
        </div>
        <button className="addExpenses" onClick={handleSubmit(onSubmit)}>
          ADD
        </button>
      </div>
      <div className="tableWrapper">
        <table className="expensesTable">
          <tbody>
            <tr>
              <th>Date</th>
              <th>OR Number</th>
              <th>Agency</th>
              <th>Payor</th>
              <th>Particulars</th>
              <th className="rowamount">Amount</th>
              <th>Mode of Payment</th>
              <th className="actionHeading">Actions</th>
            </tr>
            {expenses.map((el, i) => (
              <>
                <tr className="expensesTableBody">
                  <td>{el.date}</td>
                  <td>{el.orNumber}</td>
                  <td>{el.agency}</td>
                  <td>{el.payor}</td>
                  <td>{el.particulars}</td>
                  <td>{el.amount}</td>
                  <td>{el.mop}</td>
                  <td className="actions">
                    <span
                      className="actionsIcon"
                      onClick={actionClick}
                      id={el.id}
                    >
                      {/* <RiDeleteBin5Line /> */}
                      DELETE
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;

/*
date
OR#
agency
payor
nature of collection or collection or particulars
amount
amount in words to be done later
mode of payment
  cash
  check
  online transfer
*/
