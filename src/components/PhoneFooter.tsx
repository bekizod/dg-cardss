"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  FaInfoCircle,
  FaWallet,
  FaShieldAlt,
  FaShippingFast,
  FaMoneyBillWave,
  FaShoppingCart,
  FaFileContract,
  FaQuestionCircle,
  FaPhone,
  FaArrowCircleRight,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
} from "react-icons/fa";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";

export default function PhoneFooter() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("saudi");
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setOpen(false);
  };

  const flagSrc = selectedCountry === "saudi" ? "/saudiA.png" : "/uae.png";
  const handleLanguageChange = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    window.location.reload(); // Refresh the page after setting the locale
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className=" w-full   gap-3 bg-[var(--color-tertiary)] text-white shadow-lg hidden max-lg:flex max-lg:flex-col">
      <div className="flex  flex-row p-4  gap-1">
        <div
          className="cursor-pointer "
          onClick={() =>
            handleLanguageChange(currentLocale === "en" ? "ar" : "en")
          }
        >
          {currentLocale === "en" ? translations.arabic : translations.english}
        </div>
        <div>🌐</div>
      </div>

      <div className="">
        <div className="flex flex-row justify-evenly items-center gap-3">
          <div>{translations.account.chooseCountry}</div>
          <div>
            <Image
              src={flagSrc}
              alt="Country flag"
              onClick={() => setOpen(true)}
              className="h-5 w-7 cursor-pointer"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <h3 className="  font-bold border-b-2 px-5 mx-5 flex justify-center">
        {translations.footer.need_help}
      </h3>
      <div className="flex flex-row gap-1 w-full">
        <div className="w-1/2 flex flex-col gap-1 px-3">
          <div className="flex flex-col font-thin justify-start   ">
            <ul className="gap-2 text-sm pt-3  flex flex-col justify-start  ">
              <li className="flex flex-row gap-2 items-center  hover:text-slate-400">
                <FaInfoCircle className=" " />
                <Link href="/our-story">{translations.footer.our_story}</Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaWallet className="" />
                <Link href="/loyalty-points-policy">
                  {translations.footer.loyalty_points_policy}
                </Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaShieldAlt className="" />
                <Link href="/privacy-policy">
                  {translations.footer.privacy_policy}
                </Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaMoneyBillWave className="" />
                <Link href="/payment-method">
                  {translations.footer.payment_method}
                </Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaShippingFast className="" />
                <Link href="/shipping-and-delivery-information">
                  {translations.footer.shipping_and_delivery_information}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col font-thin justify-start    ">
            <ul className="gap-2 text-sm pt-3 flex flex-col justify-start">
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaShoppingCart className="" />
                <Link href="/how-to-buy">{translations.footer.how_to_buy}</Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaFileContract className="" />
                <Link href="/terms-and-conditions">
                  {translations.footer.terms_and_conditions}
                </Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaQuestionCircle className="" />
                <Link href="/faqs">{translations.footer.faqs}</Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaArrowCircleRight className="" />
                <Link href="/return-policy">
                  {translations.footer.return_policy}
                </Link>
              </li>
              <li className="flex flex-row gap-2 items-center hover:text-slate-400">
                <FaPhone className="" />
                <Link href="/warranty">{translations.footer.warranty}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3 ">
          <h3 className="  font-bold border-b-2 px-5 mx-7 flex justify-center">
            {translations.footer.questions_and_complaints}
          </h3>

          <div className="flex flex-row gap-2 px-3">
            {/* Whatsapp Section */}
            <Link
              href="https://wa.me/966920009017"
              className="flex items-center  "
            >
              <Image
                width={100}
                height={100}
                src="Reference_images/footer img/footer03.svg"
                alt="Whatsapp"
                className="h-6"
              />
              <div className="flex flex-col text-sm">
                <span className=" ">{translations.footer.whatsapp}</span>
                <span className="  text-sm">+966920009017</span>
              </div>
            </Link>

            {/* Call Us Section */}
            <Link href="tel:+966920009016" className="flex items-center ">
              <Image
                width={100}
                height={100}
                src="Reference_images/footer img/footer04.svg"
                alt="Call Us"
                className="h-6 mr-2"
              />
              <div className="flex flex-col">
                <span className="  text-sm">{translations.footer.call_us}</span>
                <span className="  text-sm">+966920009016</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-4 py-3">
          <Link href="https://www.facebook.com/alsaifgallery">
            <FaFacebookF className="text-2xl cursor-pointer" />
          </Link>
          <Link href="https://twitter.com/alsaifgallery">
            <FaTwitter className="text-2xl cursor-pointer" />
          </Link>
          <Link href="https://www.instagram.com/alsaifgallery38">
            <FaInstagram className="text-2xl cursor-pointer" />
          </Link>
          <Link href="https://www.snapchat.com/add/alsaifgallery36">
            <FaSnapchatGhost className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-center  gap-4">
        <Link href="https://apps.apple.com/sa/app/alsaif-gallery-السيف-غاليري/id1459530502">
          <Image
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            src="/Reference_images/footer img/footer09.png"
            alt="Download App Image 1"
          />
        </Link>
        <Link href="https://play.google.com/store/apps/details?id=com.alsaifgallery&amp;pcampaignid=web_share">
          <Image
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            src="/Reference_images/footer img/footer10.png"
            alt="Download App Image 2"
          />
        </Link>
        <Link href="https://appgallery.huawei.com/app/C103540015">
          <Image
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            src="/Reference_images/footer img/footer11.png"
            alt="Download App Image 3"
          />
        </Link>
      </div>

      <div className="flex  flex-row border-b-2 px-5 gap-7 ">
        {/* 
        First Image: Decreased height and width, aligned to the bottom */}
        <Image
          width={300} // Decreased width
          height={80} // Decreased height
          src="/Reference_images/footer img/footer12.png"
          alt="Image 1"
          className="h-10 w-2/3 self-end"
        />

        {/* Second Image: Decreased width but increased height */}
        <Image
          width={70} // Decreased width
          height={150} // Increased height
          src="/Reference_images/footer img/footer13.png"
          alt="Image 2"
          className="h-10 w-1/3"
        />
      </div>

      <div className="text-center w-full text-sm  py-2  ">
        <p>{translations.footer.copyright}</p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
            >
              <h1 className="text-center font-bold text-3xl text-gray-800 dark:text-gray-100 mb-4">
                {translations.account.chooseCountry}
              </h1>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleCountryChange("saudi")}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="country"
                      checked={selectedCountry === "saudi"}
                      readOnly
                      className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500"
                    />
                    <p className="text-lg text-gray-800 dark:text-gray-100">
                      {currentLocale === "en"
                        ? "Saudi Arabia"
                        : "  المملكة العربية السعودية"}
                    </p>
                  </div>
                  <Image
                    src="/saudiA.png"
                    alt="Saudi flag"
                    className="h-10 w-10"
                    width={40}
                    height={40}
                  />
                </div>
                <div
                  className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleCountryChange("uae")}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="country"
                      checked={selectedCountry === "uae"}
                      readOnly
                      className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500"
                    />
                    <p className="text-lg text-gray-800 dark:text-gray-100">
                      {currentLocale === "en"
                        ? "United Arab Emirates"
                        : " الإمارات العربية المتحدة"}
                    </p>
                  </div>
                  <Image
                    src="/uae.png"
                    alt="UAE flag"
                    className="h-10 w-10"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
