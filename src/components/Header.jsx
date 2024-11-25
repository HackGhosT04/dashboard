import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes, FaClipboardList, FaBriefcase, FaUserTie, FaCertificate, FaSignOutAlt } from 'react-icons/fa'; // Importing new icons
import HomeIcon from '../components/HomeIcon';

const Header = () => {
  const navigate = useNavigate(); // For navigation after logout
  const location = useLocation(); // To get the current route
  const [isOpen, setIsOpen] = useState(false); // State to control drawer visibility

  // Handle logout
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Sign the user out
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Toggle the drawer (nav menu) open/close
  const toggleNavBar = () => setIsOpen(!isOpen);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-white hover:bg-indigo-100 shadow-lg">
        <nav className="flex items-center justify-between p-4 md:px-8">
          {/* Logo/Home Icon */}
          <div className="flex items-center">
            <HomeIcon />
          </div>

          {/* Hamburger icon for mobile */}
          <button
            onClick={toggleNavBar}
            className="md:hidden text-3xl text-gray-700"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation links */}
          <div className={`md:flex items-center space-x-6 hidden ${isOpen ? 'block' : 'hidden'} md:block`}>
            <Link
              to="/resources"
              className={`flex items-center text-sm font-semibold px-3 py-2 border rounded-lg transition-all duration-200 
              ${isActive('/resources') ? 'bg-blue-500 text-white' : 'text-gray-900 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}
            >
              <FaClipboardList className="mr-2" /> Resources
            </Link>
            <Link
              to="/freelanceGigs"
              className={`flex items-center text-sm font-semibold px-3 py-2 border rounded-lg transition-all duration-200 
              ${isActive('/freelanceGigs') ? 'bg-blue-500 text-white' : 'text-gray-900 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}
            >
              <FaBriefcase className="mr-2" /> Freelance Gigs
            </Link>
            <Link
              to="/mentorship"
              className={`flex items-center text-sm font-semibold px-3 py-2 border rounded-lg transition-all duration-200 
              ${isActive('/mentorship') ? 'bg-blue-500 text-white' : 'text-gray-900 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}
            >
              <FaUserTie className="mr-2" /> Mentorship
            </Link>
            <Link
              to="/certifications"
              className={`flex items-center text-sm font-semibold px-3 py-2 border rounded-lg transition-all duration-200 
              ${isActive('/certifications') ? 'bg-blue-500 text-white' : 'text-gray-900 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}
            >
              <FaCertificate className="mr-2" /> Certifications
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600 transition-all duration-200 border border-gray-300 rounded-lg px-3 py-2 hover:border-blue-500"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
