import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = ({mode}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  

  
  const handleLogout = async () => {
    try{

      localStorage.removeItem("token",);
      await axios.get("http://localhost:3000/api/v1/auth/logout",{
        withCredentials: true,}) 
      console.log('berhasil keluar ahh', Response.data)
      navigate('/login')
    }
    catch(err){
      console.log('gagal keluar', err.response?.data?.message || err.message)
    }
    
  };  
  
  

  return (
    <nav className="w-full bg-white px-4 py-2 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <span className="text-black font-bold text-xl">
          <Link to="/">
            <span className="bg-yellow-300 px-1">See</span>
            <span className="text-black">nau</span>
          </Link>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center gap-4 relative">
        {/* Timer Text */}
        <div className="text-sm text-black font-medium tracking-wide capitalize">{mode}</div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-36 bg-white shadow-lg rounded-md py-2 text-sm z-50 transition-all duration-200 ease-in-out">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
            Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
