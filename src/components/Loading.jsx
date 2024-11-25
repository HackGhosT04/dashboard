import React, { useState, useEffect } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increase progress from 0 to 100 over 5 seconds
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop interval once 100% is reached
          return 100;
        }
        return prevProgress + 2; // Adjust increment for smooth animation
      });
    }, 100); // Update progress every 100ms

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200">
             INITIALIZING RESOURCES
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-lightBlue-600">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-lightBlue-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
