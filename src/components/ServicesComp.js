import React, { useEffect, useState } from "react";
import services from "../helpers/services";
import { useForm } from "react-hook-form";
import Button from "../Button";
import supabase from "../database/supabase";
import { RiDeleteBin5Line } from "react-icons/ri";

function ServicesComp() {
  const [setService, setSetService] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { error } = await supabase.from("services").insert(data);
    if (error) console.log(error);
    reset();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    // if (error) console.log(error);
  }

  useEffect(() => {
    services()
      .then((res) => setSetService(res))
      .catch((err) => console.log(err));
  }, [setService]);

  return (
    <div className="setIndWrapper">
      <form>
        <div>
          <input
            type="text"
            {...register("services", { required: true })}
          ></input>
        </div>
        {errors.services && <span>Invalid!</span>}
        <div className="settingButton" onClick={handleSubmit(onSubmit)}>
          <Button>Add</Button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {setService.map((el) => (
            <li className="servicesList">
              <div>{el.services}</div>
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

export default ServicesComp;
