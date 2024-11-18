import supabase from "../database/supabase";

async function modeOfPayment() {
  const { data, error } = await supabase.from("modeOfPayment").select("*");

  if (error) console.log(error);
  if (data) {
    return data;
  }
}

export default modeOfPayment;
