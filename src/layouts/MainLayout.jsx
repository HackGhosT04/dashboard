import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Hero from '../components/Hero';
import Header from '../components/Header';
import HomeCard from '../components/HomeCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in for the first time
    const isLoggedIn = localStorage.getItem('hasLoggedIn');
    let interval; // Declare interval outside the setInterval

    if (isLoggedIn) {
      setHasLoggedIn(true); // Set flag if already logged in
      setLoading(false); // Skip spinner if already logged in
    } else {
      // Simulate the loading progress over 3 seconds
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);
          setLoading(false); 
          localStorage.setItem('hasLoggedIn', 'true'); // Mark user as logged in
          return prev;
        });
      }, 30); 
    }

    return () => {
      if (interval) clearInterval(interval); 
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const fullPageRoutes = ['/login', '/signup']; 

  const isFullPageRoute = fullPageRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {/* Fixed Navbar */}
      {!isFullPageRoute && (
        <NavBar className="fixed top-0 left-0 h-full w-56 bg-gray-800 z-50" />
      )}

      {/* Main Content */}
      <div className={`${!isFullPageRoute ? 'ml-56' : ''}  flex-1 bg-white relative`}>
        {/* Spinner and blur overlay - Show only on first-time login */}
        {loading && !hasLoggedIn && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
            <div
              className="spinner-border animate-spin h-24 w-24 border-4 border-blue-500 border-t-transparent rounded-full"
              style={{ position: 'absolute', top: '20%' }}
            ></div>
            <div className="absolute top-1/3 text-xl text-blue-500 font-semibold">{progress}%</div>
          </div>
        )}

        {/* Fixed Hero and Header */}
        {!isFullPageRoute && (
          <div className="sticky top-0 z-40  bg-indigo-700">
            <Hero />
            <Header />
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`transition-all duration-500 p-6 ${loading ? 'blur-sm' : ''}`}
        >
          {!isFullPageRoute && <HomeCard />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
