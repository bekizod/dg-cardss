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

const CommonQuestions = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Common Questions
      </motion.h1>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">I forgot my account password, how can I recover it?</h2>
        <p>Communicate with the customer service team through the available means: WhatsApp 920009017 or call 920009017/920009016. Our customer service team will adjust and solve the problem.</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">How can I change the mobile number registered in the Al-Saif Gallery platform?</h2>
        <p>You can change the mobile number and address from &quot;My Account&quot; on the site.</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">Why should I do a phone number verification procedure?</h2>
        <p>We require verification of the phone number. After the customer creates their order, we send text messages for confirmation or cancellation. The delivery employee will also use the phone number to ensure that the product is delivered at the right place and time.</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">How can I browse the &quot;Al-Saif Gallery&quot; website in English?</h2>
        <p>If you are browsing our platform on a computer, you can switch the language by clicking on &quot;Language&quot; at the top of the browser and selecting &quot;English.&quot; If you are using our mobile app, go to &quot;Account&quot; and then select &quot;English.&quot;</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">Can I order wholesale products for retail resale?</h2>
        <p>We do not support wholesale in our online store. We are happy to sell products for personal use only.</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">How can I turn off sponsored messages and notifications?</h2>
        <p>You can contact customer service for assistance in turning off sponsored messages and notifications.</p>
      </motion.div>

      <motion.div className="mb-6" variants={textVariants}>
        <h2 className="text-xl font-semibold mb-2">I want to know the delivery date of my order?</h2>
        <p>The delivery date depends on order scheduling. The delivery person will contact you to set the date.</p>
      </motion.div>
    </motion.div>
  );
};

export default CommonQuestions;
