import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { database } from '../firebase'; 
import { useParams } from 'react-router-dom';

const ProjectManagement = () => {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  
  useEffect(() => {
    // Fetch project details from Firebase
    const projectRef = ref(database, `projects/${projectId}`);
    get(projectRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProject(snapshot.val());
        } else {
          setError('Project not found');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error fetching project');
        setIsLoading(false);
        console.error(err);
      });
  }, [projectId]);

  // Handle updating project details
  const handleUpdateProject = (updatedDetails) => {
    setIsLoading(true);
    const projectRef = ref(database, `projects/${projectId}`);
    update(projectRef, updatedDetails)
      .then(() => {
        setIsLoading(false);
        alert('Project updated successfully!');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  // Handle adding feedback
  const handleAddFeedback = () => {
    if (feedback.trim() === '') return;
    
    const updatedFeedback = [
      ...project.feedback,
      { mentorId: 'mentor1', comments: feedback, rating: rating }
    ];
    
    const projectRef = ref(database, `projects/${projectId}`);
    update(projectRef, { feedback: updatedFeedback })
      .then(() => {
        setFeedback('');
        setRating(0);
        alert('Feedback added successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-4 border-gray-300"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        project && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            <p className="text-lg text-gray-700 mb-2">Description: {project.description}</p>
            <p className="text-lg text-gray-700 mb-2">Pathway: {project.pathwayId}</p>
            <p className="text-lg text-gray-700 mb-2">Field: {project.field}</p>
            <p className="text-lg text-gray-700 mb-2">Submitted on: {project.submittedDate}</p>
            
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">Files</h3>
              {project.files && project.files.length > 0 ? (
                project.files.map((file, index) => (
                  <div key={index} className="mb-2">
                    <a href={file.fileUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                      {file.fileName} ({file.fileType})
                    </a>
                  </div>
                ))
              ) : (
                <p>No files available.</p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Feedback</h3>
              {project.feedback && project.feedback.length > 0 ? (
                project.feedback.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="font-semibold">{`Mentor ${item.mentorId}:`}</p>
                    <p>{item.comments}</p>
                    <p className="text-yellow-500">{`Rating: ${item.rating} stars`}</p>
                  </div>
                ))
              ) : (
                <p>No feedback yet.</p>
              )}
            </div>

            {/* Add feedback form */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Add Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter feedback"
                rows="4"
              />
              <div className="mb-4">
                <label className="block">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value={0}>Select Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <button
                onClick={handleAddFeedback}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Adding feedback...' : 'Add Feedback'}
              </button>
            </div>

            {/* Edit Project */}
            <div className="mt-6">
              <button
                onClick={() => handleUpdateProject({ title: 'Updated Title' })}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit Project Title
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectManagement;
