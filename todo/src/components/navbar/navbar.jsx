import React from 'react'
import { FaSearch,FaTh, FaSun,FaMoon } from "react-icons/fa";
import { useTheme } from '../../themeContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const {theme,toggleTheme}=useTheme();
    const navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");  
        sessionStorage.removeItem("token");  
        navigate("/");
      };
    

  return (
   <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} py-4 px-6 flex justify-between items-center shadow-md`}>
      
      <div className="flex items-center gap-4">
        <button className="text-2xl">
          
        </button>
        <span className="text-xl font-bold text-green-500">DoIt</span>
      </div>
 
      <div className="flex items-center gap-6">
        <FaSearch className="text-lg cursor-pointer" />
        <FaTh className="text-lg cursor-pointer" />
        <button onClick={toggleTheme}  className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} >
             {theme === 'dark' ? (
            <FaSun className="text-yellow-400" size={20} />
          ) : (
            <FaMoon className="text-gray-600" size={20} />
          )}
          </button>
          <button onClick={handleLogout} className="mt-3 px-4 py-2 bg-green-600 rounded-md font-semibold cursor-pointer">Log Out</button>
      </div>
    </nav>
  );
}

export default Navbar