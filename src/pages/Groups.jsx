// src/components/Groups.jsx
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Header from "../components/Header";

const Groups = () => {
  const [groupData, setGroupData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group

  useEffect(() => {
    const fetchGroupData = async () => {
      const groupRef = ref(database, "groups");
      const snapshot = await get(groupRef);
      if (snapshot.exists()) {
        setGroupData(snapshot.val());
      } else {
        console.log("No data available");
      }
    };

    fetchGroupData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex-1 ml-56 bg-white">
      <div className="sticky top-0 z-40  bg-indigo-700">
            <Hero />
            <Header />
          </div>
        <div className="max-w-2xl mx-auto p-6">
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Groups
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Group List */}
          <div className="space-y-6 lg:col-span-2">
            {/* If groupData is not loaded, show a loading indicator */}
            {!groupData ? (
              <div className="text-center text-xl font-semibold text-gray-500">
                Loading groups...
              </div>
            ) : (
              Object.keys(groupData).map((groupId) => {
                const group = groupData[groupId];
                return (
                  <div
                    key={groupId}
                    className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <h1 className="text-2xl font-bold mb-2 text-blue-600 hover:text-blue-800">
                      {group.name}
                    </h1>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {group.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created by: {group.createdBy}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Group Details Panel */}
          {selectedGroup && (
            <div className="lg:col-span-1 bg-gray-50 p-8 rounded-lg mt-2 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {selectedGroup.name}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {selectedGroup.description}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Created by:{" "}
                <span className="font-semibold">{selectedGroup.createdBy}</span>
              </p>

              {/* Members */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  Members:
                </h3>
                <ul className="list-disc pl-6">
                  {Array.isArray(selectedGroup.members) &&
                  selectedGroup.members.length > 0 ? (
                    selectedGroup.members.map((memberId, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        User ID: {memberId}
                      </li>
                    ))
                  ) : (
                    <li>No members found</li>
                  )}
                </ul>
              </div>

              {/* Projects */}
              <div className="space-y-8">
                {Array.isArray(selectedGroup.projects) &&
                selectedGroup.projects.length > 0 ? (
                  selectedGroup.projects.map((project) => (
                    <div
                      key={project.projectId}
                      className="border p-4 rounded-lg shadow-md"
                    >
                      <h4 className="text-2xl font-semibold text-gray-800">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">
                        {project.description}
                      </p>
                      <p className="text-xs text-gray-400 mb-6">
                        Created on: {project.createdDate}
                      </p>

                      <div className="mt-4">
                        <h5 className="text-xl font-medium text-gray-800">
                          Tasks:
                        </h5>
                        {Array.isArray(project.tasks) &&
                        project.tasks.length > 0 ? (
                          project.tasks.map((task) => (
                            <div key={task.taskId} className="border-t pt-4">
                              <p className="text-lg text-gray-800">
                                {task.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                Assigned to: {task.assignedTo}
                              </p>
                              <p className="text-sm text-gray-600">
                                Status: {task.status}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No tasks available</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Groups;
