import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Skeleton,
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Header from "../components/Header";

const Resources = () => {
  const [resourceData, setResourceData] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchResourceData = async () => {
      const resourceRef = ref(database, "resources");
      const snapshot = await get(resourceRef);
      if (snapshot.exists()) {
        setResourceData(snapshot.val());
      } else {
        console.log("No data available");
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchResourceData();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex-1 ml-56 bg-white">
          <div className="sticky top-0 z-40  bg-indigo-700">
            <Hero />
            <Header />
          </div>
          <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Available Resources{" "}
            </h2>
          </div>
          <div className="grid grid-cols-1 w-30 mt-10 mb-5 lg:grid-cols-3 gap-8">
            <div className="max-w-2xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Loading Skeletons */}
              {[...Array(6)].map((_, index) => (
                <Card
                  key={index}
                  elevation={3}
                  className="transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <Skeleton variant="text" width="80%" height={28} />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={20}
                      className="my-2"
                    />
                    <Skeleton variant="text" width="50%" height={16} />
                  </CardContent>
                  <CardActions className="bg-gray-50 p-4">
                    <Skeleton variant="rectangular" width={100} height={36} />
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex-1 ml-56 bg-white">
      <div className="sticky top-0 z-40  bg-indigo-700">
            <Hero />
            <Header />
          </div>
        <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Available Resources{" "}
          </h2>
        </div>
        <div className="grid grid-cols-1 w-30 mt-10 mb-5 lg:grid-cols-3 gap-8">
          {/* Resource List */}
          <div className="space-y-6 ml-4 mr-2 lg:col-span-1">
            {Object.keys(resourceData).map((resourceId) => {
              const resource = resourceData[resourceId];
              return (
                <Card
                  key={resourceId}
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedResource(resource)}
                  elevation={3}
                >
                  <CardContent className="p-6">
                    <Typography
                      variant="h6"
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      {resource.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-sm text-gray-600 mb-2"
                    >
                      {resource.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-400"
                    >
                      Uploaded by: {resource.uploadedBy}
                    </Typography>
                  </CardContent>
                  <CardActions className="bg-gray-50 p-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      className="text-xs"
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>

          {/* Resource Details Panel */}
          {selectedResource && (
            <div className="lg:col-span-1 bg-gray-50 p-8 rounded-lg shadow-lg">
              <Typography variant="h4" className="text-gray-800 font-bold mb-6">
                {selectedResource.title}
              </Typography>
              <Typography
                variant="body1"
                className="text-lg text-gray-700 mb-4"
              >
                {selectedResource.type}
              </Typography>
              <Typography
                variant="body2"
                className="text-sm text-gray-500 mb-6"
              >
                Uploaded by:{" "}
                <span className="font-semibold">
                  {selectedResource.uploadedBy}
                </span>
              </Typography>
              <div className="mb-6">
                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg font-semibold flex items-center space-x-2"
                >
                  <Typography variant="body1">Access Resource</Typography>
                  <ArrowForwardIcon />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resources;
