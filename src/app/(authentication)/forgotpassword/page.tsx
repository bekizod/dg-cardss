"use client";
import { useState } from "react";

import { notification } from "antd";
import "antd/dist/reset.css";
import { SmileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [step, setStep] = useState<"sendCode" | "recoverPassword">("sendCode");
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

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://alsaifgallery.onrender.com/api/v1/user/sendForgetPasswordCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.status) {
        openNotification(true, data.message);
        setStep("recoverPassword");
      } else {
        openNotification(false, data.message);
      }
    } catch (error) {
      console.error("Error sending code:", error);
      openNotification(false, "Failed to send the code. Please try again.");
    }
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      openNotification(false, "Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        "https://alsaifgallery.onrender.com/api/v1/user/recoverPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code, password: newPassword }),
        }
      );

      const data = await response.json();
      if (data.status) {
        openNotification(true, data.message);
        router.push("/login"); // Redirect to the login page
        setEmail("");
        setCode("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        openNotification(false, data.message);
      }
    } catch (error) {
      console.error("Error recovering password:", error);
      openNotification(
        false,
        "Failed to recover the password. Please try again."
      );
    }
  };

  return (
    <div className="flex max-lg:h-screen 2xl:mt-[124px] justify-center items-center py-28  bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === "sendCode" ? "Forgot Password" : "Recover Password"}
        </h2>
        <form
          onSubmit={
            step === "sendCode" ? handleSendCode : handleRecoverPassword
          }
          className="space-y-4"
        >
          {step === "sendCode" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Code
              </motion.button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Enter the code sent to your email"
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
                Update Password
              </motion.button>
            </>
          )}
        </form>
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          {step === "recoverPassword" && (
            <span
              onClick={() => setStep("sendCode")}
              className="cursor-pointer text-[var(--color-primary)]"
            >
              Back to Send Code
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
