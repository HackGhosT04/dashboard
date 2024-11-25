import React from 'react';
import { Box, Typography } from '@mui/material';  // Import MUI components

const CardComponent = ({ title, description, bgImage }) => {
  return (
    <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-all duration-300 ease-in-out">
      {/* Card Background */}
      <Box
        className="w-full h-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
        style={{
          backgroundImage: `url(${bgImage})`,  // Dynamically use the bgImage prop
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex flex-col justify-center items-center text-white px-4 py-2 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-40">
        <Typography variant="h4" className="font-bold mb-9 text-center">{title}</Typography>
        <Typography variant="body1" className="mb-4 text-center">{description}</Typography>
      </div>
    </div>
  );
};

export default CardComponent;
