import React from "react";
import VehicleType from "./VehicleType";
import ServicesComp from "./ServicesComp";
import ModeOfPayment from "./ModeOfPayment";

function Settings() {
  return (
    <div className="settingsContainer">
      <VehicleType />
      <ServicesComp />
      <ModeOfPayment />
    </div>
  );
}

export default Settings;
