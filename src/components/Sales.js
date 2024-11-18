import { format } from "@react-input/number-format";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import { RiDeleteBin5Line } from "react-icons/ri";
import supabase from "../database/supabase";
import { zafDate } from "../utils/zafDate";
import services from "../helpers/services";
import vehicleType from "../helpers/vehicleType";

const options = { locales: "en", maximumFractionDigits: 2 };

////////////////////////////////////start of component////////////////////////////////////
function Sales() {
  const [value, setValue] = useState(0);
  const [sales, setSales] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [date, setDate] = useState(zafDate());

  const [servicesArray, setServicesArray] = useState([]);
  const [vtArray, setVtArray] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchPosts = async () => {
    // Fetching data from 'posts' table
    const { data, error } = await supabase.from("sales").select("*");

    if (error) return;

    if (data) setSales(data); // Set the fetched data into state
  };

  useEffect(() => {
    fetchPosts();

    services()
      .then((res) => setServicesArray(res))
      .catch((err) => console.log(err));

    vehicleType()
      .then((res) => setVtArray(res))
      .catch((err) => console.log(err));
  }, []);

  async function onSubmit(data) {
    const updatePrice = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")),
    };

    const { error } = await supabase.from("sales").insert(updatePrice);
    if (error) return;
    toast.success("Record Successfully Added!");
    reset();
    setValue("");
    setPlateNumber("");

    fetchPosts();
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
    const { error } = await supabase.from("sales").delete().eq("id", e);
    if (error) console.log(error);
    fetchPosts();
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
              {vtArray.map((el, i) => (
                <option key={i}>{el.vehicleType}</option>
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
              {servicesArray.map((el, i) => (
                <option key={i}>{el.services}</option>
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
                // <div key={i}>
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
                // </div>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Sales;
