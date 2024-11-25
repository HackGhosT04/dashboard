import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../firebase";
import { FaRegCheckCircle } from "react-icons/fa";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Header from "../components/Header";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsRef = ref(database, "subjects"); // Reference to 'subjects' node in the database
        const snapshot = await get(subjectsRef);

        if (snapshot.exists()) {
          setSubjects(snapshot.val()); // Set subjects state with fetched data
        } else {
          setError("No subjects found");
        }
      } catch (err) {
        setError("Failed to fetch subjects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex-1 ml-56 bg-white">
        <div className="sticky top-0 z-40  bg-indigo-700">
          <Hero />
          <Header />
        </div>
        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Available Subjects
          </h2>
        </div>
        <div className="max-w-2xl  flex mx-auto p-6  bg-white shadow-lg rounded-lg overflow-hidden">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full"></div>
            </div>
          )}

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  <FaRegCheckCircle className="text-green-500 text-xl" />
                  <span className="text-lg font-medium text-gray-700">
                    {subject}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No subjects available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
