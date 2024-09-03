"use client";

import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const TermsAndConditions = () => {
  return (
    <motion.div className="text-base leading-relaxed w-full space-y-4 mt-[124px] p-6" initial="hidden" animate="visible">
      <motion.p variants={textVariants}>I, the beneficiary and user of the loyalty points program from Al-Saif Gallery, agree to the full terms, conditions and policies stipulated in this service, in details of which are the following:</motion.p>

      <motion.h2 className="text-lg font-semibold mt-6" custom={0.1} variants={headingVariants}>
        Definitions:
      </motion.h2>

      <motion.p variants={textVariants}>
        <strong>Points:</strong> It is the total amount the customer receives in exchange for purchases from Al-Saif Gallery.
      </motion.p>

      <motion.p variants={textVariants}>These points are intended to deduct a specific value that can be used for a specified period.</motion.p>

      <motion.p variants={textVariants}>Every fifty points equals one Saudi riyal.</motion.p>

      <motion.h2 className="text-lg font-semibold mt-6" custom={0.2} variants={headingVariants}>
        General Provisions:
      </motion.h2>

      <motion.p variants={textVariants}>These terms and conditions apply to your membership in the Program. Your use of the Program confirms your understanding and voluntary acceptance of these Terms and Conditions and any change or modification to these Terms and Conditions from time to time. Your continued use and benefit of the Software after the changes have been posted means that you agree to them.</motion.p>

      <motion.h2 className="text-lg font-semibold mt-6" custom={0.3} variants={headingVariants}>
        Special Provisions:
      </motion.h2>

      <motion.p variants={textVariants}>Al-Saif Gallery understands that there may be more than one account registered to some users of the site and therefore will result in multiple memberships. It is recommended that the member use one account in order to be able to increase the benefits he receives from the program. Al-Saif Gallery is not obligated, and it is not permissible, to combine memberships belonging to the same user who has more than one account on the platform, and it is not possible to transfer the benefits between people or user accounts.</motion.p>

      <motion.p variants={textVariants}>Some rewards cannot be used in conjunction with other discount codes or discount coupons offered by Al Saif Gallery and may not apply to some of the products mentioned at the time. Upon expiry of the period of points registered in (My Account) page, they cannot be returned in any way.</motion.p>

      <motion.h2 className="text-lg font-semibold mt-6" custom={0.4} variants={headingVariants}>
        Miscellaneous Terms:
      </motion.h2>

      <motion.p variants={textVariants}>Al-Saif Gallery reserves the right to suspend or cancel your points if it determines in its sole discretion that you have violated these terms and conditions, or if your account is unauthorized, deceptive, fraudulent or illegal in any way. If this is done, all points and privileges will be immediately cancelled.</motion.p>

      <motion.p variants={textVariants}>Al-Saif Gallery reserves the right to change, modify or suspend the programme. Al-Saif Gallery reserves the right to terminate the Program immediately by giving notice to all members.</motion.p>
    </motion.div>
  );
};

export default TermsAndConditions;
