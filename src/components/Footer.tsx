"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTag, FaList } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Badge } from "antd";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/UserContext";
import Cookies from "js-cookie";

const Footer = () => {
  const pathname = usePathname();
  
  // const Menus = [
  //   { name: "Home", icon: "home-outline", dis: "translate-x-0" },
  //   { name: "Profile", icon: "person-outline", dis: "translate-x-16" },
  //   { name: "Message", icon: "chatbubble-outline", dis: "translate-x-32" },
  //   { name: "Photos", icon: "camera-outline", dis: "translate-x-48" },
  //   { name: "Settings", icon: "settings-outline", dis: "translate-x-64" },
  // ];
  const [active, setActive] = useState(0);
  const { user, logout } = useAuth();
  const token = Cookies.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items as any);
  const [filteredCartItems, setFilteredCartItems] = useState<any>(null);
 const { currentLocale, translations } = useSelector(
   (state: RootState) => state.locale
  );
  const navItems = [
    { name:  translations.footer.home, icon: <FaHome />, href: "/" },
    { name: translations.footer.categories, icon: <FaList />, href: "/menu" },
    { name: translations.footer.cart, icon: <FaShoppingCart />, href: "/cart" },
    { name: translations.footer.offers, icon: <FaTag />, href: "/all-offers" },
    { name: translations.footer.account, icon: <FaUser />, href: "/account" },
  ];
  useEffect(() => {
    // Filter cart items based on buyerId (either user._id or 'guest')
    if (token && user) {
      // If user is logged in, filter by user's ID
      const userCartItems = cartItems.filter(
        (item:any) => item.buyerId === user?._id
      );
      setFilteredCartItems(userCartItems);
    } else {
      // If guest, filter by 'guest' ID
      const guestCartItems = cartItems.filter(
        (item:any) => item.buyerId === "guest"
      );
      setFilteredCartItems(guestCartItems);
    }
  }, [cartItems, user, token]);
  return (
    <footer className=" pb-16 lg:pb-0">
      <div className="bg-gray-100 dark:bg-slate-600 py-3 hidden lg:block ">
        <div className="flex flex-row justify-around ">
          <div className="flex flex-row gap-3 items-center">
            <div>
              <svg
                id="Layer_1"
                version="1.1"
                viewBox="0 0 100.4 100.4"
                className="w-16 h-16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M88.5,15.3c-0.3-0.3-0.7-0.5-1.1-0.5H72.2v-7c0-0.8-0.7-1.5-1.5-1.5H28c-0.8,0-1.5,0.7-1.5,1.5v7H10.9 c-0.4,0-0.8,0.2-1.1,0.5c-0.3,0.3-0.4,0.7-0.4,1.1c0,0.3,0.3,6.7,2.6,14.1c3.2,9.9,8.6,16.9,15.8,20.1c2.4,8,7.9,14.3,14.8,16.8 v0.3c0,8.3-6.3,14.9-14.4,14.9c-0.8,0-1.5,0.7-1.5,1.5v8.5c0,0.8,0.7,1.5,1.5,1.5h42.5c0.8,0,1.5-0.7,1.5-1.5v-8.5 c0-0.8-0.7-1.5-1.5-1.5c-8.2,0-14.9-6.7-14.9-14.9v-0.2C63,65,68.6,58.6,71,50.4c6.9-3.3,12.2-10.2,15.3-19.9 c2.4-7.4,2.6-13.9,2.6-14.1C89,16,88.8,15.6,88.5,15.3z M12.5,17.8h14v24c0,1.7,0.1,3.3,0.4,4.9C15.5,39.9,13,23,12.5,17.8z M69.2,85.5V91H29.7v-5.5c8.8-0.7,15.6-8,15.8-17.3c1.2,0.2,2.5,0.4,3.8,0.4c1.2,0,2.4-0.1,3.5-0.3C53.2,77.4,60.3,84.8,69.2,85.5z M53.3,65.2c-1.3,0.3-2.6,0.5-3.9,0.5c-1.5,0-3-0.2-4.4-0.6c-0.3-0.1-0.8-0.3-1-0.3c-8.3-2.8-14.5-12-14.5-22.9V9.4h39.7v6v1.9 v24.6c0,10.9-6.2,20.1-14.6,22.9 M71.9,46.5c0.2-1.5,0.4-3.1,0.4-4.7v-24h13.6C85.4,23,83,39.4,71.9,46.5z"
                    fill={"var(--color-primary)"}
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                  />
                  <path
                    d="M63.8,27.3l-8.2-1.2l-3.7-7.5c-0.4-0.8-1.3-1.4-2.2-1.4c0,0,0,0,0,0c-0.9,0-1.8,0.5-2.2,1.4l-3.7,7.5l-8.2,1.2 c-0.9,0.1-1.7,0.8-2,1.7c-0.3,0.9-0.1,1.9,0.6,2.5l6,5.8l-1.4,8.2c-0.2,0.9,0.2,1.8,1,2.4c0.4,0.3,0.9,0.5,1.5,0.5 c0.4,0,0.8-0.1,1.1-0.3l7.6-3.8l7.2,3.8c0.8,0.4,1.8,0.4,2.6-0.2c0.8-0.6,1.1-1.5,1-2.4l-1.4-8.2l6-5.8c0.7-0.7,0.9-1.6,0.6-2.5 C65.5,28.1,64.8,27.4,63.8,27.3z M56.6,35.7c-0.4,0.3-0.5,0.8-0.4,1.3l1.4,7.9l-6.9-3.6c-0.4-0.2-0.9-0.2-1.4,0L41.9,45l1.4-8 c0.1-0.5-0.1-1-0.4-1.3l-5.7-5.6l7.9-1.2c0.5-0.1,0.9-0.4,1.1-0.8l3.5-7.2l3.5,7.2c0.2,0.4,0.6,0.8,1.1,0.8l7.9,1.2L56.6,35.7z"
                    fill={"var(--color-secondary)"}
                  />
                </g>
              </svg>
            </div>

            <div className="font-bold text-">
              {translations.footer.new_technologies}
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <div>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16"
              >
                <g>
                  <path d="M0 0h24v24H0z" fill="transparent" />
                  <path
                    d="M11 2l7.298 2.28a1 1 0 0 1 .702.955V7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1l-3.22.001c-.387.51-.857.96-1.4 1.33L11 22l-5.38-3.668A6 6 0 0 1 3 13.374V5.235a1 1 0 0 1 .702-.954L11 2zm0 2.094L5 5.97v7.404a4 4 0 0 0 1.558 3.169l.189.136L11 19.58 14.782 17H10a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h7V5.97l-6-1.876zM11 12v3h9v-3h-9zm0-2h9V9h-9v1z"
                    fill={"var(--color-primary)"}
                  />
                </g>
              </svg>
            </div>
            <div className="font-bold text-">
              {translations.footer.certified_warranty}
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                strokeMiterlimit="1.5"
                className="w-24 h-24"
              >
                <g id="Delivery">
                  {/* Path with custom color and added stroke-width */}
                  <path
                    d="M79,48.38,74.09,40.2A4.5,4.5,0,0,0,70.23,38H63.15l1.31-6A2.5,2.5,0,0,0,62,29H27.11a2.51,2.51,0,0,0-2.44,2l-.53,2.42a.5.5,0,1,0,1,.22l.53-2.43A1.52,1.52,0,0,1,27.11,30H62a1.5,1.5,0,0,1,1.46,1.82l-1.4,6.41a.56.56,0,0,0-.07.16L57.1,61H34v0a5.65,5.65,0,0,0-.17-.93l0-.11a4.91,4.91,0,0,0-.32-.83L33.39,59a6.13,6.13,0,0,0-.46-.74l-.09-.11a5,5,0,0,0-.58-.64l-.1-.09a4.88,4.88,0,0,0-.69-.53l-.11-.07a6,6,0,0,0-.8-.4l-.1,0a5.36,5.36,0,0,0-.89-.26H29.5a5.05,5.05,0,0,0-2,0h-.07a5.36,5.36,0,0,0-.89.26l-.1,0a6,6,0,0,0-.8.4l-.11.07a4.88,4.88,0,0,0-.69.53l-.1.09a5,5,0,0,0-.58.64l-.09.11a6.13,6.13,0,0,0-.46.74l-.06.12a4.91,4.91,0,0,0-.32.83l0,.11A5.65,5.65,0,0,0,23,61v0H19.19L21,55.66a.5.5,0,1,0-.94-.32L18.81,59h-.37a2,2,0,0,0-1.9,1.37L16,62h7A5.49,5.49,0,0,0,34,62H61A5.49,5.49,0,0,0,72,62h6l.12-.37a2,2,0,0,0-1.24-2.51l2.46-6.93A4.48,4.48,0,0,0,79,48.38ZM28.5,66A4.5,4.5,0,1,1,33,61.5,4.51,4.51,0,0,1,28.5,66Zm38,0A4.5,4.5,0,1,1,71,61.5,4.51,4.51,0,0,1,66.5,66ZM78.4,51.85,75.15,61H72v0a5.65,5.65,0,0,0-.17-.93l0-.11a5.26,5.26,0,0,0-.32-.83L71.39,59a7,7,0,0,0-.46-.74l-.09-.11a5,5,0,0,0-.58-.64l-.1-.1a5.67,5.67,0,0,0-.69-.52l-.11-.07a5,5,0,0,0-.8-.4l-.1,0a5.36,5.36,0,0,0-.89-.26H67.5a5,5,0,0,0-2,0h-.07a5.36,5.36,0,0,0-.89.26l-.1,0a5,5,0,0,0-.8.4l-.11.07a5.67,5.67,0,0,0-.69.52l-.1.1a5,5,0,0,0-.58.64l-.09.11a7,7,0,0,0-.46.74l-.06.12a5.26,5.26,0,0,0-.32.83l0,.11A5.65,5.65,0,0,0,61,61v0h-2.9l4.81-22h7.3a3.49,3.49,0,0,1,3,1.71l4.88,8.18h0A3.5,3.5,0,0,1,78.4,51.85Z"
                    fill="var(--color-primary)"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                  />
                </g>
              </svg>
            </div>
            <div className="font-bold text-">
              {translations.footer.free_shipping}
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <div>
              <svg
                height="100%"
                className="w-20 h-20"
                style={{
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 2,
                }}
                version="1.1"
                viewBox="0 0 32 32"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13,24.487l-0,-0.482c0,-1.656 1.344,-3 3,-3c1.656,0 3,1.344 3,3l-0,0.482c3.494,-1.236 6,-4.571 6,-8.487c0,-4.967 -4.033,-9 -9,-9c-4.967,0 -9,4.033 -9,9c0,3.916 2.506,7.251 6,8.487Zm5.247,-6.487c-0.55,0.612 -1.346,0.997 -2.232,0.997c-0.893,-0 -1.695,-0.392 -2.245,-1.012c-0.366,-0.413 -0.999,-0.451 -1.412,-0.085c-0.413,0.367 -0.451,0.999 -0.085,1.412c0.917,1.033 2.254,1.685 3.742,1.685c1.476,-0 2.804,-0.641 3.719,-1.66c0.369,-0.41 0.335,-1.043 -0.075,-1.412c-0.411,-0.369 -1.043,-0.335 -1.412,0.075Z"
                  fill={"var(--color-secondary)"} // Custom color here
                />
                <path
                  d="M3.328,13.091c-1.337,0.299 -2.338,1.494 -2.338,2.921c0,1.653 1.342,2.994 2.994,2.994c1.653,0 2.994,-1.341 2.994,-2.994c0,-1.17 -0.673,-2.184 -1.652,-2.676c1.192,-4.777 5.522,-8.319 10.674,-8.319c5.147,0 9.473,3.536 10.671,8.305c-0.995,0.486 -1.681,1.509 -1.681,2.69c0,1.179 0.683,2.199 1.674,2.688c-0.004,0.016 -0.009,0.033 -0.013,0.049c-1.144,4.418 -4.978,7.76 -9.651,8.182l-0,-2.926c0,-0.552 -0.448,-1 -1,-1c-0.552,0 -1,0.448 -1,1l-0,3.99c0,0.552 0.448,1 1,1c0.07,-0 0.139,-0.007 0.205,-0.021c5.959,-0.092 10.95,-4.196 12.382,-9.723c0.028,-0.107 0.054,-0.215 0.079,-0.323c1.324,-0.309 2.312,-1.498 2.312,-2.916c0,-1.415 -0.984,-2.602 -2.304,-2.913c-1.32,-5.77 -6.496,-10.082 -12.674,-10.082c-6.175,0 -11.349,4.308 -12.672,10.074Z"
                  fill={"var(--color-primary)"} // Another custom color here
                />
              </svg>
            </div>
            <div className="font-bold text-">
              {translations.footer.customer_service}
            </div>
          </div>
        </div>
      </div>
      <main className="bg-[var(--color-tertiary)]  relative hidden lg:block ">
        {/* Background Image */}
        {/* <div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/Reference_images/footer%20img/footer01.png')] bg-no-repeat bg-top-left z-0"></div>
        </div> */}
        {/* First Section: Logo */}
        <div className="relative  z-10 flex justify-start pl-32">
          <Image
            width={1200} // Decreased width
            height={125} // Decreased height
            src="/footer3.png"
            alt="Logo"
            className="h-32 pt-3 w-[20rem] bg-transparent"
          />
        </div>

        {/* Second Section: Main Content with Three Columns */}
        <div className="flex justify-evenly pb-8 py-6 ">
          {/* First Column */}
          <div className="flex flex-col gap-3 z-10">
            <h3 className="text-white font-bold border-b-2 pb-1 mx-16 flex justify-center">
              {translations.footer.questions_and_complaints}
            </h3>

            {/* Whatsapp Section */}
            <Link
              href="https://wa.me/966920009017"
              className="flex items-center ml-10"
            >
              <Image
                width={100}
                height={100}
                src="Reference_images/footer img/footer03.svg"
                alt="Whatsapp"
                className="h-6"
              />
              <div className="flex flex-col">
                <span className="text-white">
                  {translations.footer.whatsapp}
                </span>
                <span className="text-white">+966920009017</span>
              </div>
            </Link>
            <hr className="mx-28 bg-gray-50 flex justify-center" />
            {/* Call Us Section */}
            <Link href="tel:+966920009016" className="flex items-center ml-10">
              <Image
                width={100}
                height={100}
                src="Reference_images/footer img/footer04.svg"
                alt="Call Us"
                className="h-6 mr-2"
              />
              <div className="flex flex-col">
                <span className="text-white">
                  {translations.footer.call_us}
                </span>
                <span className="text-white">+966920009016</span>
              </div>
            </Link>
          </div>

          {/* Second Column */}
          <div className="flex flex-col font-thin text-white z-10">
            <h3 className="text-white font-bold border-b-2 pb-1 mx-20 text-md text-center">
              {translations.footer.need_help}
            </h3>
            <ul className="space-y-2 text-sm pt-3 flex flex-col items-center">
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

          {/* Third Column */}
          <div className="flex flex-col text-white z-10">
            <h3 className="text-white font-bold text-center border-b-2 pb-1 mb-1 mx-24">
              {translations.footer.follow_us}
            </h3>
            <p className="text-xs text-center">
              {translations.footer.follow_us_social_media}
            </p>
            <div className="flex justify-center gap-4 mt-2">
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
            <h3 className="text-white font-bold text-center mt-4">
              {translations.footer.download_app}
            </h3>
            <p className="text-xs text-center">
              {translations.footer.download_app_offers}
            </p>
            <div className="flex flex-col items-center mt-4 space-y-4">
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
          </div>
        </div>

        {/* Third Section: Images */}
        <div className="flex justify-between mx-28 border-b-2 pb-1   px-3 z-10">
          {/* First Image: Decreased height and width, aligned to the bottom */}
          <Image
            width={300} // Decreased width
            height={80} // Decreased height
            src="/Reference_images/footer img/footer12.png"
            alt="Image 1"
            className="h-10 self-end"
          />

          {/* Second Image: Decreased width but increased height */}
          <Image
            width={70} // Decreased width
            height={150} // Increased height
            src="/Reference_images/footer img/footer13.png"
            alt="Image 2"
            className="h-24"
          />
        </div>

        {/* Fourth Section: Copyright Information */}
        <div className="text-center text-white py-2 z-10">
          <p>{translations.footer.copyright}</p>
        </div>
      </main>

      <div className="lg:hidden  fixed bottom-0 left-0 right-0 z-50 bg-gray-300 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex flex-col items-center justify-center p-3 transition-transform duration-300 ${
                  pathname === item.href
                    ? "text-[var(--color-primary)] bg-[#ffffff] dark:bg-slate-700 rounded-full shadow-2xl"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: pathname === item.href ? 1.05 : 1, // Slightly scale up the active tab
                  y: pathname === item.href ? -10 : 0, // Apply the y-axis translate effect on active tab
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.name === "Cart" ? (
                  // Check if the current item is Cart and render the badge
                  <>
                    <Badge
                      count={filteredCartItems?.length}
                      offset={[23, -20]}
                      style={{
                        backgroundColor: "#FF6347", // Change badge background color
                        color: "white", // Set the text color of the badge
                        fontSize: "12px", // Change font size of the count
                        width: "20px", // Set width of the badge
                        height: "20px", // Set height of the badge
                        borderRadius: "50%", // Make the badge circular
                      }}
                    ></Badge>
                    {item.icon}
                  </>
                ) : (
                  item.icon
                )}
                <span className="text-xs mt-1">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
