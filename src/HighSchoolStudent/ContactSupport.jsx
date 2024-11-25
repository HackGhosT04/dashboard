import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Adjust this import to your file structure
import { ref, get } from "firebase/database";


const ContactSupport = () => {
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupportData = async () => {
    try {
      const supportRef = ref(database, "contactSupport"); // Firebase path to your data
      const snapshot = await get(supportRef);

      if (snapshot.exists()) {
        setSupportData(snapshot.val());
      } else {
        throw new Error("No data available.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportData();
  }, []);

  if (loading)
    return (
      <>
        <div className="flex-1 ml-56 bg-gray-900">
          <div className="sticky top-0 z-40  bg-gray-900">
          </div>
          <div className="grid grid-cols-1 w-30 mt-10 mb-5 lg:grid-cols-3 gap-8">
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              <span className="ml-4 text-gray-900 font-semibold">
                Loading support information...
              </span>
            </div>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <>
        <div className="p-8 bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Contact Support
          </h1>
          <p className="text-white mb-8">{supportData.description}</p>

          <section>
            <h2 className="text-2xl font-semibold text-blue-500 mb-6">
              Features
            </h2>
            <div className="space-y-6">
              {Object.entries(supportData.features).map(
                ([featureKey, featureValue]) => (
                  <div
                    key={featureKey}
                    className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-blue-500 capitalize">
                      {featureKey}
                    </h3>
                    <p className="text-gray-700 mt-2">
                      {featureValue.description}
                    </p>

                    {featureValue.resources && (
                      <ul className="list-disc pl-6 mt-4 text-white">
                        {featureValue.resources.map((resource, index) => (
                          <li key={index} className="mt-1">
                            {resource}
                          </li>
                        ))}
                      </ul>
                    )}

                    {featureValue.emailSupport && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-blue-500">
                          Email Support
                        </h4>
                        <p>
                          Email:{" "}
                          <span className="text-blue-500">
                            {featureValue.emailSupport.address}
                          </span>
                        </p>
                        <p>
                          Response Time:{" "}
                          {featureValue.emailSupport.responseTime}
                        </p>
                      </div>
                    )}

                    {featureValue.phoneSupport && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-blue-500">
                          Phone Support
                        </h4>
                        <p>
                          Phone:{" "}
                          <span className="text-blue-500">
                            {featureValue.phoneSupport.number}
                          </span>
                        </p>
                        <p>
                          Availability: {featureValue.phoneSupport.availability}
                        </p>
                      </div>
                    )}

                    
                  </div>
                )
              )}
            </div>
          </section>
        </div>
    
    </>
  );
};

export default ContactSupport;
