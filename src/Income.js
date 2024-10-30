import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const [sales, setSales] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [priceInput, setPriceInput] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setSales((prevArray) => [...prevArray, data]);
  }

  function handleChange(e) {
    const uppercase = e.target.value.toUpperCase();
    setPlateNumber(uppercase);
  }

  function priceChange(e) {
    setPriceInput(Number(e.target.value));
    console.log(priceInput);
  }

  return (
    <div className="incomeWrapper">
      <div>
        <div className="incomeHeader">SALES INPUT</div>
        <div>
          <form className="incomeContent">
            <select {...register("vehicleType")}>
              {vehicleType.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("plateNumber", { required: true })}
              type="text"
              placeholder="Plate Number"
              value={plateNumber}
              onChange={handleChange}
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
              // onChange={priceChange}
              // value={priceInput.toLocaleString()}
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
            </tr>
            {sales.map((el) => (
              <>
                <tr>
                  <td>{el.vehicleType}</td>
                  <td>{el.plateNumber}</td>
                  <td>{el.services}</td>
                  <td>{Number(el.price).toLocaleString()}</td>
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
