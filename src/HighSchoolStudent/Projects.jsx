import React, { useState, useEffect } from 'react';
import { ref, get, push, set, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, database } from '../firebase'; // Import your Firebase config
import ProjectManagement from '../components/ProjectManagement';

const Projects = () => {
  const [user, setUser] = useState(null);
  const [ongoingProject, setOngoingProject] = useState(null); // To track if user has an ongoing project
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pathways, setPathways] = useState({}); // Store pathway data
  const [userPathway, setUserPathway] = useState(''); // Store selected pathway for user

  // Fetch the logged-in user and their project data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user's ongoing project
        const userProjectsRef = ref(database, `projects`);
        get(userProjectsRef).then((snapshot) => {
          if (snapshot.exists()) {
            const projects = snapshot.val();
            const ongoing = Object.values(projects).find(
              (project) => project.userId === currentUser.uid && project.status === 'in_progress'
            );
            setOngoingProject(ongoing);
          }
          setLoading(false); // Make sure loading is set to false when data has been fetched
        });

        // Fetch pathways data
        const pathwaysRef = ref(database, 'pathways');
        get(pathwaysRef).then((snapshot) => {
          if (snapshot.exists()) {
            setPathways(snapshot.val()); // Set pathways from the database
            // Optionally, set user's pathway from profile
            const userPathwayId = currentUser?.profileInformation?.pathways[0]?.pathwayId;
            setUserPathway(userPathwayId || ''); // Set user's pathway if available
          }
        });
      } else {
        setUser(null);
        setLoading(false); // If no user is found, also set loading to false
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle file upload logic
  const uploadFile = async (file) => {
    const storage = getStorage();
    const fileRef = storageRef(storage, `projects/${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  };

  const ProjectForm = ({ userId, pathways, userPathway }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [field, setField] = useState('');
    const [pathwayId, setPathwayId] = useState(userPathway); // Default to user's pathway
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
    };

    // Handle project submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);

      // Upload files and get their URLs
      const fileUrls = await Promise.all(files.map(uploadFile));

      // Create a unique project ID
      const projectRef = push(ref(database, 'projects'));

      // Set the project data
      const projectData = {
        title,
        description,
        userId,
        pathwayId, // Added pathwayId field
        field, // Added field
        submittedDate: new Date().toISOString(),
        files: fileUrls.map((url, index) => ({
          fileName: files[index].name,
          fileUrl: url,
          fileType: files[index].type,
          uploadedDate: new Date().toISOString(),
        })),
        feedback: [], // Empty feedback array initially
        status: 'in_progress', // Set project status
      };

      await set(projectRef, projectData);

      // Now, update the user's profile to include the project data
      const userRef = ref(database, `users/${userId}`);
      const userPathwaysUpdate = {
        [`profileInformation/pathways`]: [
          ...user.profileInformation?.pathways || [],
          { pathwayId, field }
        ],
      };

      await update(userRef, userPathwaysUpdate);

      setIsLoading(false);
      alert('Project created successfully!');
      setTitle('');
      setDescription('');
      setFiles([]);
    };

    // Get the fields based on the selected pathway
    const selectedPathwayFields = pathways[pathwayId]?.fields || [];

    return (
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Project Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pathwayId" className="block text-sm font-medium">Pathway</label>
          <select
            id="pathwayId"
            value={pathwayId}
            onChange={(e) => setPathwayId(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            {Object.keys(pathways).map((pathwayKey) => (
              <option key={pathwayKey} value={pathwayKey}>
                {pathways[pathwayKey].name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="field" className="block text-sm font-medium">Field</label>
          <select
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            {selectedPathwayFields.map((fieldOption, index) => (
              <option key={index} value={fieldOption}>
                {fieldOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="files" className="block text-sm font-medium">Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Create Project'}
        </button>
      </form>
    );
  };

  return (
    <div className="container bg-blue-900 mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-4 border-white"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-4xl font-bold text-center text-white mb-10">Projects</h2>

          {ongoingProject ? (

            <>
            <div className="text-center mb-6 text-gray-200">
              <p>
                You have an ongoing project: <strong>{ongoingProject.title}</strong>.<br />
              </p>

              
            
            </div>
            <ProjectManagement/>
            </>


          ) : (
            <div className="text-center mb-6 text-gray-200">
              <p>You can create a new project using the form below:</p>
            </div>
          )}

          {/* Conditionally render ProjectForm based on ongoing project */}
          {!ongoingProject && <ProjectForm userId={user?.uid} pathways={pathways} userPathway={userPathway} />}
        </div>
      )}
    </div>
  );
};

export default Projects;
