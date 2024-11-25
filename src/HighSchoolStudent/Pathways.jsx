import React, { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { auth, database } from "../firebase"; // Import your Firebase config

const Pathways = () => {
  const [pathways, setPathways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedPathway, setSelectedPathway] = useState(null); // To track user's selected pathway

  // Fetch the logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch selected pathway
        const userRef = ref(database, `users/${currentUser.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists() && snapshot.val().selectedPathway) {
            setSelectedPathway(snapshot.val().selectedPathway);
          }
        });
      } else {
        setUser(null);
        setSelectedPathway(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch pathways data from Firebase Realtime Database
  useEffect(() => {
    const fetchPathways = async () => {
      try {
        const pathwaysRef = ref(database, "pathways");
        const snapshot = await get(pathwaysRef);
        if (snapshot.exists()) {
          const pathwaysData = snapshot.val();

          const pathwaysArray = Object.keys(pathwaysData).map((pathwayName) => {
            const pathway = pathwaysData[pathwayName];
            return {
              id: pathwayName,
              name: pathway.name,
              fields: pathway.fields || [],
              projects: pathway.projects || "None",
            };
          });

          setPathways(pathwaysArray);
        } else {
          console.log("No pathways data available.");
          setPathways([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pathways: ", error);
        setLoading(false);
      }
    };

    fetchPathways();
  }, []);

  const handleChoosePathway = async (pathwayId) => {
    if (!user) {
      alert("Please log in to choose a pathway.");
      return;
    }

    if (selectedPathway) {
      alert(`You have already chosen the "${selectedPathway}" pathway. Please contact support if you need to change it.`);
      return;
    }

    try {
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, {
        selectedPathway: pathwayId, // Save the selected pathway
      });
      setSelectedPathway(pathwayId); // Update local state
      alert("Pathway successfully added to your profile!");
    } catch (error) {
      console.error("Error updating user data: ", error);
      alert("An error occurred while choosing the pathway. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-4 border-white"></div>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-center text-white mb-10">
              Pathways
            </h2>

            <div className="text-center mb-6 text-gray-200">
              {selectedPathway ? (
                <p>
                  You have chosen the pathway: <strong>{selectedPathway}</strong>. You cannot choose another pathway.
                </p>
              ) : (
                <p>Select one pathway from the options below to proceed.</p>
              )}
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="flex-1 mr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pathways.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">
                      No pathways available.
                    </p>
                  ) : (
                    pathways.map((pathway) => (
                      <div
                        key={pathway.id}
                        className={`bg-gradient-to-r from-blue-50 to-gray-400 shadow-xl rounded-lg p-6 transition transform hover:scale-105 duration-300 ease-in-out ${
                          selectedPathway ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-2xl font-bold text-blue-700">
                            {pathway.name}
                          </h3>
                          <svg
                            className="h-6 w-6 text-indigo-800 hover:text-indigo-400 transition duration-300 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                          </svg>
                        </div>
                        <div className="text-sm text-black">
                          <h4 className="font-semibold text-indigo-600 mb-2">
                            Fields:
                          </h4>
                          <ul className="list-disc pl-5 mb-4">
                            {pathway.fields.map((field, index) => (
                              <li key={index} className="text-gray-600">
                                {field}
                              </li>
                            ))}
                          </ul>
                          <h4 className="font-semibold text-indigo-600">
                            Projects: {pathway.projects}
                          </h4>
                        </div>
                        {!selectedPathway && (
                          <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => handleChoosePathway(pathway.id)}
                          >
                            Choose Pathway
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pathways;
