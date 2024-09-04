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

const PrivacyPolicy = () => {
  return (
    <motion.div className="p-8 mx-auto mt-[124px] max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-3xl font-bold text-center mb-8" variants={textVariants}>
        Privacy Policy
      </motion.h1>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        This Privacy Policy applies to the Alsaif Gallery website, its programs, applications, and is valid for all customers, whether they are users of the website through alsaifgallery.com or users of mobile phone applications. Any reference to &quot;the site&quot; or &quot;electronic site&quot; refers to the Alsaif Gallery website, programs and applications.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Change in Privacy Policy
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        This Privacy Policy may be subject to change from time to time. The current version of this Privacy Policy was published on the internet by Alsaif Gallery. You are required to check our privacy policy regularly. Your continued use of the Alsaif Gallery website, applications, and services constitutes your agreement to this Privacy Policy, which may be amended from time to time.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Declaration
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        I hereby acknowledge that I have read and understood this Privacy Policy. By sending data to Alsaif Gallery or our agents, I voluntarily and explicitly agree to the collection of my data, sharing it, and using it in the procedures and retention as specified in this Privacy Policy.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Our privacy policy refers to the ways in which we collect, store, use, and protect your personal information, so reviewing this privacy policy is essential for you.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        With the term &quot;personal information,&quot; we refer to information that is related to a specific person and can be used to identify that person. We do not consider anonymous information to be a source of personal information as it cannot be used to identify a specific person. On the &quot;Alsaif Gallery&quot; website, we collect personal information from you when you use our website or related websites and services (such as, for example, purchasing, participating in auctions, contacting, or sending an email to the customer support team). By providing us with your personal information, you clearly and explicitly agree to deal with your personal information in accordance with the terms of our website&apos;s privacy policy.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Using the website for your personal information
      </motion.h2>
      <motion.ul className="list-disc list-inside mb-6 text-lg leading-relaxed" variants={textVariants}>
        <li>Collecting your personal information.</li>
        <li>Our use of your personal information.</li>
        <li>Your use of your and other users&apos; personal information</li>
        <li>Accessing, reviewing, and modifying your personal information.</li>
        <li>&quot;Cookies&quot; technology.</li>
        <li>Preventing any spam or identity theft.</li>
        <li>Protecting your personal information.</li>
        <li>How to contact us to inquire about the privacy policy.</li>
      </motion.ul>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Collecting your personal information
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        As part of your registration process on the website, you will be asked to provide us with some personal information, such as your name, shipping address, email address, and/or phone number, as well as other similar information, in addition to some additional information about you, such as your date of birth or other identifying information.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We will also need to collect certain financial information from you, such as your credit card number and/or banking details, which you will be required to enter in the &quot;My Account&quot; section of the website. We use this financial information to generate invoices and process customer orders through the website.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        After registering on the website, you should not post any personal information (including any financial information) anywhere on the site other than in the &quot;My Account&quot; section. Restricting the publication of your personal information to the &quot;My Account&quot; section of the website will protect you from any fraudulent activity or identity theft, and publishing any of your personal information anywhere on the website, other than the &quot;My Account&quot; section, may result in suspension of your use of the website.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We will collect transaction information based on your purchase activities on the website, and this information will be used only in connection with the financial transactions you conduct on the website and for no other purposes.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Please note that we may use your Internet Protocol (IP) address, which is a unique number assigned to a computer server or internet service provider, to analyze user trends and improve website management.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We may also collect information about your computer device, such as browser type and browsing information, such as the pages you visit on the website, as well as the times you visit the website.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We may collect additional information from or about you in ways not specifically described here. For example, we may collect information related to your communication with customer support or store services by responding to a survey.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We may also collect feedback ratings and other comments related to your use of the website, and in this case, we aggregate the personal information for statistical purposes, so that this aggregated information is anonymous.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Our use of your personal information
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We only use your personal information to provide you with services and assist customer support, to measure and improve our services for you, to prevent illegal activities, to enforce the user agreement with you, to define the problems, to collect fees, and to provide you with promotional emails.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We may verify the information you provide us with a third party, for example, we may share some of the personal information you provide us with banks or credit card authorization and processing services or with a third party for fraud checking purposes.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Although we make every effort to maintain your privacy, we may need to disclose your personal information to law enforcement agencies, government agencies, or another third party, where we are required to do so by court order or similar legal process, so that we may be asked to disclose your personal information to enforce the law. Here, disclosing your information is only in cooperation with an open law enforcement investigation, or we sincerely believe that disclosing your personal information is necessary to prevent physical harm or financial loss or to report suspected illegal activity or to investigate any potential violation of the user agreement.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        In the event that Alsaif Gallery or any of its divisions or subsidiaries or any related commercial assets are sold, your personal information may be disclosed to any potential buyer for the purpose of continuing to provide the website or otherwise in connection with any such sale.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We do not sell or rent any of your personal information to third parties in the normal course of doing business, and we will only share your personal information with third parties in accordance with this privacy policy.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        By registering or continuing to use the website, you clearly and explicitly agree that we may use your personal information for contacting you for providing services, and that this use is legally valid as an explicit consent for contacting you. We may send promotional emails, and in this case, we provide you with the option to decline receiving such promotional emails.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Additionally, we may use your comments about the site for marketing purposes, and by submitting these comments, you explicitly agree to this use.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Your use of your and other users&apos; personal information
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Members may need to share personal information with each other to complete transactions on the website, so you must respect the privacy of the other members of our website.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We do not guarantee the privacy of your information when you share it with other members of the site, so you must always seek information about the privacy policies and regulations of other members of the site before you provide them with any personal information.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        This privacy policy does not cover your disclosure of your personal information to other members of the site.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Accessing, reviewing, and modifying your personal information
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        You can access and review your personal information in the &quot;My Account&quot; section of the website. If your personal information changes in any way or if you have provided incorrect information on the site, you must update or correct it immediately, either by displaying it on the &quot;My Account&quot; section or by contacting customer support.
      </motion.p>

      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Please note that we will retain your personal information during and after the completion of your use of the site as required to comply with the law, for technical troubleshooting, to prevent fraud, to assist in any legal investigation, and to take any other actions otherwise permitted by law.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        &quot;Cookies&quot; technology
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        Like many websites, the site uses cookies, which are a small file that is placed on your computer hard drive. This &quot;cookie&quot; contains information that allows us to identify your computer when you browse the site, so that we can better serve you. You are always free to decline our cookies if your browser permits, although declining cookies may interfere with your use of the site.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Preventing any spam or identity theft
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        The website does not allow the use of spam or requests for information to others or to send obscene emails. If you need to report any such spam or counterfeit emails, please contact customer support.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        Protecting your personal information
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        We will keep your information according to the strictest standards of security and confidentiality. If you have any objections to your personal information being transferred or used in the manner specified in this policy, please do not use the website.
      </motion.p>

      <motion.h2 className="text-2xl font-semibold mt-12 mb-4" variants={textVariants}>
        How to contact us to inquire about the privacy policy
      </motion.h2>
      <motion.p className="mb-6 text-lg leading-relaxed" variants={textVariants}>
        If you have any questions about our privacy policy, you can contact us by sending an email to customer support.
      </motion.p>
    </motion.div>
  );
};

export default PrivacyPolicy;
