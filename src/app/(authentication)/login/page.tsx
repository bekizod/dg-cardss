"use client";
import { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaPassport } from "react-icons/fa";
import { motion } from "framer-motion";
import { notification } from "antd";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateBuyerIdAfterLogin } from "@/redux/slices/cartSlice";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios
import PhoneFooter from "@/components/PhoneFooter";
import Spinner from "@/components/Spinner";

// Define a type for notification types
type NotificationType = "success" | "error" | "info" | "warning";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loging, setLoging] = useState(false);
  const router = useRouter();
  const { user, login } = useAuth(); // Use the login function from AuthContext
  const token = Cookies.get("token");
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (user && token) {
      router.push("/account");
    }
  }, [user, token, router]);

  // Notification function with a 3-second duration
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3, // Notification will disappear after 3 seconds
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoging(true);
    try {
      const response = await axios.post(
        "https://alsaifgallery.onrender.com/api/v1/user/signIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data.data;
        setLogged(true);
        // Store the token and user information in the context and cookies
        login(token, user);
        window.location.reload();
        // router.push("/account");
        // Display success notification
        openNotification(
          "success",
          "Login Successful",
          `Name: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nMobile: ${user.mobile}`
        );
      } else {
        // In case of an error response
        openNotification(
          "error",
          "Login Failed",
          "Email or password is incorrect. Please try again."
        );
      }
    } catch (error: any) {
      // console.error("An error occurred:", error);

      // Display error notification for exceptions
      openNotification(
        "error",
        "Login Error",
        "Email or password is incorrect. Please try again."
      );
    } finally {
      setLoging(false);
    }
  };
  const handleLanguageChange = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    window.location.reload(); // Refresh the page after setting the locale
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center   bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg  dark:bg-gray-900 dark:text-gray-100 p-8 mx-3 my-24 shadow-xl w-full max-w-xl">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">{translations.login.title}</div>
          <div className="flex items-center justify-center mt-2">
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
            <div className="text-sm mx-2">{translations.login.subtitle}</div>
            <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              placeholder={translations.login.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div className="relative">
            <FaEye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            <input
              type="password"
              required
              placeholder={translations.login.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full flex justify-center bg-[var(--color-primary)] text-white py-3 mt-6 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loging || logged}
          >
            {loging ? <Spinner /> : `${translations.login.loginButton}`}
          </motion.button>
          <Link
            href={"/forgotpassword"}
            className="hover:text-[var(--color-secondary)] py-1"
          >
            {translations.login.forgotPassword}
          </Link>
        </form>
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
          {translations.login.noAccount}{" "}
          <Link
            href="/register"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
          >
            {translations.login.signup}
          </Link>
        </div>
      </div>

      <PhoneFooter />
    </div>
  );
}

// "use client";
// import { useState, useRef, useEffect } from "react";
// import { FaMobileAlt, FaEnvelope, FaTimes } from "react-icons/fa";
// import { TiBackspaceOutline } from "react-icons/ti";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Login() {

//   return (
//     <div className="flex justify-center items-center py-28 md:mt-[124px]  bg-gray-200 dark:bg-gray-800">
//       <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 mx-3 shadow-xl w-full max-w-xl">
//         <div className="text-center mb-6">
//           <div className="text-2xl font-bold">LOG IN</div>
//           <div className="flex items-center justify-center mt-2">
//             <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
//             <div className="text-sm mx-2">Login Make your Shopping Easy</div>
//             <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
//           </div>
//         </div>
//         <form   className="space-y-4">
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input type="email" required placeholder="Email"    className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
//           </div>
//           <div className="relative">
//             <input type="password" required placeholder="Password"     className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
//           </div>
//           <motion.button type="submit" className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//              login
//           </motion.button>
//         </form>
//         <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
//           Did Not have Account?{" "}
//           <Link href="/register" className="text-green-600">
//             Sign Up.
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
