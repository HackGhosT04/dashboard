import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Drawer, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { getDatabase, ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Import Firebase instance
import Universities from './Universities';
import FreelanceGigs from './FreelanceGigs';
import Pathways from './Pathways';
import FeedbackForm from './FeedbackForm';
import logo from '../assets/images/logo.png';
import ContactSupport from './ContactSupport';
import Projects from './Projects';


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
       
        <div className="flex items-center space-x-2">
          <span className="text-gray-200">{value || "Not available"}</span>
          
        </div>
      
       
    </div>
  );
};

const StudentHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'default');
  const [user, setUser] = useState(null);  // State to hold user data
  const [userData, setUserData] = useState(null);  // State for data fetched from Firebase
  const [dialogOpen, setDialogOpen] = useState(false);  // State for the Dialog
  const [dialogContent, setDialogContent] = useState('');  // Content to display in the Dialog
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg px-4 py-3 border-2 border-blue-600 shadow-lg transition-all duration-300 ease-in-out transform scale-105'
      : 'text-gray-300 hover:bg-white-700 hover:text-white rounded-lg px-4 py-3 border-2 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105';

  const getNavBarBg = () => {
    switch (themeMode) {
      case 'white':
        return 'bg-black text-gray-800';
      case 'transparent':
        return 'bg-transparent text-white';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleLinkClick = (content) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  useEffect(() => {
    const auth = getAuth();

    // Listen for user authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If user is authenticated, fetch user data from Firebase
        const userId = currentUser.uid;
        const userRef = ref(database, `users/${userId}`); // Fetch user data from specific user node

        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData(data); // Set user data
            setUser({
              name: data.fullName,
              grade: data.educationalDetails.gradeLevel,
              profilePic: data.profilePic || "/path/to/default-pic.jpg", // Default or user-provided profile pic
              subjects: data.educationalDetails.subjects,

            });
          }
        });
      } else {
        // Handle case if no user is logged in
        setUser(null);
        setUserData(null);
      }
    });
  }, []);

  if (!user || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-900 h-screen">
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#1A202C',
            color: 'white',
            padding: '20px',
          },
        }}
        variant="temporary"
        anchor="left"
      >
        <div className="flex  flex-col items-center">
          <Avatar sx={{ width: 60, height: 60 }} src={user.profilePic} />
          <h2 className="text-xl mt-2 text-center">{user.name}</h2>
          <p className="text-sm text-gray-300">{user.grade}</p>
        </div>

        <div className="flex flex-col space-y-6 p-4">
          <button onClick={() => handleLinkClick(<Universities />)} className={linkClass}>
            Universities
          </button>
          <button onClick={() => handleLinkClick(<FreelanceGigs />)} className={linkClass}>
            Freelance Gigs
          </button>
          <button onClick={() => handleLinkClick(<Pathways />)} className={linkClass}>
            Pathways
          </button>
          <button onClick={() => handleLinkClick('Content for Certificates')} className={linkClass}>
            Certificates
          </button>
          <button onClick={() => handleLinkClick(<FeedbackForm />)} className={linkClass}>
            Feedback
          </button>


        </div>

        <button
          onClick={handleLogout}
          className="flex items-center text-sm font-semibold text-white hover:text-blue-600 transition-all duration-200 border border-gray-300 rounded-lg px-3 py-2 hover:border-blue-500"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </Drawer>

      <div className="flex-1 flex flex-col bg-gray-900">
        <div className={`flex  items-center justify-between px-4 py-3 shadow-md ${getNavBarBg()}`}>
          <div className="flex items-center">
            <IconButton color="inherit" onClick={toggleSidebar} className="md:hidden">
              <MenuIcon />
            </IconButton>
            <h1 className="text-2xl font-semibold ml-2">Menu</h1>
          </div>



          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">


            <NavLink to="" className="flex items-center mb-4">
              <img className="h-12 w-auto" src={logo} alt="BrilliantBridge Logo" />
              <span className="hidden md:block text-white text-3xl font-bold ml-3">
                BrilliantBridge
              </span>
            </NavLink>

            <div className="text-center">
              <h5 className="text-3xl font-semibold text-white sm:text-2xl md:text-2xl">
                From Classroom to Career, Cross the Bridge to Brilliance
              </h5>
            </div>

          </div>

          <div className="flex items-center">
            <p onClick={() => handleLinkClick(<ContactSupport />)} className={`${linkClass} mr-4`}>Help?</p>
          </div>
        </div>

        <div className="bg-black h-screen p-4">
          <div className="flex flex-col md:flex-row md:h-full">
            {/* Sidebar */}
            <div className="w-full  md:w-1/4 bg-gray-900 rounded-lg p-6">
              <div className="flex  items-center gap-2 mb-8">
                <div className="bg-blue-400 p-4 rounded-full">
                  <i className="text-white text-lg">🎓</i>
                </div>
                <h2 className="font-semibold text-white text-lg">Quick Access</h2>
              </div>
              <ul className="space-y-4 text-white">
                <div className="flex flex-col space-y-6 p-4">
                  <NavLink to="" className={linkClass}>⏳ Notification</NavLink>
                  <NavLink to="" className={linkClass}>📋 Activities</NavLink>
                  <NavLink to="/projects" className={linkClass}>📚 Project</NavLink>
                  <NavLink to="" className={linkClass}>📊 Result</NavLink>
                  <NavLink to="" className={linkClass}>📅 Groups</NavLink>
                  <NavLink to="" className={linkClass}>🗒 Events</NavLink>
                  <NavLink to="/profile" className={linkClass}> Profile</NavLink>
                </div>
              </ul>
            </div>

            {/* User info */}
            <div className="w-full md:w-3/4 bg-gray-900 rounded-lg p-6 md:ml-6 shadow-lg">
              <div className="flex justify-between bg-blue-900 p-4 rounded-lg  items-center mb-8">
                <div>
                  <h1 className="text-xl font-bold text-blue-200">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-blue-500 text-sm">
                    Always stay updated in your student portal
                  </p>
                </div>


                <div className="flex flex-col gap-4 bg-gray-800 text-blue-100 p-6 rounded-xl mb-6">
                  <h3 className="text-2xl font-semibold">Your Pathway</h3>
                    <EditableField
                      value={userData?.selectedPathway}
                      onChange={(value) => updateField("selectedPathway", { email: value })}
                    />

                </div>
              </div>


              {/* Main content */}
              <div className="flex justify-between bg-blue-900 p-4 rounded-lg  items-center mb-8">
                
               



              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: 'auto', // Width will adjust based on content
            height: 'auto', // Height will adjust based on content
            maxWidth: 'unset', // Remove default maxWidth restriction
            maxHeight: '90vh', // Optional: Prevent dialog from exceeding viewport height
          },
        }}
        PaperProps={{
          style: {
            backgroundColor: '#1A202C', // gray-900 background
            color: 'white',            // Text color to match the dark background
            padding: '16px',           // Optional: Add some padding for better layout
          },
        }}
      >
        <DialogContent>
          <p>{dialogContent}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="blue">
            Close
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default StudentHome;
