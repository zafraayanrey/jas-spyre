import supabase from "../database/supabase";

async function vehicle() {
  const { data, error } = await supabase.from("vehicleType").select("*");

  if (error) console.log(error);
  if (data) {
    return data;
  }
}

export default vehicle;
