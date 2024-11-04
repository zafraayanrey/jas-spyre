import { format } from "@react-input/number-format";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const vehicleType = [
  "Sedan",
  "Hatchback",
  "Coupe",
  "SUV",
  "Sportscar",
  "Convertible",
  "Crossover",
  "Muscle Car",
  "Station Wagon",
  "Pickup Truck",
];

const services = [
  "Body Wash Tire Black",
  "Body Wash Vacuum Tire Black",
  "Body Wash Vacuum Armor All Tire Black",
  "Body Wash Vacuum Armor All Tire Black Wax",
  "Seat Cover Removal",
  "Seat Cover Installation",
  "Engine Wash",
  "Vacuum",
  "Armor All",
];

const mop = ["Cash", "Check", "Online Transfer"];
const options = { locales: "en", maximumFractionDigits: 2 };

const currentDate = new Date();
const today = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

function Expenses() {
  // const inputRef = useNumberFormat(options);
  // const defaultValue = format(0, options);

  const [value, setValue] = useState(0);
  const [id, setId] = useState(1);
  const [amount, setSales] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [date, setDate] = useState(today);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    // console.log(data.date);
    // if (data.date === "") return "Zaf";
    data.date === "" && (data.date = "Not Specified");
    setSales((prevArray) => [...prevArray, data]);
    setId(() => id + 1);
    toast.success("Transaction Added!");
    reset();
    setValue("");
    setPlateNumber("");
  }

  function handleChange(e) {
    const uppercase = e.target.value.toUpperCase();
    setPlateNumber(uppercase);
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
      {/* <Toaster /> */}
      <div>
        <div className="incomeHeader">EXPENSES</div>
        <div>
          {/* <form className="incomeContent"> */}
          <form className="incomeContent">
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
              // defaultValue={today}
              // value={date}
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
            {/* {errors.date && <span className="errorDate">Date is required</span>}
            {errors.orNumber && (
              <span className="errorPlateNumber">Plate number is required</span>
            )}
            {errors.price && (
              <span className="errorPrice">Price is required</span>
            )} */}
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
              // ref={inputRef}
            ></input>
            <select {...register("mop")}>
              {mop.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>

            {/* <NumericFormat
              thousandSeparator={true}
              prefix={"PHP "}
              name="price"
            /> */}

            <button onClick={handleSubmit(onSubmit)} className="addIncome">
              ADD
            </button>
          </form>
        </div>
      </div>

      {amount.length === 0 ? (
        <span style={{ display: "grid", marginTop: "20px" }}>
          ENTER YOUR TRANSACTIONS NOW
        </span>
      ) : (
        <div className="tableWrapper">
          <table className="incomeTable">
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
              {amount.map((el, i) => (
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

      {/* <div className="incomeTable">
        <div className="tableHeadingWrapper">
          <div className="tableHeading">Vehicle Type</div>
          <div className="tableHeading">Plate Number</div>
          <div className="tableHeading">Availed Service</div>
          <div className="tableHeading">Price</div>
        </div>

        {theArray.map((el) => (
          <div className="tableBodyContainer">
            <div className="tableBody">{el.vehicleType}</div>
            <div className="tableBody">{el.plateNumber}</div>
            <div className="tableBody">{el.services}</div>
            <div className="tableBody">{el.price}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Expenses;
