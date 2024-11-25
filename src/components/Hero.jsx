import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Hero = () => {
  return (
    <section className="bg-gray-900  p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        
        {/* Logo */}
        <NavLink to="" className="flex items-center mb-4">
          <img className="h-12 w-auto" src={logo} alt="BrilliantBridge Logo" />
          <span className="hidden md:block text-white text-3xl font-bold ml-3">
            BrilliantBridge
          </span>
        </NavLink>

        {/* Hero Text */}
        <div className="text-center">
          <h4 className="text-3xl font-semibold text-white sm:text-2xl md:text-2xl">
            From Classroom to Career, Cross the Bridge to Brilliance
          </h4>
        </div>

        
      </div>
    </section>
  );
};

export default Hero;
