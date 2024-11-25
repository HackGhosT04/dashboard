import React from 'react';
import { Link } from 'react-router-dom';

const HomeIcon = () => {
  return (
    <Link
      to="/home"
      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
    >
      <svg
        className="h-6 w-6 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M3 12l2-2V6a1 1 0 011-1h4V3h6v2h4a1 1 0 011 1v4l2 2-9 6-9-6z"
        />
      </svg>
      <span className="text-gray-700 font-medium">Home</span>
    </Link>
  );
};

export default HomeIcon;
