import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Pager from '../components/Pager';
import { Avatar, Typography, Chip, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { blue, green, purple } from '@mui/material/colors';
import NavBar from '../components/NavBar';

const UserItem = ({ user, onClick, expandedUser, userType, typeLabel }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        <div className="flex items-center space-x-4">
          <Avatar sx={{ bgcolor: userType === 'admin' ? blue[500] : green[500] }}>
            {user.fullName ? user.fullName[0] : '?'}
          </Avatar>
          <Typography variant="h6" className="font-semibold text-gray-900">{user.fullName || 'No Name'}</Typography>
        </div>
        <Chip label={`Type: ${typeLabel}`} color="secondary" size="small" />
      </div>

      {expandedUser === user.id && (
        <div className="mt-4 space-y-2">
          {userType === 'high_school_student' ? (
            <>
              <Typography variant="body2" className="text-gray-600">School: {user.educationalDetails?.currentSchoolName || 'N/A'}</Typography>
              <Typography variant="body2" className="text-gray-500">Grade: {user.educationalDetails?.gradeLevel || 'N/A'}</Typography>
              <Typography variant="body2" className="text-gray-500">Subjects: {user.educationalDetails?.subjects?.join(', ') || 'N/A'}</Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" className="text-gray-600">University: {user.schoolOrUniversity || 'N/A'}</Typography>
              <Typography variant="body2" className="text-gray-500">Year of Study: {user.yearOfStudy || 'N/A'}</Typography>
              <Typography variant="body2" className="text-gray-500">Pathways: {user.pathways?.selectedPathways?.map(pathway => pathway.status).join(', ') || 'N/A'}</Typography>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersRef = ref(database, 'users');
      const adminsRef = ref(database, 'admins');
      
      try {
        const usersSnapshot = await get(usersRef);
        const adminsSnapshot = await get(adminsRef);

        if (usersSnapshot.exists()) {
          const usersData = usersSnapshot.val();
          const usersList = Object.keys(usersData).map(userId => ({
            id: userId,
            ...usersData[userId]
          }));
          setUsers(usersList);
        }

        if (adminsSnapshot.exists()) {
          const adminsData = adminsSnapshot.val();
          const adminsList = Object.keys(adminsData).map(adminId => ({
            id: adminId,
            ...adminsData[adminId]
          }));
          setAdmins(adminsList);
        }
      } catch (error) {
        console.error("Error fetching users and admins data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const handleUserClick = (userId) => {
    setExpandedUser(prevUserId => prevUserId === userId ? null : userId);
  };

  const highSchoolStudents = users.filter(user => user.userType === 'high_school_student');
  const undergraduates = users.filter(user => user.userType === 'undergraduate');
  const postgraduates = users.filter(user => user.userType === 'postgraduate');
  const organizations = users.filter(user => user.userType === 'organization');

  return (
    <>
      <NavBar />
      <div className="flex-1 ml-56 bg-white">
      <div className="sticky top-0 z-40  bg-indigo-700">
            <Hero />
            <Header />
          </div>

        <div className="mx-auto bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 p-4 bg-indigo-50 rounded-xl shadow-lg">
              <Typography variant="h3" className="font-semibold text-gray-900 text-center py-4">Admins</Typography>
            </div>

            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <UserItem key={admin.id} user={admin} expandedUser={expandedUser} onClick={() => handleUserClick(admin.id)} userType="admin" typeLabel="Admin" />
                ))
              ) : (
                <p className="text-center text-gray-500">No admins found.</p>
              )}
            </div>

            <div className="mt-12 mb-8 p-4 bg-indigo-50 rounded-xl shadow-lg">
              <Typography variant="h3" className="font-semibold text-gray-900 text-center py-4">Users</Typography>
            </div>

            <div className="space-y-8">
              {highSchoolStudents.length > 0 && (
                <div className="space-y-4 ">
                  <Typography variant="h4" className="font-semibold text-gray-900 text-center py-4">High School Students</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {highSchoolStudents.map((user) => (
                      <UserItem key={user.id} user={user} expandedUser={expandedUser} onClick={() => handleUserClick(user.id)} userType="high_school_student" typeLabel="High School" />
                    ))}
                  </div>
                </div>
              )}

              {undergraduates.length > 0 && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-semibold text-gray-900 text-center py-4">Undergraduates</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {undergraduates.map((user) => (
                      <UserItem key={user.id} user={user} expandedUser={expandedUser} onClick={() => handleUserClick(user.id)} userType="undergraduate" typeLabel="Undergraduate" />
                    ))}
                  </div>
                </div>
              )}

              {postgraduates.length > 0 && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-semibold text-gray-900 text-center py-4">Postgraduates</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {postgraduates.map((user) => (
                      <UserItem key={user.id} user={user} expandedUser={expandedUser} onClick={() => handleUserClick(user.id)} userType="postgraduate" typeLabel="Postgraduate" />
                    ))}
                  </div>
                </div>
              )}

              {organizations.length > 0 && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-semibold text-gray-900 text-center py-4">Organizations</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organizations.map((user) => (
                      <UserItem key={user.id} user={user} expandedUser={expandedUser} onClick={() => handleUserClick(user.id)} userType="organization" typeLabel="Organization" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
