"use client";
import { useState } from "react";
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email" | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+968");
  const [selectedPhonePrefix, setSelectedPhonePrefix] = useState("__");

  return (
    <div className="flex justify-center items-center min-h-screen  dark:bg-gray-800">
      <div className="bg-slate-50 dark:bg-gray-900 dark:text-gray-100 p-8 rounded shadow-lg w-full max-w-xl">
        {/* Login Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="flex items-center justify-center mt-2">
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
            <p className="text-sm mx-2">Choose your login method</p>
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
          </div>
        </div>

        {/* Conditional Rendering for Login Method */}
        {!loginMethod && (
          <motion.div className="flex flex-row justify-between text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.button onClick={() => setLoginMethod("phone")} className="flex-1 py-3 bg-green-600 text-white flex flex-col gap-3 items-center justify-center rounded mr-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaMobileAlt className="text-3xl" /> Phone Number
            </motion.button>
            <motion.button onClick={() => setLoginMethod("email")} className="flex-1 py-3 bg-green-600 text-white flex flex-col gap-3 items-center justify-center rounded ml-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaEnvelope className="text-3xl" /> Email
            </motion.button>
          </motion.div>
        )}

        {loginMethod && (
          <>
            <div className="flex mb-6">
              <button onClick={() => setLoginMethod("phone")} className={`flex-1 p-2 text-center ${loginMethod === "phone" ? "border-b-2 border-green-600 bg-green-100 dark:bg-gray-700" : "border-b dark:border-gray-700"}`}>
                Phone Number
              </button>
              <button onClick={() => setLoginMethod("email")} className={`flex-1 p-2 text-center ${loginMethod === "email" ? "border-b-2 border-green-600 bg-green-100 dark:bg-gray-700" : "border-b dark:border-gray-700"}`}>
                Email
              </button>
            </div>
            {loginMethod === "phone" && (
              <form className="space-y-4">
                <div className="flex ">
                  <select value={selectedCountryCode} onChange={(e) => setSelectedCountryCode(e.target.value)} className="p-3 border rounded flex-shrink-0  dark:bg-gray-800 dark:border-gray-700">
                    <option value="+968">+968</option>
                    <option value="+971">+971</option>
                    <option value="+966">+965</option>
                    <option value="+973">+968</option>
                  </select>
                  <select value={selectedPhonePrefix} onChange={(e) => setSelectedPhonePrefix(e.target.value)} className="p-3 border rounded flex-shrink-0  dark:bg-gray-800 dark:border-gray-700">
                    <option>__</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">54</option>
                    <option value="53">55</option>
                    <option value="53">56</option>
                    <option value="53">57</option>
                    <option value="53">58</option>
                    <option value="53">59</option>
                  </select>
                  <input type="text" placeholder="Phone number" className="p-3 border rounded flex-grow dark:bg-gray-800 dark:border-gray-700" />
                </div>
              </form>
            )}
            {loginMethod === "email" && (
              <form className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="email" placeholder="Email" className="w-full p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
                </div>
              </form>
            )}
            <p className="text-center mt-6 text-gray-500 dark:text-gray-400">By accepting our term and policies</p>

            <motion.button className="w-full bg-green-600 text-white py-3 mt-6 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Register
            </motion.button>
          </>
        )}

        {/* Register Prompt */}
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Have Already an account?
          <Link href="/login" className="text-green-600">
            Login now.
          </Link>
        </p>
      </div>
    </div>
  );
}
