import supabase from "../database/supabase";

async function services() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) console.log(error);
  if (data) {
    return data;
  }
}

export default services;
