import React from "react";
import logoImg from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Logo = () => {
  const { userType } = useSelector((store) => store.auth);
  return (
    <Link to={`/${userType ? userType : ""}`}>
      <img
        className="w-16 h-12 md:w-24 md:h-16"
        src={logoImg}
        alt="GoatStay Logo"
      />
    </Link>
  );
};

export default Logo;
