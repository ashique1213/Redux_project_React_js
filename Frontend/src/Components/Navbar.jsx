import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0A1931] text-white px-10 py-4 flex justify-between items-center shadow-lg">
      <Link to={"/"}>
      <h1 className="text-xl font-extrabold cursor-pointer hover:text-gray-300 transition">Home</h1>
      </Link>
      <div className="flex space-x-6">
        <Link to={"/profile"}>
        <h1 className="cursor-pointer hover:text-gray-300 transition">Profile</h1>
        </Link>
        <Link to={""}>
        <h1 className="cursor-pointer hover:text-gray-300 transition">ADD-NewUser</h1>
        </Link>
        <Link to={"/login"}>
        <h1 className="cursor-pointer hover:text-gray-300 transition">Login</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar
