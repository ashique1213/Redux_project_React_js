import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin");

    if (token) {
      setIsAuthenticated(true);
      if (adminStatus === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    dispatch(signOut())
    navigate("/login");
  };

  return (
    <nav className="bg-[#0A1931] text-white px-10 py-4 flex justify-between items-center shadow-lg">
      <Link to={"/"}>
        <h1 className="text-xl font-extrabold cursor-pointer hover:text-gray-300 transition">Home</h1>
      </Link>
      <div className="flex space-x-6">
        {isAuthenticated ? (
          <>
            {isAdmin ? (
              <>
                <Link to="/adminhome">
                  <h1 className="text-md font-extrabold cursor-pointer hover:text-gray-300 transition">Users</h1>
                </Link>
                <Link to="/addnewuser">
                  <h1 className="text-md font-extrabold cursor-pointer hover:text-gray-300 transition">NewUser</h1>
                </Link>
              </>
            ) : (
              <Link to="/profile">
                <h1 className="cursor-pointer hover:text-gray-300 transition">Profile</h1>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="cursor-pointer hover:text-gray-300 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <h1 className="cursor-pointer hover:text-gray-300 transition">Login</h1>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


