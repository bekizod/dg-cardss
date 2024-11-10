"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import "antd/dist/reset.css";
import { SmileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const openNotification = (success: boolean, message: string) => {
    notification.open({
      message: success ? "Success" : "Error",
      description: message,
      icon: success ? (
        <SmileOutlined style={{ color: "#108ee9" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
      ),
      duration: 3,
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      openNotification(false, "Passwords do not match. Please try again.");
      return;
    }

    try {
      const token = "YOUR_BEARER_TOKEN"; // Replace with actual token logic
      const response = await fetch(
        "https://alsaifgallery.onrender.com/api/v1/user/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();
      if (data.status) {
        openNotification(true, data.message);
        router.push("/login"); // Redirect to the login page
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        openNotification(false, data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      openNotification(
        false,
        "Failed to change the password. Please try again."
      );
    }
  };

  return (
    <div className="flex max-lg:h-screen  lg:mt-[124px] justify-center items-center py-28 bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter your old password"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Change Password
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
