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

const OurStory = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Our Story
      </motion.h1>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Starting from its establishment in 2006, Alsaif Gallery has been dedicated to providing top-notch home and kitchen appliances, kitchenware, serveware, and other household goods to customers as a leading retail chain based in Saudi Arabia.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Since then, we have expanded our reach and opened multiple branches across different regions of Saudi Arabia, showcasing a variety of products from various international and local brands.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Our journey to becoming one of the 100 most popular Saudi brands was marked by a focus on high-quality specifications and modern designs. At the same time, we sought to preserve old heritage by integrating it with modern materials. This can be seen in our iconic logo, the Dalla.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        As we continue to develop and push ourselves towards new horizons, we strive to stay ahead of the curve. In line with this, we launched our online store in 2016 to complement our showrooms. This move enabled us to provide our customers with fast and safe service and delivery inside and outside the Kingdom, utilizing our own vehicles or in alliance with shipping companies.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Today, Alsaif Gallery is known for our wide selection of high-quality products and our unwavering commitment to customer satisfaction. We are proud to have earned a reputation for reliable service, and our ability to meet the diverse needs of our customers.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Vision
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Our company strives to become the industry leader and the preferred choice of customers by providing exceptional home appliances and kitchenware of the highest quality throughout the Arab world.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Mission
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Our mission is to offer the latest products in the field of home appliances and kitchenware, and to develop innovative products and services that elevate the standard of living for our customers.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Company Values
      </motion.h2>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed" variants={textVariants}>
        <li>Quality</li>
        <li>Customer Satisfaction</li>
        <li>Development</li>
        <li>Honesty</li>
      </motion.ul>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Company Strategy
      </motion.h2>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed" variants={textVariants}>
        <li>Expanding our stores inside and outside Saudi Arabia</li>
        <li>Diversifying the product portfolio</li>
        <li>Expanding the online store</li>
      </motion.ul>

      <motion.div className="mt-12" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">Saudi Arabia</h3>
        <p className="mb-1">Al-Saif Company for Development and Investment</p>
        <p className="mb-1">Establishment Number: 7008415130</p>
        <p className="mb-1">Ministry of Commerce: 1010664452</p>
        <p className="mb-1">Tax Number: 1010111193</p>
      </motion.div>

      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">United Arab Emirates</h3>
        <p className="mb-1">ALSAIF GALLERY TRADING - SOLE PROPRIETORSHIP L.L.C.</p>
        <p className="mb-1">License Number: CN-4605329</p>
        <p className="mb-1">Tax Number: 104016709800003</p>
      </motion.div>

      <motion.div className="mt-8" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-2">Kuwait</h3>
        <p className="mb-1">Al-Saif Gallery Kuwait Company for Wholesale</p>
        <p className="mb-1">Commercial Registry: 468654</p>
      </motion.div>
    </motion.div>
  );
};

export default OurStory;
