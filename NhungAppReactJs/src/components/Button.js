import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Button.css";

function Button() {
  return (
    <>
      <Link to="/login">
        <button className="btn">
          <Icons.FaUserPlus />
          <span>Đăng Nhập</span>
        </button>
      </Link>
    </>
  );
}

export default Button;
