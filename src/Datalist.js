// components/DataList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromSupabase, testing } from "./sales/dataSlice";
import { BsDatabaseFillCheck } from "react-icons/bs";
// import { fetchDataFromSupabase } from "../redux/dataSlice";

const DataList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDataFromSupabase());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from Supabase</h1>
      {/* <button onClick={() => dispatch({ type: testing, payload: "zafra" })}> */}
      <button onClick={() => dispatch({ type: testing, payload: items })}>
        Click Me
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
