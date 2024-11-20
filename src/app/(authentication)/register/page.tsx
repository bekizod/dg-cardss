"use client";
import { useState } from "react";
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { notification } from "antd";
import { SmileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"; // Import country library

// TypeScript types
interface RegisterForm {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  mobile: string;
  country: string; // Added country field
  userType: string; // Added userType field
}

export default function Register() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("Oman");
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    mobile: "",
    country: selectedCountry,
    userType: "web", // Initialize userType
  });
  const [registering, setRegistering] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show Ant Design notification for successful or failed registration
  const openNotification = (success: boolean, message: string) => {
    notification.open({
      message: success ? "Registration Successful" : "Registration Failed",
      description: success
        ? "You have successfully registered. Welcome to the platform!"
        : `There was an error with your registration: ${message}`,
      icon: success ? (
        <SmileOutlined style={{ color: "#108ee9" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
      ),
      duration: 3,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);

    // Validate that all fields are filled
    if (
      !formData.userType ||
      !formData.country ||
      !formData.userName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.mobile
    ) {
      openNotification(false, "Please fill all fields");
      setRegistering(false);
      return;
    }

    try {
      const response = await fetch(
        "https://alsaifgallery.onrender.com/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // Log the response data to the console
      console.log("Response data:", data);

      if (data.status) {
        openNotification(true, " ");
        router.push("/login");
      } else {
        openNotification(false, data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      openNotification(false, "Error occurred during registration");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-28 2xl:mt-[124px] bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 shadow-xl w-full max-w-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="flex items-center justify-center mt-2">
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
            <p className="text-sm mx-2">Don&apos;t know Us, Join Today</p>
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              placeholder="User Name"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="First Name"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Last Name"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <CountryDropdown
              value={selectedCountry}
              onChange={(value) => setSelectedCountry(value)}
            />
            {/* className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700" */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              placeholder="Phone number"
              className="text-xs bg-slate-100 md:text-lg py-3 border rounded dark:bg-gray-800 dark:border-gray-700 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
              className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
            By creating an account you accept our{" "}
            <Link
              href="/privacy-policy"
              className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
            >
              Privacy & Policy
            </Link>
          </p>

          <motion.button
            type="submit"
            className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {registering ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
          >
            Login now.
          </Link>
        </p>
      </div>
    </div>
  );
}
