import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase"; // Adjust the path as needed
import Hero from "../components/Hero";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState(""); // New state for user type
  const [schoolName, setSchoolName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [universityName, setUniversityName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [researchArea, setResearchArea] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading bar
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Show loading bar
    setTimeout(() => {
      setLoading(false); // Hide loading bar after 5 seconds
    }, 10000);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Prepare user data based on user type
      let userData = {
        fullName,
        email,
        phoneNumber,
        userType,
      };

      if (userType === "high_school_student") {
        userData.educationalDetails = {
          currentSchoolName: schoolName,
          gradeLevel,
          subjects,
        };
      } else if (userType === "undergraduate") {
        userData.educationalDetails = {
          schoolOrUniversity: universityName,
          yearOfStudy,
        };
      } else if (userType === "postgraduate") {
        userData.educationalDetails = {
          schoolOrUniversity: universityName,
          researchArea,
        };
      } else if (userType === "organization") {
        userData.organizationDetails = {
          organizationName,
        };
      }

      // Store user data in Firebase
      await set(ref(database, `users/${userId}`), userData);

      navigate("/");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setPhoneNumber("");
      setUserType("");
      setSchoolName("");
      setGradeLevel("");
      setSubjects([]);
      setUniversityName("");
      setYearOfStudy("");
      setResearchArea("");
      setOrganizationName("");
    } catch (err) {
      setError(err.message);
      setLoading(false); // Ensure loading bar is hidden on error
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="h-2 w-full max-w-xl bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-indigo-600 animate-pulse"></div>
          </div>
        </div>
      )}
      <Hero />
      <div className={`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ${loading ? "blur-sm" : ""}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            User Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignUp}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-900">
                User Type
              </label>
              <div className="mt-2">
                <select
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="">Select user type</option>
                  <option value="high_school_student">High School Student</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            </div>

            {/* Common Fields */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Fields for High School Student */}
            {userType === "high_school_student" && (
              <>
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-900">
                    School Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-900">
                    Grade Level
                  </label>
                  <div className="mt-2">
                    <input
                      id="gradeLevel"
                      name="gradeLevel"
                      type="text"
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-900">
                    Subjects
                  </label>
                  <div className="mt-2">
                    <input
                      id="subjects"
                      name="subjects"
                      type="text"
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value.split(","))}
                      placeholder="Enter subjects, separated by commas"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Fields for Undergraduate */}
            {userType === "undergraduate" && (
              <>
                <div>
                  <label htmlFor="universityName" className="block text-sm font-medium text-gray-900">
                    University Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="universityName"
                      name="universityName"
                      type="text"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-900">
                    Year of Study
                  </label>
                  <div className="mt-2">
                    <input
                      id="yearOfStudy"
                      name="yearOfStudy"
                      type="text"
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Fields for Postgraduate */}
            {userType === "postgraduate" && (
              <>
                <div>
                  <label htmlFor="researchArea" className="block text-sm font-medium text-gray-900">
                    Research Area
                  </label>
                  <div className="mt-2">
                    <input
                      id="researchArea"
                      name="researchArea"
                      type="text"
                      value={researchArea}
                      onChange={(e) => setResearchArea(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Fields for Organization */}
            {userType === "organization" && (
              <>
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-900">
                    Organization Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>

            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Log In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
