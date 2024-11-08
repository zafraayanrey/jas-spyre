import React from "react";
import Menu from "./menu/Menu";
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
