import { format } from "@react-input/number-format";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../slice/expensesSlice";

const mop = ["Cash", "Check", "Online Transfer"];
const options = { locales: "en", maximumFractionDigits: 2 };

const currentDate = new Date();
const today = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

function Expenses() {
  const [value, setValue] = useState(0);
  const [id, setId] = useState(1);
  const [amount, setSales] = useState([]);
  const [date, setDate] = useState(today);

  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  console.log(records);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    data.date === "" && (data.date = "Not Specified");
    setSales((prevArray) => [...prevArray, data]);
    setId(() => id + 1);

    toast.success("Transaction Added!");
    reset();
    setValue("");
  }

  function priceChange(e) {
    const formattedNumber = e.target.value.replace(/[^0-9]/g, ""); //setting the input box to only accepts numeric values
    setValue(format(formattedNumber, options));
  }

  function priceClick() {
    setValue("");
  }

  function priceFocus() {
    setValue("");
  }

  function actionClick(e) {
    const deleteItem = amount.filter((number) => number.id !== e.target.id);
    setSales(deleteItem);
    toast.success("Deleted");
  }

  function dateChange(e) {
    setDate(e.target.value);
  }

  return (
    <div className="incomeWrapper">
      <Toaster
        toastOptions={{
          className: "toaster",
          success: {
            iconTheme: {
              primary: "white",
            },
          },
          icon: (
            <span
              style={{ display: "grid", color: "white", fontSize: "large" }}
            >
              <FaRegSave />
            </span>
          ), // Custom check icon color
        }}
      />

      <div>
        <div className="incomeHeader">EXPENSES</div>
        <div>
          <form className="expensesContent">
            <input
              {...register("id")}
              type="text"
              placeholder="Id"
              value={id}
              hidden
            ></input>
            <input
              {...register("date", { required: true })}
              type="date"
              onChange={dateChange}
              className="date"
            ></input>
            <input
              {...register("orNumber", { required: true })}
              type="text"
              placeholder="OR Number"
            ></input>
            <input
              {...register("agency", { required: true })}
              type="text"
              placeholder="Agency"
            ></input>
            <div className="expErrWrapper">
              {errors.date && (
                <span className="dateRequired">Date is required</span>
              )}
              {errors.orNumber && (
                <span className="orNumberRequired">OR Number is required</span>
              )}
              {errors.agency && (
                <span className="agencyRequired">Agency is required</span>
              )}
            </div>
            <input
              {...register("payor", { required: true })}
              type="text"
              placeholder="Payor"
            ></input>
            <input
              {...register("particulars", { required: true })}
              type="text"
              placeholder="Particulars"
            ></input>
            <input
              {...register("amount", { required: true })}
              type="text"
              placeholder="Amount"
              onClick={priceClick}
              onChange={priceChange}
              onFocus={priceFocus}
              value={value}
            ></input>
            <div className="expErrWrapper">
              {errors.payor && (
                <span className="payorRequired">Payor is required</span>
              )}
              {errors.particulars && (
                <span className="particularsRequired">
                  Particulars is required
                </span>
              )}
              {errors.amount && (
                <span className="amountRequired">Amount is required</span>
              )}
            </div>
            <select className="mop" {...register("mop")}>
              {mop.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <div className="expErrWrapper">
              {errors.mop && (
                <span className="mopRequired">Mode of payment is required</span>
              )}
            </div>

            <button onClick={handleSubmit(onSubmit)} className="addExpenses">
              ADD
            </button>
          </form>
        </div>
      </div>

      {records.length === 0 ? (
        <span style={{ display: "grid", marginTop: "20px" }}>
          ENTER YOUR TRANSACTIONS NOW
        </span>
      ) : (
        <div className="tableWrapper">
          <table className="expensesTable">
            <tbody>
              <tr>
                <th>Date</th>
                <th>OR Number</th>
                <th>Agency</th>
                <th>Payor</th>
                <th>Particulars</th>
                <th>Amount</th>
                <th>Mode of Payment</th>
                <th className="actionHeading">Actions</th>
              </tr>
              {records.map((el, i) => (
                <>
                  <tr className="incomeTableBody">
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
      )}
    </div>
  );
}

export default Expenses;
