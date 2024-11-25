import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

// MUI Components
import { Container, Grid, Typography, Card, CardContent, CardHeader, IconButton, CircularProgress } from '@mui/material';
// MUI Icons
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const Universities = () => {
  const [universitiesData, setUniversitiesData] = useState({});
  const [loading, setLoading] = useState(true);

  // State to track the open/close state of each university's courses
  const [openCourses, setOpenCourses] = useState({});

  useEffect(() => {
    // Fetch university data from Firebase Realtime Database
    const fetchUniversities = async () => {
      const universitiesRef = ref(database, 'universities');
      try {
        const snapshot = await get(universitiesRef);
        if (snapshot.exists()) {
          setUniversitiesData(snapshot.val()); // Update state with the fetched data
        } else {
          console.log("No universities data available.");
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false); // Stop loading state after data is fetched
      }
    };

    fetchUniversities(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs only once after the first render

  // Function to toggle the visibility of a university's courses
  const handleToggleCourses = (universityName) => {
    setOpenCourses(prevState => ({
      ...prevState,
      [universityName]: !prevState[universityName],
    }));
  };

  return (
    <>

      {/* Show loading spinner or the fetched data */}
      <Container
        sx={{
          width: '1000px', // Fixed width
          margin: '0 auto', // Center align horizontally
          padding: '16px', // Optional: Add padding for content spacing
          backgroundColor: '#1A202C', // gray-900 background
          borderRadius: '8px', // Rounded corners
          marginTop: '40px', // Space at the top
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography variant="h4" className="font-bold text-center mb-6">
              Universities by Province
            </Typography>

            {Object.entries(universitiesData).map(([province, universities]) => (
              <div key={province} className="mb-8">
                <Typography variant="h5" className="text-xl font-semibold mb-4">
                  {province}
                </Typography>

                <Grid container spacing={3}>
                  {Object.entries(universities).map(([universityName, universityData]) => (
                    <Grid item xs={12} sm={6} md={4} key={universityName}>
                      <Card className="shadow-lg hover:shadow-2xl transition-all duration-100">
                        <CardHeader
                          avatar={<SchoolIcon className="text-blue-500" />}
                          title={universityName.replace(/_/g, ' ')}
                          subheader="University Details"
                          action={
                            <IconButton onClick={() => handleToggleCourses(universityName)}>
                              {openCourses[universityName] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          }
                        />
                        <CardContent>
                          {openCourses[universityName] && (
                            <div>
                              {Object.entries(universityData.courses || {}).map(([courseName, courseData]) => (
                                <div key={courseName} className="mb-4">
                                  <Typography variant="body1" className="font-semibold">
                                    {courseName.replace(/_/g, ' ')}
                                  </Typography>
                                  <Typography variant="body2" className="text-gray-600">
                                    Duration: {courseData.duration || 'Not specified'}
                                  </Typography>
                                  <Typography variant="body2" className="text-gray-600">
                                    Credits: {courseData.credits || 'Not specified'}
                                  </Typography>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </>
        )}
      </Container>


    </>
  );
};

export default Universities;
