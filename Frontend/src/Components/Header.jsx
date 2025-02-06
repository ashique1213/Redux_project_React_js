import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const {userName, userEmail} = useSelector((state) => state.auth)
    return (
      <div className="relative flex items-center justify-center h-[80vh] bg-[#0A1931]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-blue-500 blur-[120px] opacity-30"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-7xl md:text-8xl font-extrabold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            REDUX
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium capitalize">
            {userName ? `Welcome ${userName}` : ' '}
          </p>

          {/* <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 transition">
            Get Started
          </button> */}
        </div>
      </div>
    );
  };

export default Header;
