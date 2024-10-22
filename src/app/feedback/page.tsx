"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { postFeedback } from '@/redux/slices/postFeedbackSlice';
import { notification } from 'antd'; // Import Ant Design notification

const PostFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // Function to open notifications
  const openNotification = (type: 'success' | 'error', message: string, description: string) => {
    notification[type]({
      message,
      description,
      duration: 3,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch feedback and show success notification
      await dispatch(postFeedback(feedback)).unwrap();
      // Optionally show a success notification or message
      notification.success({
        message: "Success",
        description: `Feedback set successfully! `,
      });
    } catch (error: any ) {
    
      notification.error({
        message: "Error",
        description:   error?.message || 'Failed to set discount.',
      });
    }
  };

  return  (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 justify-center gap-4 mt-[124px]">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback"
        className="p-2 border rounded w-full"
        rows={4}
        required

      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Feedback
      </button>
    </form>
  );
};

export default PostFeedback;
