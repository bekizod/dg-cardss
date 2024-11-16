"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100/30 dark:bg-green-900/30 backdrop-blur-md">
     

      {/* Image for medium and larger screens */}
      <div className="">
        <Image
          src="/LoaderLarge.gif"
          width={1000}
          height={1000}
          alt="Loader for medium and large devices"
          className="" // Adjust width and height for larger screens
        />
      </div>
    </div>
  );
};

export default Loader;
