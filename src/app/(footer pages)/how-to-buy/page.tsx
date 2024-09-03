"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const ShoppingGuide = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Shopping Guide
      </motion.h1>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Shopping through the Alsaif Gallery website is very easy. Start by following the steps below:
      </motion.p>

      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed pl-5" variants={textVariants}>
        <li>Search and browse products.</li>
        <li>Add the product to the shopping cart.</li>
        <li>After completing the order collection and review, create your account on the site if not registered.</li>
        <li>Add the authentication code sent to your e-mail and continue the payment process.</li>
        <li>We will follow up with you step-by-step with messages until the order reaches you and take your note.</li>
      </motion.ul>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Browsing and Research:</strong> We have a wide variety of stylish and modern products in several colors to suit all tastes. Use the search box located at the top of the site for specific products. If you want to browse a specific category, use the main menu or the filters on the left side of the page to select price, category, color, brand, and size.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Payment Method:</strong> Choose the products you want to buy and add them to the cart. When completing the order collection, click on &quot;Move to Payment&quot; and complete the necessary information or choose the order as a guest.
      </motion.p>
    </motion.div>
  );
};

export default ShoppingGuide;
