"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100/30 dark:bg-green-900/30 backdrop-blur-md">
      <motion.div
        className="relative flex items-center justify-center w-20 h-20"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
        <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default Loader;
