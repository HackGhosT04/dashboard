import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import Hero from '../components/Hero';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Loading from '../components/Loading'; // Import the Loading component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // For navigation after successful login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Use authenticated user's UID

      // Fetch user data from the "users" node
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();

        // Check the userType and navigate accordingly
        if (userData.userType === 'admin') {
          navigate('/home'); // Redirect to admin dashboard
        } else if (userData.userType === 'high_school_student') {
          navigate('/studentHome'); // Redirect to high school student dashboard
        } else if (userData.userType === 'undergraduate') {
          navigate('/home'); // Redirect to undergraduate dashboard
        } else if (userData.userType === 'postgraduate') {
          navigate('/home'); // Redirect to postgraduate dashboard
        } else if (userData.userType === 'organization') {
          navigate('/home'); // Redirect to organization dashboard
        } else {
          setError('User type not recognized.');
        }
      } else {
        setError('User data not found.');
      }
    } catch (error) {
      setError(error.message); // Display error if login fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Hero />
      <div className="flex min-h-full flex-col bg-blue-900 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-200 hover:text-green-100">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Not a member link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <NavLink
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>

      {/* Show Loading Spinner */}
      {loading && <Loading />}

      <Footer />
    </>
  );
};

export default Login;
