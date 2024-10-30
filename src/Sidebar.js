import React from "react";
import Menu from "./Menu";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div className="sidebarWrapper">
      <Logo />
      <Menu />
    </div>
  );
}

export default Sidebar;
