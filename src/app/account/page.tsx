"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
 // Import useAuth for context
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart, FaUndoAlt, FaHeart } from "react-icons/fa";
import { useAuth } from "@/context/UserContext";

const AccountPage = () => {
  const { user } = useAuth(); // Fetch user info from context
  const [showSettings, setShowSettings] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if we're in the browser
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setIsClient(true); // Set to true after the first render on the client
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle password change here, e.g., send API request
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  // Loading state for when user data is not yet available
  if (!isClient || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container   p-5 flex justify-center w-full dark:bg-gray-900 mt-[124px] dark:text-white">
      <div className="content max-w-7xl w-full bg-white dark:bg-gray-800 px-6 py-8 rounded-2xl shadow-lg mx-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="welcome-text">
            <p className="text-xl font-semibold">
              Welcome, {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <motion.div whileHover={{ rotate: 90 }} className="flex items-center cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
            <p className="mr-2 text-blue-500 dark:text-blue-300">Settings</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
        </div>

        {/* Settings Dropdown with Password Change Form */}
        {showSettings && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold mb-4">Change Password</p>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="old-password" className="block mb-1 text-sm font-medium">
                  Old Password
                </label>
                <input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              </div>
              <div>
                <label htmlFor="new-password" className="block mb-1 text-sm font-medium">
                  New Password
                </label>
                <input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium">
                  Confirm New Password
                </label>
                <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.05 }} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
                Change Password
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Utilities Section */}
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 mb-6">
          {[
            { href: "/SA_en/account/orders", icon: <FaShoppingCart size={32} />, label: "Orders" },
            { href: "/SA_en/account/returns", icon: <FaUndoAlt size={32} />, label: "Returns" },
            { href: "/SA_en/account/favourite", icon: <FaHeart size={32} />, label: "Favourite" },
          ].map((utility, index) => (
            <Link key={index} href={utility.href} className="w-full sm:w-1/3">
              <motion.div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center h-full min-h-[150px] p-4 cursor-pointer" whileHover={{ scale: 1.05 }}>
                {utility.icon}
                <p className="mt-2 text-sm md:text-base text-center">{utility.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Saved Addresses Section */}
        <Link href="/SA_en/account/address" className="block mb-4">
          <motion.div whileHover={{ x: 15 }} className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer ">
            <div className="flex justify-evenly items-center space-x-2 w-full ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="text-center  ">Saved Addresses</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
