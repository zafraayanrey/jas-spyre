import React from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdBook } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { income, expenses, ledger, report } from "./menuSlice";

function Menu() {
  const menuNames = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  // function income() {
  //   dispatch(income());
  // }

  return (
    <div className="menu">
      <div onClick={() => dispatch(income())} className="menuLinks income">
        <span className="icon">
          <IoMdBook />
        </span>
        <span>Sales</span>
      </div>
      <div onClick={() => dispatch(expenses())} className="menuLinks expenses">
        <span className="icon">
          <IoBookmarksOutline />
        </span>
        <span>Expenses</span>
      </div>
      <div onClick={() => dispatch(ledger())} className="menuLinks ledger">
        <span className="icon">
          <MdOutlineBookmarkRemove />
        </span>
        <span>Ledger</span>
      </div>
      <div onClick={() => dispatch(report())} className="menuLinks report">
        <span className="icon">
          <HiOutlineDocumentReport />
        </span>
        <span>Report</span>
      </div>
    </div>
  );
}

export default Menu;
