import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBook, FaProjectDiagram, FaUniversity, FaClipboardList, FaEllipsisH, FaBlogger, FaUsersSlash, FaUserFriends } from 'react-icons/fa';
import Card from "./Card";

const NavBar = () => {
  // Get the stored theme mode from localStorage or default to 'default'
  const storedThemeMode = localStorage.getItem('themeMode') || 'default';
  const [themeMode, setThemeMode] = useState(storedThemeMode);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg px-4 py-3 border-2 border-blue-600 shadow-lg transition-all duration-300 ease-in-out transform scale-105'
      : 'text-gray-300 hover:bg-white-700 hover:text-white rounded-lg px-4 py-3 border-2 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105';

  // Function to change background color based on the mode
  const getNavBarBg = () => {
    switch (themeMode) {
      case 'white':
        return 'bg-black text-gray-800'; // Light mode
      case 'transparent':
        return 'bg-transparent text-white'; // Transparent mode
      default:
        return 'bg-indigo-700 text-white'; // Default mode
    }
  };

  // Function to update the theme and store it in localStorage
  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme); // Store theme in localStorage
  };

  return (
    <div className={`fixed top-0 left-0 w-56 h-full ${getNavBarBg()}  shadow-md z-50`}>
      <div className="w-124">
        <Card bg="bg-indigo-600 h-30">
          <h2 className="text-2xl font-bold mt-2 mb-4">Dashboard</h2>
        </Card>
      </div>

      <div className="flex flex-col space-y-6 p-4">
        <NavLink to="/users" className={linkClass}>
          <FaUsers className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Users
        </NavLink>
        <NavLink to="/groups" className={linkClass}>
          <FaUserFriends className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Groups
        </NavLink>
        
        <NavLink to="/universities" className={linkClass}>
          <FaUniversity className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Universities
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          <FaProjectDiagram className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Projects
        </NavLink>
        <NavLink to="/subjects" className={linkClass}>
          <FaBook className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Subjects
        </NavLink>
        <NavLink to="/pathways" className={linkClass}>
          <FaBlogger className="inline mr-3 text-xl transition-all duration-300 ease-in-out hover:text-blue-300" /> Pathways
        </NavLink>
      </div>

      {/* Mode Switcher at the Bottom */}
      <div className="flex flex-col justify-center items-center space-y-6 mt-6">
        <label className="flex items-center cursor-pointer">
          <span className={`mr-2 text-lg font-semibold ${themeMode === 'white' ? 'text-gray-800' : 'text-white'}`}>Dark</span>
          <div
            onClick={() => handleThemeChange(themeMode === 'white' ? 'default' : 'white')}
            className={`relative inline-block w-12 h-6 cursor-pointer transition-colors duration-300 ease-in-out rounded-full ${themeMode === 'white' ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${themeMode === 'white' ? 'translate-x-6' : ''}`}
            ></div>
          </div>
        </label>

       

        <label className="flex items-center cursor-pointer">
          <span className={`mr-2 text-lg font-semibold ${themeMode === 'default' ? 'text-gray-800' : 'text-white'}`}>Default Mode</span>
          <div
            onClick={() => handleThemeChange(themeMode === 'default' ? 'white' : 'default')}
            className={`relative inline-block w-12 h-6 cursor-pointer transition-colors duration-300 ease-in-out rounded-full ${themeMode === 'default' ? 'bg-indigo-700' : 'bg-gray-600'}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${themeMode === 'default' ? 'translate-x-6' : ''}`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default NavBar;
