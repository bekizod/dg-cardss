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

const WarrantyPolicy = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Warranty Policy
      </motion.h2>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The warranty policy at alSaif Galeri store applies to the following countries:
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Saudi Arabia
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        United Arab Emirates
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Kuwait
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Warranty Policy:</strong> Our Warranty Policy guarantees protection for your product against any defects in materials, design, or manufacturing that may occur after purchase. A warranty will be provided for a period of thirty-six (36) months for eligible products purchased within our site.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        In some cases, a delivery agent will be sent to pick up the product from your address to an authorized service center. The inspection period will be (14) working days from the date the product was received from the customer’s address until the date of dispatch with the delivery agent.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Not all products are covered by the warranty. Always check the product list to see if it is covered by the warranty.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        This warranty cannot be extended or renewed for repair or replacement or to renew the warranty period. The warranty terms are in accordance with the manufacturer of your device.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        If the product cannot be repaired, but is still under the manufacturer’s warranty, we will provide you with an alternative product (from the same seller), and if no alternative is available, your money will be fully refunded.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The customer must ensure that the product is packaged in the original carton or packaged securely to prevent any damage during shipping. The company will not be liable in case of breakage or damage to the product in this case, and the returned product will be returned to the customer without maintenance.
      </motion.p>

      <motion.h3 className="text-xl font-semibold mt-12 mb-4" variants={textVariants}>
        Warranty Services:
      </motion.h3>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The time required to obtain device information or customer agreement in the “confirmation time” is not part of the maintenance process.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        By sending your product to the maintenance center, you agree to use your contact details in this way only as required for maintenance services.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The customer confirms that all information provided during the warranty claim is correct.
      </motion.p>

      <motion.div className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The product will not be covered by the warranty in the following conditions:
        <ul className="list-disc list-inside mt-2">
          <li>Damage or damage resulting from the customer’s misuse and non-compliance with the instructions for use.</li>
          <li>Leakage of liquid onto the product.</li>
          <li>The product has unauthorized repairs.</li>
        </ul>
      </motion.div>

      <motion.h3 className="text-xl font-semibold mt-12 mb-4" variants={textVariants}>
        Warranty Service Provider:
      </motion.h3>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The product warranty and quality of manufacture are provided by the authorized service center and are subject to the manufacturer’s policies and those outlined in the product’s warranty guide or the manufacturer’s website. To obtain warranty and maintenance services, the customer can contact the warranty service provider directly to obtain the required service according to the systems and regulations.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The warranty and maintenance services provided by the authorized service center are not the responsibility of the company and include the availability of spare parts, repair time, and quality of service. The customer should contact the authorized service center directly in case of any complaints or claims.
      </motion.p>

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

export default WarrantyPolicy;
