import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Firebase setup
import { ref, get } from "firebase/database"; // Realtime DB functions

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Header from "../components/Header";

const FreelanceGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const gigsRef = ref(database, "freelanceGigs"); // Reference to 'freelanceGigs' in the DB
        const snapshot = await get(gigsRef);

        if (snapshot.exists()) {
          setGigs(Object.values(snapshot.val())); // Set gigs state with fetched data
        } else {
          setError("No freelance gigs found");
        }
      } catch (err) {
        setError("Failed to fetch freelance gigs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  return (
    <>
       
        <div className="max-w-7xl mx-auto p-6 mt-10 bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Available Freelance Gigs
          </h2>

          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full"></div>
            </div>
          )}

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gigs.length > 0 ? (
              gigs.map((gig, index) => (
                <div
                  key={index}
                  className="bg-blue-400 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {gig.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{gig.description}</p>
                  <p className="text-gray-600 mt-2">
                    <strong>Requirements:</strong> {gig.requirements}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Status:</strong> {gig.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No freelance gigs available
              </p>
            )}
          </div>
        </div>
     
    </>
  );
};

export default FreelanceGigs;
