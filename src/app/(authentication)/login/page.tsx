"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { notification } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import Link from "next/link";

// Define a type for notification types
type NotificationType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loging,setLoging] = useState(false)

  // Update the function to use the defined NotificationType and set a 3-second duration
  const openNotification = (type: NotificationType, message: string, description: string) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3, // Notification will disappear after 3 seconds
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoging(true)
    try {
      const response = await fetch("https://alsaifgallery.onrender.com/api/v1/user/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userInfo = data.data.user;

        // Display success notification with user's personal information
        openNotification("success", "Login Successful", `Name: ${userInfo.firstName} ${userInfo.lastName}\nEmail: ${userInfo.email}\nMobile: ${userInfo.mobile}`);
      } else {
        const errorData = await response.json();
        console.error("Login error", errorData);

        // Display error notification
        openNotification("error", "Login Failed", "Email or password is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      // Display error notification for exceptions
      openNotification("error", "Login Error", "Something went wrong. Please try again later.");
    } finally {
       setLoging(false)
    }
  };

  return (
    <div className="flex  mt-[128px] justify-center items-center py-10 bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 mx-3 shadow-xl w-full max-w-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">LOG IN</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div className="relative">
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <motion.button type="submit" className="w-full bg-green-600 text-white py-3 mt-6 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {loging ? "Loging......." : "Log In"}
          </motion.button>
        </form>
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Did Not have Account?{" "}
          <Link href="/register" className="text-green-600">
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  );
}
