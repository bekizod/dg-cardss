"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { postFeedback } from "@/redux/slices/postFeedbackSlice";
import { notification } from "antd";

const PostFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch<AppDispatch>();
const { currentLocale, translations } = useSelector(
  (state: RootState) => state.locale
);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(postFeedback(feedback)).unwrap();
      notification.success({
        message: "Success",
        description: `Feedback submitted successfully!`,
      });
      setFeedback(""); // Reset the feedback form
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.message || "Failed to submit feedback.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 p-6   dark:bg-gray-800 rounded-lg shadow-md"
    >
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder={translations.tn.enterFeedback}
        className="w-full  p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        rows={5}
        required
      />
      <button
        type="submit"
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-[var(--color-primary)] rounded-lg shadow-md hover:bg-[var(--color-secondary)]"
      >
        {translations.tn.submitFeedback}
      </button>
    </form>
  );
};

export default PostFeedback;
