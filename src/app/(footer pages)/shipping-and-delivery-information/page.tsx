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

const ShippingAndDelivery = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-2xl font-semibold mb-8" variants={textVariants}>
        Shipping and Delivery Information
      </motion.h2>

      <motion.div className="text-lg leading-relaxed mb-6" variants={textVariants}>
        <h3 className="text-xl font-semibold mb-4">Saudi Arabia</h3>
        <p>Shipping and Delivery Information: Here at the Alsaif Gallery, we provide delivery service to all areas of Saudi Arabia through reliable shipping providers. After completing the purchase process, we will provide you with the necessary information about the provider, the cost of the process, and the shipping time.</p>

        <h4 className="text-lg font-semibold mt-6 mb-2">From the Shipping Conditions:</h4>
        <ul className="list-disc list-inside mb-6">
          <li>The registered address, phone number, and email address must be correct.</li>
          <li>In case of loss or damage to the product, the customer will be compensated for the value of the product.</li>
          <li>For shipping through Aramex to Gulf countries excluding (UAE and Kuwait), the shipping cost does not include customs fees, and the customer must bear those fees.</li>
          <li>If the customer does not receive the order, whether it is delivered through a shipping company or a representative, the order will be considered canceled, and the customer will bear the delivery or shipping fees.</li>
          <li>All orders with cash on delivery payment method shipped outside of Riyadh city will not be processed or shipped until the customer confirms the order through WhatsApp.</li>
          <li>If the customer’s order is incomplete, whether it is made by credit card, bank transfer, or cash on delivery, the value of the missing item will be refunded to the customer’s bank account.</li>
          <li>It should be noted that we must be provided with the customer’s bank information in case of cash on delivery payment method to be able to refund the amount.</li>
          <li>Our responsibility at Alsaif Gallery is waived for any delay in the refund caused by the customer’s refusal to provide us with their bank details.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-12 mb-4">United Arab Emirates</h3>
        <p>Shipping and Delivery Information: Here at the Alsaif Gallery, we provide delivery service to all areas of United Arab Emirates through reliable shipping providers. After completing the purchase process, we will provide you with the necessary information about the provider, the cost of the process, and the shipping time.</p>

        <h3 className="text-xl font-semibold mt-12 mb-4">Kuwait</h3>
        <p>Shipping and Delivery Information: Here at the Alsaif Gallery, we provide delivery service to all areas of Kuwait through reliable shipping providers. After completing the purchase process, we will provide you with the necessary information about the provider, the cost of the process, and the shipping time.</p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Tracking the Order and Delivery:</h4>
        <ul className="list-disc list-inside mb-6">
          <li>When will I receive my order? You will receive a message to confirm shipping, and another message when shipped. You can track the order through the &quot;my account &quot; page on the site. You can also communicate via WhatsApp at 920009017 or contact customer service at 920009017 or 920009016.</li>
          <li>Can I change my delivery address after I have placed my order? Yes, you can change the address if the order has not left the warehouse by communicating with customer service through available means of communication or WhatsApp or social media platforms and email. However, if the order has left the warehouse with the shipping company, the address cannot be changed.</li>
          <li>Do you deliver to multiple addresses? Delivery is based on the address registered in the order. If you were not available every time the delivery partner tried to contact you, you can request them to contact you again or schedule another time on the same day or even three days. If you were not at home, someone else can receive your order with proof of identity.</li>
          <li>Do they require me to show my identity when receiving the order? Yes, please keep a valid identity card on hand to show it to our delivery partner when they deliver your order. Acceptable forms of identification include a national ID card or residency number. You should also provide your name and signature.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-12 mb-2">Company Information</h3>
        <div className="mb-6">
          <h4 className="text-lg font-semibold">Saudi Arabia</h4>
          <p>Al-Saif Company for Development and Investment</p>
          <p>Establishment Number: 7008415130</p>
          <p>Ministry of Commerce: 1010664452</p>
          <p>Tax Number: 1010111193</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold">United Arab Emirates</h4>
          <p>ALSAIF GALLERY TRADING - SOLE PROPRIETORSHIP L.L.C.</p>
          <p>License Number: CN-4605329</p>
          <p>Tax Number: 104016709800003</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold">Kuwait</h4>
          <p>Al-Saif Gallery Kuwait Company for Wholesale</p>
          <p>Commercial Registry: 468654</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShippingAndDelivery;
