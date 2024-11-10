// "use client";
// import { useState, useRef, useEffect } from "react";
// import { FaMobileAlt, FaEnvelope, FaTimes } from "react-icons/fa";
// import { TiBackspaceOutline } from "react-icons/ti";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Register() {
//   const [loginMethod, setLoginMethod] = useState<"phone" | "email" | null>(null);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("+968");
//   const [selectedPhonePrefix, setSelectedPhonePrefix] = useState("__");
//   const [showOTP, setShowOTP] = useState(false);
//   const [optError, setOtpError] = useState(false);

//   const [borderColors, setBorderColors] = useState<string[]>(Array(4).fill("border-slate-500"));
//   const otpRefs = useRef<HTMLInputElement[]>([]);

//   // Focus the first OTP input field when the component mounts
//   useEffect(() => {
//     if (showOTP && otpRefs.current[0]) {
//       otpRefs.current[0].focus();
//     }
//   }, [showOTP]);

//   const handleClearOTP = () => {
//     otpRefs.current.forEach((input) => (input.value = ""));
//     otpRefs.current[0].focus();
//   };

//   const handleOTPChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;

//     // Ensure the value is a digit between 0 and 9
//     if (/^[0-9]$/.test(value)) {
//       otpRefs.current[index].value = value;
//       setBorderColors((prev) => prev.map((color, i) => (i === index ? "border-green-500" : color)));

//       // Move focus to the next input field if the current input is valid
//       if (index < otpRefs.current.length - 1) {
//         otpRefs.current[index + 1].focus();
//       } else {
//         // Check if all fields are filled
//         const allFilled = otpRefs.current.every((input) => input.value !== "");
//         if (allFilled) {
//           // All fields are filled; alert the inserted numbers
//           const otp = otpRefs.current.map((input) => input.value).join("");
//           alert(`Entered OTP: ${otp}`);
//         }
//       }
//     } else {
//       // If the input is invalid, clear the field and set border color to red
//       otpRefs.current[index].value = "";
//       setBorderColors((prev) => prev.map((color, i) => (i === index || optError ? "border-red-500" : color)));
//     }
//     // If an input is incorrect
//     setBorderColors((prev) => prev.map((color, i) => (optError ? "border-red-500" : color)));
//   };

//   const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Backspace") {
//       if (otpRefs.current[index].value === "") {
//         if (index > 0) {
//           otpRefs.current[index - 1].focus();
//         }
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Logic for handling form submission goes here
//     // For now, we'll just show OTP
//     setShowOTP(true);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen mt-32 dark:bg-gray-800">
//       <div className="bg-slate-50 dark:bg-gray-900 dark:text-gray-100 p-8 rounded shadow-lg w-full max-w-xl">
//         {/* Login Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold">Register</h2>
//           <div className="flex items-center justify-center mt-2">
//             <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
//             <p className="text-sm mx-2">Choose your Register method</p>
//             <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
//           </div>
//         </div>

//         {/* Conditional Rendering for Login Method */}
//         {!loginMethod && (
//           <motion.div className="flex flex-row justify-between text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//             <motion.button onClick={() => setLoginMethod("phone")} className="flex-1 py-3  bg-[var(--color-primary)] text-white flex flex-col gap-3 items-center justify-center rounded mr-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <FaMobileAlt className="text-3xl" /> Phone Number
//             </motion.button>
//             <motion.button onClick={() => setLoginMethod("email")} className="flex-1 py-3  bg-[var(--color-primary)] text-white flex flex-col gap-3 items-center justify-center rounded ml-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <FaEnvelope className="text-3xl" /> Email
//             </motion.button>
//           </motion.div>
//         )}

//         {loginMethod && !showOTP && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex mb-6">
//               <button type="button" onClick={() => setLoginMethod("phone")} className={`flex-1 p-2 text-center ${loginMethod === "phone" ? "border-b-2 border-green-600 bg-green-100 dark:bg-gray-700" : "border-b dark:border-gray-700"}`}>
//                 Phone Number
//               </button>
//               <button type="button" onClick={() => setLoginMethod("email")} className={`flex-1 p-2 text-center ${loginMethod === "email" ? "border-b-2 border-green-600 bg-green-100 dark:bg-gray-700" : "border-b dark:border-gray-700"}`}>
//                 Email
//               </button>
//             </div>

//             {loginMethod === "phone" && (
//               <div className="space-y-4">
//                 <div className="flex">
//                   <select value={selectedCountryCode} onChange={(e) => setSelectedCountryCode(e.target.value)} className="p-3 border rounded flex-shrink-0 dark:bg-gray-800 dark:border-gray-700">
//                     <option value="+968">+968</option>
//                     <option value="+971">+971</option>
//                     <option value="+966">+965</option>
//                     <option value="+973">+968</option>
//                   </select>
//                   <select value={selectedPhonePrefix} onChange={(e) => setSelectedPhonePrefix(e.target.value)} className="p-3 border rounded flex-shrink-0 dark:bg-gray-800 dark:border-gray-700">
//                     <option>__</option>
//                     <option value="50">50</option>
//                     <option value="51">51</option>
//                     <option value="52">52</option>
//                     <option value="53">54</option>
//                     <option value="53">55</option>
//                     <option value="53">56</option>
//                     <option value="53">57</option>
//                     <option value="53">58</option>
//                     <option value="53">59</option>
//                   </select>
//                   <input type="number" required placeholder="Phone number" className="p-3 border rounded flex-grow dark:bg-gray-800 dark:border-gray-700" />
//                 </div>
//               </div>
//             )}

//             {loginMethod === "email" && (
//               <div className="space-y-4">
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input type="email" required placeholder="Email" className="w-full p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700" />
//                 </div>
//               </div>
//             )}
//             <p className="text-center mt-6 text-gray-500 dark:text-gray-400">By accepting our terms and policies</p>
//             <motion.button type="submit" className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               Log In
//             </motion.button>
//           </form>
//         )}

