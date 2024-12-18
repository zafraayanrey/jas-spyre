import React, { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NumericFormat } from "react-number-format";

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

function Income() {
  const id = useId();
  const [sales, setSales] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [priceInput, setPriceInput] = useState();
  const [resetId, setResetId] = useState(id);

  const ref = useRef();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setSales((prevArray) => [...prevArray, data]);
    setResetId("");
    // console.log(ref.current.value);
    reset();
  }

  function handleChange(e) {
    const uppercase = e.target.value.toUpperCase();
    setPlateNumber(uppercase);
  }

  function priceChange(e) {
    setPriceInput(Number(e.target.value));
    console.log(priceInput);
  }

  function actionClick(e) {
    // console.log(e.target.id);

    const deleteItem = sales.filter((number) => number.id !== e.target.id);
    // sales.filter((number) => console.log(number.id));
    // console.log(sales[e.target.id]);
    // console.log(e.target.id);
    // sales.filter((number) => console.log(number.id));
    // console.log(e.target.id); // Outputs: [1, 2, 4, 5]
    setSales(deleteItem);
  }

  return (
    <div className="incomeWrapper">
      <div>
        <div className="incomeHeader">SALES INPUT</div>
        <div>
          <form className="incomeContent">
            <input
              {...register("id")}
              type="text"
              placeholder="Id"
              value={sales.length}
              hidden
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
            ></input>
            <select {...register("services")}>
              {services.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
            ></input>

            {/* <NumericFormat
              thousandSeparator={true}
              prefix={"PHP "}
              name="price"
            /> */}
            {errors.plateNumber && (
              <span className="errorPlateNumber">Plate number is required</span>
            )}
            {errors.price && (
              <span className="errorPrice">Price is required</span>
            )}

            <button onClick={handleSubmit(onSubmit)} className="addIncome">
              ADD SALES
            </button>
          </form>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="incomeTable">
          <tbody>
            <tr>
              <th>Vehicle Type</th>
              <th>Plate Number</th>
              <th>Services</th>
              <th>Price</th>
              <th className="actionHeading">Actions</th>
            </tr>
            {sales.map((el, i) => (
              <>
                <tr className="incomeTableBody">
                  <td>{el.vehicleType}</td>
                  <td>{el.plateNumber}</td>
                  <td>{el.services}</td>
                  <td>{Number(el.price).toLocaleString()}</td>
                  <td className="actions">
                    <span
                      className="actionsIcon"
                      onClick={actionClick}
                      id={el.id}
                    >
                      <RiDeleteBin5Line />
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

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

export default Income;
