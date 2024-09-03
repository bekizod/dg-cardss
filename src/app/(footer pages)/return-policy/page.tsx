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

const ReplacementAndReturnPolicy = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Replacement and Return Policy
      </motion.h1>

      <motion.p className="text-center mb-6 text-lg leading-relaxed" variants={textVariants}>
        The replacement and return policy at Alsaif Gallery store is subject to the following countries:
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Kingdom of Saudi Arabia</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>United Arab Emirates</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Kuwait</strong>
      </motion.p>

      <motion.h2 className="text-xl font-semibold mb-4" variants={textVariants}>
        Exchange and Return Policy
      </motion.h2>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>How can I return an order?</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        You can easily return your products within a period of three days and exchange them within seven days. If the product is discounted, you can only exchange it within seven working days from the date of purchase at the nearest branch. Discounted products cannot be returned.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Method of return or exchange:</strong>
      </motion.p>

      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed" variants={textVariants}>
        <li>Pack the products you want to return in the original shipping package and bring them with the invoice to any of Alsaif Gallery stores in Saudi Arabia, UAE, or Kuwait, ensuring the product is not discounted.</li>
        <li>A certified employee will take your package.</li>
      </motion.ul>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        After verifying your returns, we will begin the process of refunding the amount either through the store that delivered the product directly if payment was made by credit card or cash on delivery.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        If the product was purchased through installment payments, it will be returned through Tamara or Tabby installment companies.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Request for return through the online store:</strong>
      </motion.p>

      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed" variants={textVariants}>
        <li>Send a request for return on WhatsApp at (966920009017).</li>
        <li>Attach a picture or video of the product in its original condition and unused, or show the defect in the product if you want to exchange or return it.</li>
        <li>The customer service team will send a return or exchange waybill according to your request.</li>
        <li>Deliver the product to the shipping company packed in a shipping package and accompanied by a shipping waybill.</li>
        <li>After the product arrives at our warehouses, we will check it and then exchange or return it according to your request.</li>
      </motion.ul>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        No used product can be returned. If the shipping company delivers a used product, it will be returned, and the shipping cost will be deducted from the customer to preserve the company&apos;s rights.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        If you cannot find what you are looking for, please contact us.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Email:</strong>{" "}
        <a href="mailto:cs@alsaifgallery.com" className="text-blue-600">
          cs@alsaifgallery.com
        </a>{" "}
        | <strong>Phone:</strong>{" "}
        <a href="https://api.whatsapp.com/send/?phone=920009017&amp;text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85+%D8%B9%D9%84%D9%8A%D9%83%D9%85&amp;type=phone_number&amp;app_absent=0" className="text-blue-600">
          966920009017
        </a>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Saudi Arabia:</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Al-Saif Company for Development and Investment
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Establishment Number: 7008415130
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Ministry of Commerce: 1010664452
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Tax Number: 1010111193
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>The United Arab Emirates:</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        ALSAIF GALLERY TRADING - SOLE PROPRIETORSHIP L.L.C.
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        License Number: CN-4605329
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Tax Number: 104016709800003
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Kuwait:</strong>
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Al-Saif Gallery Kuwait Company for Wholesale
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Commercial Registry: 468654
      </motion.p>
    </motion.div>
  );
};

export default ReplacementAndReturnPolicy;
