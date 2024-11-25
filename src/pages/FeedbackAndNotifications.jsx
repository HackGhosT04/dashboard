import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Firebase setup
import { ref, get } from "firebase/database"; // Realtime DB functions

const FeedbackAndNotifications = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(true);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackRef = ref(database, "feedback"); // Reference to 'feedback' in the DB
        const notificationRef = ref(database, "notifications"); // Reference to 'notifications' in the DB

        const [feedbackSnapshot, notificationSnapshot] = await Promise.all([
          get(feedbackRef),
          get(notificationRef),
        ]);

        if (feedbackSnapshot.exists()) {
          setFeedbacks(Object.values(feedbackSnapshot.val())); // Set feedbacks state with fetched data
        } else {
          setError("No feedback available");
        }

        if (notificationSnapshot.exists()) {
          setNotifications(Object.values(notificationSnapshot.val())); // Set notifications state with fetched data
        } else {
          setError("No notifications available");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-xs mr-2 p-4 bg-blue-100 shadow-lg rounded-lg overflow-hidden">
      {/* Notifications Section */}
      <div className="mt-1">
        <h2
          className="text-2xl font-bold text-center text-gray-800 mb-6 mt-12 cursor-pointer"
          onClick={() => setIsNotificationsVisible(!isNotificationsVisible)}
        >
          Notifications
        </h2>

        {/* Collapsible content */}
        {isNotificationsVisible && (
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 p-4 rounded-lg shadow-md ${
                    notification.read ? "bg-green-100" : "bg-blue-400"
                  } hover:bg-white transition duration-300 ease-in-out`}
                >
                  <p className="text-gray-600">
                    <strong>Message:</strong> {notification.message}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong> {notification.date}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong>{" "}
                    {notification.read ? "Read" : "Unread"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No notifications available</p>
            )}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <h2
        className="text-2xl font-bold text-center text-gray-800 mb-6 cursor-pointer"
        onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
      >
        Feedback
      </h2>

      {/* Collapsible content */}
      {isFeedbackVisible && (
        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full"></div>
            </div>
          )}

          {error && <p className="text-red-600 text-center">{error}</p>}

          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <div
                key={index}
                className="bg-indigo-300 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                <p className="text-gray-600">
                  <strong>Comments:</strong> {feedback.comments}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {feedback.date}
                </p>
                <p className="text-gray-600">
                  <strong>Rating:</strong> {feedback.rating} / 5
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No feedback available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackAndNotifications;
