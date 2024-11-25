import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Firebase setup
import { ref, get } from "firebase/database"; // Realtime DB functions

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Header from "../components/Header";

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorsRef = ref(database, "mentorship"); // Reference to 'mentorship' in the DB
        const snapshot = await get(mentorsRef);

        if (snapshot.exists()) {
          setMentors(Object.values(snapshot.val())); // Set mentors state with fetched data
        } else {
          setError("No mentors available");
        }
      } catch (err) {
        setError("Failed to fetch mentorship data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex-1 ml-56 bg-white">
        <div className="sticky top-0 z-40  bg-indigo-700">
          <Hero />
          <Header />
        </div>
        <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Available Mentors
          </h2>

          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full"></div>
            </div>
          )}

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mentors.length > 0 ? (
              mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <strong>Expertise:</strong> {mentor.expertise}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Availability:</strong> {mentor.availability}
                  </p>

                  {/* Loop through sessions for each mentor */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800">Sessions:</h4>
                    {mentor.sessions.length > 0 ? (
                      mentor.sessions.map((session, sessionIndex) => (
                        <div
                          key={sessionIndex}
                          className="bg-gray-200 p-3 rounded-lg mt-2"
                        >
                          <p className="text-gray-700">
                            <strong>Date:</strong> {session.sessionDate}
                          </p>
                          <p className="text-gray-700">
                            <strong>Notes:</strong> {session.notes}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No sessions available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No mentors available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentorship;
