import React from 'react';
import { Avatar, Tooltip, IconButton } from '@mui/material';
import { LinkedIn, Twitter, Email } from '@mui/icons-material'; // Importing MUI icons
import profileImage from '../assets/images/IMG-20231023-WA0014.jpg';
import Hero from '../components/Hero';
import Header from '../components/Header';

const DevelopingTeam = () => {
  return (
    <>
      <Hero />
      <Header />
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Leadership
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Meet the team that drives our vision and innovation, working collaboratively to deliver exceptional results for our clients.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-16"
          >
            {/* Team Member 1 */}
            <li className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
              <div className="flex flex-col items-center">
                <Avatar
                  alt="Brilliant Rihlampfu"
                  src={profileImage}
                  sx={{ width: 80, height: 80 }}
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Brilliant Rihlampfu
                </h3>
                <p className="mt-1 text-sm font-medium text-indigo-600">
                  Co-Founder / CEO
                </p>
                <div className="mt-4 flex gap-3">
                  <Tooltip title="LinkedIn" arrow>
                    <IconButton
                      size="small"
                      color="primary"
                      component="a"
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter" arrow>
                    <IconButton
                      size="small"
                      color="info"
                      component="a"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email" arrow>
                    <IconButton
                      size="small"
                      color="secondary"
                      component="a"
                      href="mailto:example@example.com"
                    >
                      <Email />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </li>
            {/* Add more team members here */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DevelopingTeam;
