"use client";
import { motion } from "framer-motion";
import Link from "next/link"

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          className="text-8xl font-bold text-gray-900 dark:text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-[var(--color-secondary)]  rounded-full hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
