import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white py-3 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="text-dark-800 flex items-center text-xl font-bold sm:text-2xl"
        >
          <span className="text-primary pb-1 text-3xl">.</span>Shop
        </Link>
        <nav className="text-dark-800 flex items-center gap-4 text-sm font-medium sm:text-base">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/employee">Employee</NavLink>
          <NavLink to="/customer">Customer</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
