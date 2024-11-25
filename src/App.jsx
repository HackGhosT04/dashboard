import {HashRouter as Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from 'react';
import MainLayout from './layouts/MainLayout';
import Users from './pages/Users';
import DevelopingTeam from './pages/DevelopeingTeam';
import Resources from './pages/Resources';
import Subjects from './pages/Subject';
import Mentorship from './pages/Mentorship';
import Groups from './pages/Groups';
import ContactSupport from './HighSchoolStudent/ContactSupport';


import Login from './HighSchoolStudent/Login';
import SignUp from './HighSchoolStudent/SignUp';
import Pathways from './HighSchoolStudent/Pathways';
import Universities from './HighSchoolStudent/Universities';
import FreelanceGigs from './HighSchoolStudent/FreelanceGigs';
import StudentHome from './HighSchoolStudent/StudentHome';
import StudentProfile from './HighSchoolStudent/StudentProfile';
import Projects from './HighSchoolStudent/Projects';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
        <Route path="/home" element={<MainLayout />} />

        
        <Route path="/team" element={<DevelopingTeam />} />
        <Route path="/users" element={<Users />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/projects" element={<Projects />} />


        
        <Route path="/resources" element={<Resources />} />
        
        <Route path="/mentorship" element={<Mentorship />} />





        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/freelanceGigs" element={<FreelanceGigs />} />
        <Route path="/support" element={<ContactSupport />} />
        <Route path="/studentHome" element={<StudentHome />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/universities" element={<Universities />} />

        


    
        
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
