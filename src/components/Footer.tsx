import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaInfoCircle, FaWallet, FaShieldAlt, FaShippingFast, FaMoneyBillWave, FaShoppingCart, FaFileContract, FaQuestionCircle, FaPhone, FaArrowCircleRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-[#248248] relative ">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/Reference_images/footer%20img/footer01.png')] bg-no-repeat bg-top-left -z-10 "></div>

      {/* First Section: Logo */}
      <div className="flex  justify-start pl-32">
        <Image
          width={1000} // Decreased width
          height={125} // Decreased height
          src="/Reference_images/footer img/footer02.svg"
          alt="Logo"
          className="h-28 py-3 w-auto " // Decreased height (h-28)
        />
      </div>

      {/* Second Section: Main Content with Three Columns */}
      <div className="flex justify-evenly pb-4">
        {/* First Column */}
        <div className="flex flex-col gap-3 ">
          <h3 className="text-white font-bold border-b-2 pb-1 mx-16 flex justify-center">Questions and complaints</h3>

          {/* Whatsapp Section */}
          <div className="flex items-center ml-10">
            <Image width={100} height={100} src="Reference_images/footer img/footer03.svg" alt="Whatsapp" className="h-6 " />
            <div className="flex flex-col">
              <span className="text-white">Whatsapp</span>
              <span className="text-white">+966920009017</span>
            </div>
          </div>
          <hr className="mx-28 bg-gray-50 flex justify-center" />
          {/* Call Us Section */}
          <div className="flex items-center ml-10">
            <Image width={100} height={100} src="Reference_images/footer img/footer04.svg" alt="Call Us" className="h-6 mr-2" />
            <div className="flex flex-col">
              <span className="text-white">Call Us</span>
              <span className="text-white">+966920009016</span>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col font-thin  text-white ">
          <h3 className="text-white font-bold border-b-2 pb-1 mx-16 text-md">Need Help ?</h3>
          <ul className="space-y-2  text-sm pt-3 flex flex-col items-center">
            <li className="flex items-center hover:text-slate-400">
              <FaInfoCircle className="mr-2" />
              <Link href="#">Our Story</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaWallet className="mr-2" />
              <Link href="#">Loyalty Points Policy</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaShieldAlt className="mr-2" />
              <Link href="#">Privacy Policy</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaMoneyBillWave className="mr-2" />
              <Link href="#">Payment Method</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaShippingFast className="mr-2" />
              <Link href="#">Shipping and Delivery Information</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaShoppingCart className="mr-2" />
              <Link href="#">How to Buy</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaFileContract className="mr-2" />
              <Link href="#">Terms and Conditions</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaQuestionCircle className="mr-2" />
              <Link href="#">FAQs</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaArrowCircleRight className="mr-2" />
              <Link href="#">Return Policy</Link>
            </li>
            <li className="flex items-center hover:text-slate-400">
              <FaPhone className="mr-2" />
              <Link href="#">Warranty</Link>
            </li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="flex flex-col text-white ">
          <h3 className="text-white font-bold text-center border-b-2 pb-1 mb-1 mx-24">Follow Us</h3>
          <p className="text-xs text-center">You can follow us on social media</p>
          <div className="flex justify-center space-x-4 mt-2">
            <FaFacebookF className="text-2xl cursor-pointer" />
            <FaTwitter className="text-2xl cursor-pointer" />
            <FaInstagram className="text-2xl cursor-pointer" />
            <FaSnapchatGhost className="text-2xl cursor-pointer" />
          </div>
          <h3 className="text-white font-bold text-center   mt-4">Download App</h3>
          <p className="text-xs text-center">Download the app and enjoy exclusive offers</p>
          <div className="flex flex-col items-center mt-4 space-y-4">
            <Image
              width={150} // Adjust width as needed
              height={50} // Adjust height as needed
              src="/Reference_images/footer img/image1.png"
              alt="Download App Image 1"
            />
            <Image
              width={150} // Adjust width as needed
              height={50} // Adjust height as needed
              src="/Reference_images/footer img/image2.png"
              alt="Download App Image 2"
            />
            <Image
              width={150} // Adjust width as needed
              height={50} // Adjust height as needed
              src="/Reference_images/footer img/image3.png"
              alt="Download App Image 3"
            />
          </div>
        </div>
      </div>

      {/* Third Section: Images */}
      <div className="flex justify-between mx-28 border-b-2 pb-1 px-3">
        {/* First Image: Decreased height and width, aligned to the bottom */}
        <Image
          width={300} // Decreased width
          height={80} // Decreased height
          src="/Reference_images/footer img/footer12.png"
          alt="Image 1"
          className="h-10 self-end" // Align to bottom with self-end
        />

        {/* Second Image: Decreased width but increased height */}
        <Image
          width={70} // Decreased width
          height={150} // Increased height
          src="/Reference_images/footer img/footer13.png"
          alt="Image 2"
          className="h-24" // Tailwind height increased
        />
      </div>

      {/* Fourth Section: Copyright Information */}
      <div className=" text-center text-white py-2">
        <p>Copyright © alsaifgallery.com/ All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
