import React, { useEffect, useState } from "react";
import vehicle from "../helpers/vehicle";
import { useForm } from "react-hook-form";
import Button from "../Button";
import supabase from "../database/supabase";
import { RiDeleteBin5Line } from "react-icons/ri";

function VehicleType() {
  const [vehicleType, setVehicleType] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { error } = await supabase.from("vehicleType").insert(data);
    if (error) console.log(error);
    reset();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("vehicleType").delete().eq("id", id);
    // if (error) console.log(error);
  }

  useEffect(() => {
    vehicle()
      .then((res) => setVehicleType(res))
      .catch((err) => console.log(err));
  }, [vehicleType]);

  return (
    <div className="setIndWrapper">
      <form>
        <div>
          <span></span>
          <input
            type="text"
            {...register("vehicleType", { required: true })}
          ></input>
        </div>
        {errors.vehicleType && <span>Invalid!</span>}
        <div className="settingButton" onClick={handleSubmit(onSubmit)}>
          <Button>Add</Button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {vehicleType.map((el) => (
            <li className="servicesList">
              <div>{el.vehicleType}</div>
              <div
                onClick={() => handleDelete(el.id)}
                className="settingDeleteButton"
              >
                <RiDeleteBin5Line />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VehicleType;
