"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaShoppingCart, FaUndoAlt, FaHeart, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useAuth } from "@/context/UserContext";
import { notification } from "antd";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"; 


const AccountPage = () => {
  const { user,logout, token } = useAuth(); // Fetch user info from context
  const router = useRouter(); // Use router for redirection
  const [showSettings, setShowSettings] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const tokenInCookie = Cookies.get("token");
    if (!tokenInCookie) {
      router.push("/login"); // Redirect to login if no token is found
    }
  }, [router]);

  // State for profile update
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    // Update state when user data becomes available
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setMobile(user.mobile);
      setCountry(user.country);
    }
  }, [user]); // Dependency on user

  const handleLogout = () => {
    logout(); // Call logout function from the context
  };

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Error',
        description: 'New Password and Confirm Password do not match!',
      });
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await fetch('https://alsaifgallery.onrender.com/api/v1/user/changePassword', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      if (data.status) {
        notification.success({
          message: 'Success',
          description: data.message,
        });
      } else {
        notification.error({
          message: 'Error',
          description: data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to change password. Please try again.',
      });
    }
  };

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      const response = await fetch('https://alsaifgallery.onrender.com/api/v1/user/updateProfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, mobile, country }),
      });

      const data = await response.json();
      if (data.status) {
        notification.success({
          message: 'Success',
          description: data.message,
        });
      } else {
        notification.error({
          message: 'Error',
          description: data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update profile. Please try again.',
      });
    }
  };

  if (!user) {
    return (
      <div className="mt-[124px] flex justify-center bg-slate-500 items-center h-screen">
        Loading... <div>Check your Connection</div>
      </div>
    );
  }

  return (
    <div className="page-container p-5 flex justify-center w-full dark:bg-gray-900 lg:mt-[124px] mt-[68px] dark:text-white">
      <div className="content max-w-7xl w-full bg-white dark:bg-gray-800 px-6 py-8 rounded-2xl shadow-lg mx-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="welcome-text">
            <p className="text-xl font-semibold">
              Welcome, {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <motion.div whileHover={{ scale:1.2 }} className="flex items-center cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
            <p className="mr-2 text-blue-500 dark:text-blue-300">Settings</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
        </div>

        {/* Settings Dropdown with Password Change Form */}
        {showSettings && (
          <div className="flex flex-col md:flex-row p-2 gap-5">
           <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full md:w-1/2 mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
      >
        <p className="text-lg font-semibold mb-4">Change Password</p>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="old-password" className="block mb-1 text-sm font-medium">Old Password</label>
            <input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="new-password" className="block mb-1 text-sm font-medium">New Password</label>
            <input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium">Confirm New Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.05 }} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Change Password</motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full md:w-1/2 mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
      >
        <p className="text-lg font-semibold mb-4">Update Profile</p>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label htmlFor="first-name" className="block mb-1 text-sm font-medium">First Name</label>
            <input id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="last-name" className="block mb-1 text-sm font-medium">Last Name</label>
            <input id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-1 text-sm font-medium">Mobile</label>
            <input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="country" className="block mb-1 text-sm font-medium">Country</label>
            <CountryDropdown value={country} onChange={(value) => setCountry(value)} />
            {/* <input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" /> */}
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.05 }} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Update Profile</motion.button>
        </form>
      </motion.div>
          </div>
          
        )}

        {/* Utilities Section */}
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 mb-6">
          {[{ href: "/account/orders", icon: <FaShoppingCart size={32} />, label: "Orders" }, { href: "/account/returns", icon: <FaUndoAlt size={32} />, label: "Returns" }, { href: "/account/favorites", icon: <FaHeart size={32} />, label: "Favorite" }].map((utility, index) => (
            <Link key={index} href={utility.href}>
              <motion.div whileHover={{ scale: 1.05 }} className="  p-4 flex flex-col items-center bg-gray-100 dark:bg-gray-700   rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                {utility.icon}
                <p className="mt-2 text-lg font-semibold">{utility.label}</p>
              </motion.div>
            </Link>
          ))}

<button onClick={handleLogout} className="flex lg:hidden  items-center gap-2 text-sm cursor-pointer">
<span className=" md:inline font-bold text-lg">Logout</span>
                <FaSignOutAlt className="text-red-500" size={27} />
              </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
