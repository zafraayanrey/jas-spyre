import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
  const [theArray, setTheArray] = useState([]);
  const [theObject, setTheObject] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setTheArray((prevArray) => [...prevArray, data]);
    // console.log(theArray);
    // enteredData.push(data);
    // setTesting(() => testing.push(data));
    // console.log(typeof testing);
    // setTesting(() => testing.push(data));
    // console.log(testing);
    // enteredData.push(data);
    // console.log(enteredData);
  }

  return (
    <div className="incomeWrapper">
      <div>
        <div className="incomeHeader">Enter your income here</div>
        <div>
          <form className="incomeContent">
            <select {...register("vehicleType")}>
              {vehicleType.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("plateNumber")}
              type="text"
              placeholder="Plate Number"
            ></input>
            <select {...register("services")}>
              {services.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <input
              {...register("price")}
              type="number"
              placeholder="Price"
            ></input>
            <button onClick={handleSubmit(onSubmit)} className="addIncome">
              ADD INCOME
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="incomeTable">
          <div className="tableHeading">Vehicle Type</div>
          <div className="tableHeading">Plate Number</div>
          <div className="tableHeading">Availed Service</div>
          <div className="tableHeading">Price</div>
          {theArray.map((el) => (
            <>
              <div className="tableHeading">{el.vehicleType}</div>
              <div className="tableHeading">{el.plateNumber}</div>
              <div className="tableHeading">{el.services}</div>
              <div className="tableHeading">{el.price}</div>
            </>
          ))}
          {/* <div className="tableHeading">Vehicle Type</div>
          <div className="tableHeading">Plate Number</div>
          <div className="tableHeading">Availed Service</div>
          <div className="tableHeading">Price</div> */}
        </div>
      </div>
    </div>
  );
}

export default Income;
