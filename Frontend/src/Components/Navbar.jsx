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
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
            <Link to="/profile">
              <h1 className="cursor-pointer hover:text-gray-300 transition">Profile</h1>
            </Link>
            {isAdmin && (
              <Link to="/adminhome">
                <h1 className="cursor-pointer hover:text-gray-300 transition">Admin Home</h1>
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
