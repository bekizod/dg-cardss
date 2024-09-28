"use client";
import { useState } from "react";
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { notification } from "antd";
import "antd/dist/reset.css";
import { SmileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";

// TypeScript types
interface RegisterForm {
  firstName: string;
  lastName: string;
  userName: string; // Added userName
  email: string;
  password: string;
  mobile: string;
}

export default function Register() {
  const router = useRouter(); // Initialize useRouter
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("+968");
  const [selectedPhonePrefix, setSelectedPhonePrefix] = useState<string>("__");
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    userName: "", // Initialize userName
    email: "",
    password: "",
    mobile: "",
  });
 const [registering , setRegistering] = useState(false)
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show Ant Design notification for successful registration
  const openNotification = (success: boolean, message: string) => {
    notification.open({
      message: success ? "Registration Successful" : "Registration Failed",
      description: success ? "You have successfully registered. Welcome to the platform!" : `There was an error with your registration.  ${message}`,
      icon: success ? <SmileOutlined style={{ color: "#108ee9" }} /> : <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      duration: 3, // Automatically closes after 3 seconds
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true)
    try {
      const response = await fetch("https://alsaifgallery.onrender.com/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Log the response data to the console
      console.log("Response data:", data);

      if (data.status) {
        openNotification(true," ");
        router.push("/login"); // Redirect to login on success
      } else {
        openNotification(false, data.message); // Show error notification
      }
    } catch (error) {
      console.error("Error during registration:", error);
      openNotification(false," "); // Show error notification
    } finally {
      setRegistering(false)
    }
  };

  return (
    <div className="flex justify-center items-center py-28 md:mt-[124px] bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 shadow-xl w-full max-w-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="flex items-center justify-center mt-2">
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
            <p className="text-sm mx-2">Complete the form below</p>
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">User Name</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} required placeholder="User Name" className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First Name" className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last Name" className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <div className="flex">
              <select value={selectedCountryCode} onChange={(e) => setSelectedCountryCode(e.target.value)} className="border rounded dark:bg-gray-800 dark:border-gray-700 bg-slate-100 text-xs md:text-lg py-3 w-14 md:w-28 lg:w-40">
                <option value="+968">+968</option>
                <option value="+971">+971</option>
                <option value="+966">+966</option>
                <option value="+973">+973</option>
              </select>

              <select value={selectedPhonePrefix} onChange={(e) => setSelectedPhonePrefix(e.target.value)} className="border rounded dark:bg-gray-800 dark:border-gray-700 bg-slate-100 text-xs py-3 w-10 md:text-lg md:w-28 lg:w-32">
                <option>__</option>
                <option value="50">50</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
              </select>

              <input type="number" name="mobile" value={formData.mobile} onChange={handleInputChange} required placeholder="Phone number" className="text-xs bg-slate-100 md:text-lg py-3 border rounded dark:bg-gray-800 dark:border-gray-700 w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email" className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Password" className="w-full bg-slate-100 p-3 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>

          <motion.button type="submit" className="w-full bg-green-600 text-white py-3 mt-6 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {
              registering ? "registering..." : "register"
             }
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600">
            Login now.
          </Link>
        </p>
      </div>
    </div>
  );
}
