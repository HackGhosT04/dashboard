import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { auth } from "../firebase";
import Hero from "../components/Hero";

const SectionContainer = ({ title, children }) => (
  <div className="rounded-lg bg-gray-900 text-white p-6 shadow-md mb-8">
    <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-700 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const EditableField = ({ label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onChange(currentValue);
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <span className="text-gray-400 font-medium">{label}</span>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-gray-200">{value || "Not available"}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const ListDetails = ({ label, items }) => (
  <div className="mb-4">
    <p className="font-medium text-gray-400 mb-2">{label}:</p>
    {items && items.length > 0 ? (
      <ul className="pl-4 list-disc space-y-1 text-gray-300">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No items available</p>
    )}
  </div>
);

const StudentProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateField = (path, value) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/${path}`);
      update(userRef, value)
        .then(() => {
          setUserData((prevData) => ({
            ...prevData,
            ...value,
          }));
        })
        .catch((error) => {
          console.error("Failed to update data:", error);
        });
    }
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setError("No user data found.");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No user is logged in.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-300">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
        <p className="text-gray-400 ml-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  return (
    <>
      <Hero />

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <SectionContainer title="Personal Information">
            <EditableField
              label="Email"
              value={userData?.email}
              onChange={(value) => updateField("email", { email: value })}
            />
            <EditableField
              label="Phone Number"
              value={userData?.phoneNumber}
              onChange={(value) =>
                updateField("phoneNumber", { phoneNumber: value })
              }
            />
            <EditableField
              label="Date of Birth"
              value={userData?.profileInformation?.dateOfBirth}
              onChange={(value) =>
                updateField("profileInformation", { dateOfBirth: value })
              }
            />
            <EditableField
              label="Area of Interest"
              value={userData?.profileInformation?.areaOfInterest}
              onChange={(value) =>
                updateField("profileInformation", { areaOfInterest: value })
              }
            />
          </SectionContainer>

          {/* Educational Details */}
          <SectionContainer title="Educational Details">
            <EditableField
              label="School Name"
              value={userData?.educationalDetails?.currentSchoolName}
              onChange={(value) =>
                updateField("educationalDetails", {
                  currentSchoolName: value,
                })
              }
            />
            <EditableField
              label="Grade Level"
              value={userData?.educationalDetails?.gradeLevel}
              onChange={(value) =>
                updateField("educationalDetails", { gradeLevel: value })
              }
            />
            <ListDetails
              label="Subjects"
              items={userData?.educationalDetails?.subjects}
            />
          </SectionContainer>

          {/* Other sections can follow a similar editable pattern */}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