//         {showOTP && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center mb-6">
//               <button className="text-gray-500 dark:text-gray-400" onClick={() => setShowOTP(false)}>
//                 <FaTimes className="text-2xl" />
//               </button>
//               <button className="text-green-600 dark:text-green-400" onClick={handleClearOTP}>
//                 <TiBackspaceOutline className="text-4xl" />
//               </button>
//             </div>

//             <form className="space-y-4">
//               <div className="flex justify-around gap-2">
//                 {[...Array(4)].map((_, index) => (
//                   <motion.input
//                     key={index}
//                     type="text" // Use type="text" to handle input restrictions fully
//                     maxLength={1}
//                     className={`w-12 h-12 text-center text-lg border rounded dark:bg-gray-800  ${borderColors[index]} dark:${borderColors[index]}`}
//                     ref={(el) => {
//                       if (el) otpRefs.current[index] = el;
//                     }}
//                     onChange={(e) => handleOTPChange(index, e)}
//                     onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 ))}
//               </div>
//             </form>

//             <div className="flex justify-end mt-6">
//               <Link href="#" className="text-green-600 dark:text-green-400">
//                 Resend OTP
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* Register Prompt */}
//         {!showOTP && (
// <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
//   Have Already an account?
//   <Link href="/login" className="text-green-600">
//     Login now.
//   </Link>
// </p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { FaMobileAlt, FaEnvelope, FaTimes } from "react-icons/fa";
import { TiBackspaceOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+968");
  const [selectedPhonePrefix, setSelectedPhonePrefix] = useState("__");
  const [showOTP, setShowOTP] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [borderColors, setBorderColors] = useState<string[]>(
    Array(4).fill("border-slate-500")
  );
  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Focus the first OTP input field when the component mounts
  useEffect(() => {
    if (showOTP && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [showOTP]);

  const handleClearOTP = () => {
    otpRefs.current.forEach((input) => (input.value = ""));
    otpRefs.current[0].focus();
  };

  const handleOTPChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (/^[0-9]$/.test(value)) {
      otpRefs.current[index].value = value;
      setBorderColors((prev) =>
        prev.map((color, i) => (i === index ? "border-green-500" : color))
      );
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      } else {
        const allFilled = otpRefs.current.every((input) => input.value !== "");
        if (allFilled) {
          const otp = otpRefs.current.map((input) => input.value).join("");
          alert(`Entered OTP: ${otp}`);
        }
      }
    } else {
      otpRefs.current[index].value = "";
      setBorderColors((prev) =>
        prev.map((color, i) =>
          i === index || otpError ? "border-red-500" : color
        )
      );
    }
    setBorderColors((prev) =>
      prev.map((color, i) => (otpError ? "border-red-500" : color))
    );
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otpRefs.current[index].value === "") {
      if (index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOTP(true);
  };

  return (
    <div className="flex justify-center items-center py-3  bg-gray-200 dark:bg-gray-800">
      <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-100 p-8 -px-3 shadow-xl w-full max-w-xl">
        {!showOTP && (
          <>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="border rounded dark:bg-gray-800 dark:border-gray-700 bg-slate-100 text-xs md:text-lg py-3 w-14 md:w-28 lg:w-40"
                  >
                    <option value="+968">+968</option>
                    <option value="+971">+971</option>
                    <option value="+966">+966</option>
                    <option value="+973">+973</option>
                  </select>

                  <select
                    value={selectedPhonePrefix}
                    onChange={(e) => setSelectedPhonePrefix(e.target.value)}
                    className="border rounded dark:bg-gray-800 dark:border-gray-700 bg-slate-100 text-xs py-3 w-10 md:text-lg md:w-28 lg:w-32"
                  >
                    <option>__</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                  </select>

                  <input
                    type="number"
                    required
                    placeholder="Phone number"
                    className="text-xs bg-slate-100 md:text-lg py-3 border rounded dark:bg-gray-800 dark:border-gray-700 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full bg-slate-100 p-3 pl-10 border rounded dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>

              <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
                By accepting our terms and policies
              </p>
              <motion.button
                type="submit"
                className="w-full  bg-[var(--color-primary)] text-white py-3 mt-6 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </form>
          </>
        )}

        {showOTP && (
          <div className="space-y-4 mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">OTP Code Enter</h2>
              <div className="flex items-center justify-center mt-2">
                <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
                <p className="text-sm mx-2">Fill The Four Digit Code</p>
                <hr className="border-t border-gray-300 dark:border-gray-700 w-1/4" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                className="text-gray-500 dark:text-gray-400"
                onClick={() => setShowOTP(false)}
              >
                <FaTimes className="text-2xl" />
              </button>
              zz
              <button
                className="text-green-600 dark:text-green-400"
                onClick={handleClearOTP}
              >
                <TiBackspaceOutline className="text-4xl" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="flex justify-around gap-2">
                {[...Array(4)].map((_, index) => (
                  <motion.input
                    key={index}
                    type="text"
                    maxLength={1}
                    className={`w-12 h-12 text-center text-lg border rounded dark:bg-gray-800  ${borderColors[index]} dark:${borderColors[index]}`}
                    ref={(el) => {
                      if (el) otpRefs.current[index] = el;
                    }}
                    onChange={(e) => handleOTPChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </form>

            <div className="flex justify-end mt-6">
              <Link href="#" className="text-green-600 dark:text-green-400">
                Resend OTP
              </Link>
            </div>
          </div>
        )}

        {!showOTP && (
          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
            Have Already an account?{" "}
            <Link href="/checkout1/login" className="text-green-600">
              Login now.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
