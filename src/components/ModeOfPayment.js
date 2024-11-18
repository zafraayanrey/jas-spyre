import React, { useEffect, useState } from "react";
import modeOfPayment from "../helpers/modeOfPayment";
import { useForm } from "react-hook-form";
import Button from "../Button";
import supabase from "../database/supabase";
import { RiDeleteBin5Line } from "react-icons/ri";

function ModeOfPayment() {
  const [setMop, setSetMop] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { error } = await supabase.from("modeOfPayment").insert(data);
    if (error) console.log(error);
    reset();
  }

  async function handleDelete(id) {
    const { error } = await supabase
      .from("modeOfPayment")
      .delete()
      .eq("id", id);
    // if (error) console.log(error);
  }

  useEffect(() => {
    modeOfPayment()
      .then((res) => setSetMop(res))
      .catch((err) => console.log(err));
  }, [setMop]);

  return (
    <div className="setIndWrapper">
      <form>
        <div>
          <input
            type="text"
            {...register("modeOfPayment", { required: true })}
          ></input>
        </div>
        {errors.modeOfPayment && <span>Invalid!</span>}
        <div className="settingButton" onClick={handleSubmit(onSubmit)}>
          <Button>Add</Button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {setMop.map((el) => (
            <li className="servicesList">
              <div>{el.modeOfPayment}</div>
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

export default ModeOfPayment;
