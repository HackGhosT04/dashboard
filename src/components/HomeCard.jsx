import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardComponent from "./CardComponent";
import Statistics from "./Statistics";
import FeedbackAndNotifications from "../pages/FeedbackAndNotifications";

const HomeCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Main Cards */}
        <div className="col-span-2 space-y-8">
          {/* Row of Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 p-4 bg-indigo-100 rounded-xl  gap-6">
            <Card className="shadow-lg rounded-xl p-1 bg-gray-800 flex flex-col justify-between transition-all duration-500 hover:bg-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500">
              <div>
                <h2 className="text-xl font-semibold py-2 text-gray-800">Admin Info</h2>
              </div>
              <Link
                to=""
                className="mt-4 bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
              >
                More
              </Link>
            </Card>

            <Card className="shadow-lg rounded-xl p-1 bg-indigo-900 flex flex-col justify-between transition-all duration-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500">
              <div>
                <h2 className="text-xl font-semibold py-2 text-indigo-800">Developing Team</h2>
              </div>
              <Link
                to="/team"
                className="mt-4 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition"
              >
                To Team
              </Link>
            </Card>

          </div>


          {/* Statistics Section */}
          <Statistics />
        </div>

        {/* Right Section - Additional Content */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold ml-20 text-blue-600">Quick Access</h2>
          <FeedbackAndNotifications />

          <ul className=" space-y-4">

            <li>
              <Link
                to="/support"
                className="block bg-gray-700 text-white text-sm rounded-lg px-4 py-2 hover:bg-gray-800 transition"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="block bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700 transition"
              >
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
