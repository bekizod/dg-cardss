"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen  backdrop-blur-md">
     

      {/* Image for medium and larger screens */}
      <div className="">
        <Image
          src="/LoaderLarge.gif"
          width={1000}
          height={1000}
          unoptimized
          alt="Loader for medium and large devices"
          className="" // Adjust width and height for larger screens
        />
      </div>
    </div>
  );
};

export default Loader;
