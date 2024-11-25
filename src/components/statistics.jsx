import React, { useEffect, useState } from 'react'; // Ensure React is imported
import { AttachMoney, People, Sync } from '@mui/icons-material'; // MUI icons
import { Tooltip } from '@mui/material';
import { ref, get } from 'firebase/database'; // Import the necessary functions for Realtime Database
import { database } from '../firebase'; // Import Realtime Database instance from firebase.js

const Statistics = () => {
  const [allUsers, setAllUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  useEffect(() => {
    // Fetch total users
    const fetchAllUsers = async () => {
      try {
        const usersRef = ref(database, 'users'); // Reference to the "users" node in Realtime Database
        const snapshot = await get(usersRef); // Get the data from the reference
        if (snapshot.exists()) {
          setAllUsers(Object.keys(snapshot.val()).length); // Count the number of users
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    // Fetch active users (Assume active users are those who've logged in recently, e.g., last 30 days)
    const fetchActiveUsers = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        let activeCount = 0;
        if (snapshot.exists()) {
          const users = snapshot.val();
          const recentDate = new Date();
          recentDate.setMonth(recentDate.getMonth() - 1); // Get users who logged in within the last 30 days
          Object.values(users).forEach(user => {
            // Check for a "lastLogin" field or similar activity field in user object
            if (user.lastLogin && new Date(user.lastLogin) >= recentDate) {
              activeCount++;
            }
          });
          setActiveUsers(activeCount);
        }
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    // Fetch new users annually
    const fetchNewUsers = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        let newCount = 0;
        if (snapshot.exists()) {
          const users = snapshot.val();
          const currentYear = new Date().getFullYear();
          Object.values(users).forEach(user => {
            // Assuming users have a "createdAt" field or similar indicating the join year
            if (user.createdAt && new Date(user.createdAt).getFullYear() === currentYear) {
              newCount++;
            }
          });
          setNewUsers(newCount);
        }
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };

    // Call functions to fetch data
    fetchAllUsers();
    fetchActiveUsers();
    fetchNewUsers();
  }, []);

  const stats = [
    {
      id: 1,
      label: 'All Users',
      value: allUsers.toLocaleString(),
      icon: <Sync fontSize="large" className="text-indigo-600" />,
    },
    {
      id: 2,
      label: 'Active Users',
      value: activeUsers.toLocaleString(),
      icon: <AttachMoney fontSize="large" className="text-green-600" />,
    },
    {
      id: 3,
      label: 'New users annually',
      value: newUsers.toLocaleString(),
      icon: <People fontSize="large" className="text-blue-600" />,
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Key Statistics
        </h2>
        <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col hover:bg-indigo-200 items-center gap-y-4 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <Tooltip title={stat.label} arrow>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </Tooltip>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Statistics;
