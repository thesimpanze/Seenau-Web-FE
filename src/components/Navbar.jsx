import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="w-full bg-white px-4 py-2 flex justify-between items-center ">
      <div className="flex items-center space-x-1">
        <span className="text-black font-bold text-xl">
          <Link to={"/"}>
          <span className="bg-yellow-300 px-1">See</span>
          <span className="text-black">nau</span>
          </Link>
        </span>
      </div>

      <div className="flex  justify-center items-center gap-3">
        <div className="text-sm text-black font-medium tracking-wide">Timer</div>

        <button className="p-2 rounded hover:bg-gray-100 transition">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
