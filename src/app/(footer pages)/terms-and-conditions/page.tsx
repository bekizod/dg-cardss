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

const TermsAndRules = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Terms and Rules of Use
      </motion.h1>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Introduction</strong>
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Welcome to Al-Saif Gallery. These terms and conditions apply to the Al-Saif Gallery website.
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Your use of the Al-Saif Gallery website confirms your understanding of the applicable terms and conditions. If you do not agree to these terms, you must stop using the website. We reserve the right to change, modify, add, or remove portions of these Terms and Conditions at any time. Changes will become effective as soon as they are posted. Please review these terms regularly to stay updated. Continued use of the site indicates acceptance of the changes.
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <span className="text-red-600">The terms and conditions used on the site are subject to the laws of Saudi Arabia, UAE, and Kuwait, depending on the customer&apos;s location.</span>
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Use of the Site
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        To use the site, you must have reached the legal age or be supervised by a parent or legal guardian. We grant you a non-transferable, cancellable license to use the website for personal shopping only. Commercial use or use on behalf of a third party is prohibited unless pre-approved. Any violation of these terms will result in immediate cancellation of your license without notice.
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Some services may require registration or subscription. If you register, you agree to provide accurate information and update it as needed. You are responsible for keeping your account details secure and for all activities under your account. Notify us of any unauthorized use. The site is not responsible for any loss due to non-compliance.
      </motion.p>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The registration process includes consent to receive promotional emails. You can opt out later via a link in the promotional emails.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Information Entered by Users
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Anything you enter on the site becomes our exclusive property. You grant us the right to use any comments or reviews you post. Do not use false information or deceive us. We have the right to remove or modify any information entered.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        User Obligations
      </motion.h2>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed pl-5" variants={textVariants}>
        <li>Keep your account and password confidential and take responsibility for all activities under your account.</li>
        <li>Report any unauthorized use of your account or password.</li>
        <li>Provide accurate, complete, and up-to-date information about yourself and your use of services.</li>
        <li>Do not disclose your user information, except as specified or necessary.</li>
        <li>Cooperate with us and respond to requests for additional information about your eligibility and use of services.</li>
      </motion.ul>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Property Rights
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        All content on our website, including texts, graphics, logos, images, audio clips, digital downloads, and software, are owned by us or our licensors. We retain all proprietary rights. You agree not to use any of our trademarks without written consent. We reserve all rights not expressly granted to you.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        General Provisions
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        <strong>Applicable Law:</strong> These terms are governed by the laws of the customer&apos;s location:
      </motion.p>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed pl-5" variants={textVariants}>
        <li>Kingdom of Saudi Arabia</li>
        <li>United Arab Emirates</li>
        <li>State of Kuwait</li>
      </motion.ul>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We exclude any guarantees or obligations regarding the content, its commercial viability, suitability, compliance with rights, and security against defects.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Order Acceptance
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Orders may not be approved for various reasons. The site reserves the right to refuse or cancel any request and may require additional verification or information before approval.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Prices and Payment Methods
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Prices do not include import taxes or duties. Any fees for receipt will be added to the product price. Payment methods include:
      </motion.p>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed pl-5" variants={textVariants}>
        <li>Cash on delivery (KSA only)</li>
        <li>Coupons and gift vouchers from Al-Saif Gallery</li>
        <li>Payment by installments (Tamara and Tabby)</li>
        <li>Mada credit card</li>
        <li>Apple Pay</li>
        <li>American Express</li>
      </motion.ul>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Credit/debit card payments are subject to verification. If authorization is refused, your order will be canceled and you will be contacted for an alternative payment method. Card information must match cardholder identification. Your information will not be stored or shared except with our payment service provider. SSL technology encrypts card information for security.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Saudi Arabia
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Al-Saif Company for Development and Investment
        <br />
        Establishment Number: 7008415130
        <br />
        Ministry of Commerce: 1010664452
        <br />
        Tax Number: 1010111193
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        The United Arab Emirates
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        ALSAIF GALLERY TRADING - SOLE PROPRIETORSHIP L.L.C.
        <br />
        License Number: CN-4605329
        <br />
        Tax Number: 104016709800003
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Kuwait
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Al-Saif Gallery Kuwait Company for Wholesale
        <br />
        Commercial Registry: 468654
      </motion.p>
    </motion.div>
  );
};

export default TermsAndRules;
