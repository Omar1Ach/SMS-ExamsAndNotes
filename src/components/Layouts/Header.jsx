import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { RxCaretDown } from "react-icons/rx";

import { Link } from "react-router-dom";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between pl-17 p-4 bg-white shadow-sm">
        <Link to="/Home" className="font-bold">
          <p>LOGO</p>
        </Link>
        <div className="relative">
          <div className="flex items-center space-x-4 pr-10">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex flex-col">
                <span className="text-gray-800 font-semibold">
                  Hamza Bourkha
                </span>
                <span className="text-gray-400 text-sm">
                  Directeur Pédagogique
                </span>
              </div>
            </div>
            <RxCaretDown
              size={25}
              className={`text-gray-400 cursor-pointer ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <button
                className="flex items-center block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full hover:bg-black/10 text-left"
                onClick={() => {
                  console.log("View Profile clicked");
                }}
              >
                <FaUserCircle className="text-xl text-gray-200 mr-2" />
                <span className="text-gray-200">View Profile</span>
              </button>
              <button className="flex items-center block px-4 py-2 text-gray-800 hover:bg-black/10  w-full text-left">
                <FaSignOutAlt className="text-xl text-meta-1 mr-2" />
                <span className="text-meta-1">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
