import { format } from "@react-input/number-format";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import { RiDeleteBin5Line } from "react-icons/ri";
import supabase from "../database/supabase";
// import { deleteRecordFromSupabase } from "../sales/deleteSlice";
import { useDispatch, useSelector } from "react-redux";
import { insertRecordToSupabase } from "../sales/insertSlice";
import { deleteRecordFromSupabase } from "../sales/deleteSlice";
// import { insertRecordToSupabase } from "../sales/insertSlice";

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

const options = { locales: "en", maximumFractionDigits: 2 };

const currentDate = new Date();
const today = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

function Sales() {
  // const inputRef = useNumberFormat(options);
  // const defaultValue = format(0, options);

  const [value, setValue] = useState(0);

  const [sales, setSales] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [date, setDate] = useState(today);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchingData() {
      const { data, error } = await supabase.from("sales").select();
      if (error) console.log("Failed Fetching the data");
      if (data) setSales(data);
    }

    fetchingData();
  });

  async function onSubmit(data) {
    const updatePrice = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")),
    };

    dispatch(insertRecordToSupabase(updatePrice));

    reset();
    toast.success("Transaction Added!");
    setValue("");
    setPlateNumber("");
  }

  function handleChange(e) {
    const uppercase = e.target.value.toUpperCase();
    setPlateNumber(uppercase);
  }

  function priceChange(e) {
    const formattedNumber = e.target.value.replace(/[^0-9.]/g, "");
    setValue(format(formattedNumber, options));
  }

  function dateChange(e) {
    setDate(e.target.value);
  }

  async function handleDelete(e) {
    dispatch(deleteRecordFromSupabase(e));
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
        <div className="incomeHeader">SALES INPUT</div>
        <div>
          <form className="incomeContent">
            <input
              {...register("date", { required: true })}
              type="date"
              onChange={dateChange}
              className="date"
            ></input>

            <select {...register("vehicleType")}>
              {vehicleType.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("plateNumber", { required: true })}
              type="text"
              placeholder="Plate Number"
              onChange={handleChange}
              value={plateNumber}
            ></input>
            <select {...register("services")}>
              {services.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("price", { required: true })}
              type="text"
              placeholder="Price"
              onChange={priceChange}
              value={value}
            ></input>

            {errors.date && <span className="errorDate">Date is required</span>}
            {errors.plateNumber && (
              <span className="errorPlateNumber">Plate number is required</span>
            )}
            {errors.price && (
              <span className="errorPrice">Price is required</span>
            )}

            <button onClick={handleSubmit(onSubmit)} className="addIncome">
              ADD
            </button>
          </form>
        </div>
      </div>

      {sales.length === 0 ? (
        <span style={{ display: "grid", marginTop: "20px" }}>
          ENTER YOUR TRANSACTIONS NOW
        </span>
      ) : (
        <div className="tableWrapper">
          <table className="incomeTable">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Vehicle Type</th>
                <th>Plate Number</th>
                <th>Services</th>
                <th>Price</th>
                <th className="actionHeading">Actions</th>
              </tr>
              {sales.map((el, i) => (
                <>
                  <tr key={i} className="incomeTableBody">
                    <td>{el.date}</td>
                    <td>{el.vehicleType}</td>
                    <td>{el.plateNumber}</td>
                    <td>{el.services}</td>
                    <td>{format(el.price, options)}</td>
                    <td className="actions">
                      <span
                        className="actionsIcon"
                        onClick={() => handleDelete(el.id)}
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

export default Sales;
