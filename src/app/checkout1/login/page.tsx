// app/checkout/login/page.tsx
"use client";

import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Login</h1>
      {/* Add your login form here */}
    </motion.div>
  );
}
