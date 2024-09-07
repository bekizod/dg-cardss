// app/components/AccountPage.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const AccountPage = () => {
  // Example state for demonstrating interactivity (optional)
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="page-container h-screen p-5 flex justify-center w-full dark:bg-gray-900 mt-[124px] dark:text-white">
      <div className="content max-w-7xl w-full bg-white dark:bg-gray-800 px-6 py-8 rounded-2xl shadow-lg mx-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="welcome-text">
            <p className="text-xl font-semibold">Welcome, bbb nnn</p>
            <p className="text-gray-500 dark:text-gray-400">bekizodcancer@gmail.com</p>
          </div>
          <motion.div whileHover={{ rotate: 90 }} className="flex items-center cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
            <p className="mr-2 text-blue-500 dark:text-blue-300">Settings</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
        </div>

        {/* Settings Dropdown (Example of Interactivity) */}
        {showSettings && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-200">Settings content goes here.</p>
          </motion.div>
        )}

        {/* Utilities Section */}
        <div className="utilities flex justify-evenly mb-6">
          {[
            { href: "/SA_en/account/orders", imgSrc: "/orders.png", label: "Orders" },
            { href: "/SA_en/account/returns", imgSrc: "/return.png", label: "Returns" },
            { href: "/SA_en/account/favourite", imgSrc: "/favourite.png", label: "Favourite" },
          ].map((utility, index) => (
            <Link key={index} href={utility.href}>
              <motion.div className="utility p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center cursor-pointer" whileHover={{ scale: 1.1 }}>
                <Image src={utility.imgSrc} alt={`${utility.label} icon`} width={24} height={24} />
                <p className="mt-2">{utility.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Saved Addresses Section */}
        <Link href="/SA_en/account/address" className="block mb-4">
          <motion.div whileHover={{ x: 15 }} className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer ">
            <div className="flex justify-evenly items-center space-x-2 w-full ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300 bg-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="text-center  ">Saved Addresses</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
        </Link>

        <div className="lg:hidden">
          {/* Static Pages Section */}
          <div className="static-pages space-y-4">
            {[
              { href: "/SA_ar/account", label: "تغيير الى العربية" },
              {
                label: "Country",
                customContent: (
                  <div className="flex items-center">
                    <span>المملكة العربية السعودية</span>
                    <Image src="https://pwa-cdn.alsaifgallery.com/media/alsaifgallery/app/Flag-Saudi-Arabia.jpg" alt="Saudi Arabia flag" width={32} height={24} />
                  </div>
                ),
              },
              { href: "/SA_en/contact-us", label: "Contact Us" },
              { href: "/SA_en/our-story", label: "Our Story" },
              { href: "/SA_en/loyalty-points-policy", label: "Loyalty Points Policy" },
              { href: "/SA_en/privacy-policy", label: "Privacy Policy" },
              { href: "/SA_en/faq", label: "FAQ" },
            ].map((item, index) => (
              <Link key={index} href={item.href || "#"}>
                <motion.div whileHover={{ x: 15 }} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <p>{item.label}</p>
                  {item.customContent || (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 text-blue-500 dark:text-blue-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="social-media mt-6 flex justify-center space-x-4">
            <a href="https://www.facebook.com/alsaifgallery" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={32} className="text-blue-600 hover:text-blue-700 transition-colors" />
            </a>
            <a href="https://twitter.com/alsaifgallery" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={32} className="text-blue-400 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://www.instagram.com/alsaifgallery38" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={32} className="text-pink-600 hover:text-pink-700 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
