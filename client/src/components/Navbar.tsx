// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/alphabet.png";
import { ShoppingCart } from "lucide-react";
const Navbar = () => {
  return (
    <div className="flex justify-between w-[100%] px-[10%] py-2 border-b ">
      <div className="flex gap-2 items-center cursor-pointer">
        <Link to="/">
          <img src={logo} alt="" className="h-10" />
        </Link>
        <Link to="">
          <p className="text-xl">Market place</p>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/">
          <h1 className="cursor-pointer hover:text-xl ">Home</h1>
        </Link>
        <Link to="shop">
          <h1 className="cursor-pointer hover:text-xl ">Shop</h1>
        </Link>
        <Link to="admin">
          <h1 className="cursor-pointer hover:text-xl ">Admin</h1>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <h1 className="cursor-pointer hover:text-xl">Login</h1>
        <ShoppingCart className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
