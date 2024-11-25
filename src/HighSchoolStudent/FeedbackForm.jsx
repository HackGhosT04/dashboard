import React, { useState } from 'react';
import { TextField, Button, Rating } from '@mui/material';
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { auth, database } from '../firebase'; // Import the Firebase config and initialized services

const FeedbackForm = () => {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the current authenticated user
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      // Get a reference to the 'feedback' node in Firebase Realtime Database
      const feedbackRef = ref(database, 'feedback');

      // Generate a new unique feedback ID
      const newFeedbackRef = push(feedbackRef);

      // Prepare the feedback data
      const feedbackData = {
        userId: userId,
        comments: comments,
        date: serverTimestamp(), // Automatically set the current timestamp
        rating: rating,
      };

      try {
        // Save the feedback data under the unique ID
        await set(newFeedbackRef, feedbackData);
        alert('Feedback submitted successfully!');
        setComments('');
        setRating(0);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form" style={{ width: '600px', padding: '20px', backgroundColor: '#1A202C', color: 'white', borderRadius: '8px' }}>
  <h2 className="text-xl font-semibold text-center mb-6">Submit Feedback</h2>
  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
    {/* Comments Section */}
    <TextField
      label="Your Comments"
      multiline
      rows={4}
      value={comments}
      onChange={(e) => setComments(e.target.value)}
      fullWidth
      required
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: '#2D3748',  // Dark background for the text field
          color: 'white',              // White text color for the input
        },
        '& .MuiInputLabel-root': {
          color: 'gray',  // Label color to ensure it’s readable
        },
      }}
    />

    {/* Rating Section */}
    <div className="mb-4">
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newRating) => setRating(newRating)}
        precision={0.5}
        sx={{
          color: 'white', // Make the rating stars white for better visibility
        }}
      />
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      variant="contained"
      sx={{
        backgroundColor: '#4A90E2',  // Blue background for better contrast
        color: 'white',              // White text for visibility
        '&:hover': {
          backgroundColor: '#357ABD', // Darker blue on hover
        },
      }}
      disabled={isSubmitting || !comments || rating === 0}
      fullWidth
    >
      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
    </Button>
  </form>
</div>

  );
};

export default FeedbackForm;
