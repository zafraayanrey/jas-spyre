import supabase from "../database/supabase";

async function vehicleType() {
  const { data, error } = await supabase.from("vehicleType").select("*");

  if (error) console.log(error);
  if (data) {
    return data;
  }
}

export default vehicleType;
