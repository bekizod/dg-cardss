import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#248248] relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/background-image.png')] bg-no-repeat bg-top-left"></div>

      {/* First Section: Logo */}
      <div className="w-full flex justify-start p-4">
        <Image width={1000} height={1000} src="/path/to/logo.png" alt="Logo" className="h-12" />
      </div>

      {/* Second Section: Main Content with Three Columns */}
      <div className="w-full flex justify-between p-4">
        {/* First Column */}
        <div className="flex flex-col">
          <h3 className="text-white font-bold">Questions and complaints</h3>
          <div className="flex items-center">
            <Image width={1000} height={1000} src="/path/to/whatsapp-icon.png" alt="Whatsapp" className="h-6 mr-2" />
            <span className="text-white">Whatsapp: +966920009017</span>
          </div>
          <div className="flex items-center mt-2">
            <Image width={1000} height={1000} src="/path/to/phone-icon.png" alt="Call Us" className="h-6 mr-2" />
            <span className="text-white">Call Us: +966920009016</span>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col text-white">
          <h3 className="text-white font-bold">Need Help ?</h3>
          <ul className="space-y-2">
            <li>Our Story</li>
            <li>Loyalty Points Policy</li>
            <li>Privacy Policy</li>
            <li>Payment Method</li>
            <li>Shipping and Delivery Information</li>
            <li>How to Buy</li>
            <li>Terms and Conditions</li>
            <li>FAQs</li>
            <li>Return Policy</li>
            <li>Warranty</li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="flex flex-col text-white">
          <h3 className="text-white font-bold">Follow Us</h3>
          <p>You can follow us on social media</p>
          <h3 className="text-white font-bold mt-4">Download App</h3>
          <p>Download the app and enjoy exclusive offers</p>
        </div>
      </div>

      {/* Third Section: Images */}
      <div className="w-full flex justify-between p-4">
        <Image width={1000} height={1000} src="/path/to/image1.png" alt="Image 1" className="h-24" />
        <Image width={1000} height={1000} src="/path/to/image2.png" alt="Image 2" className="h-24" />
      </div>

      {/* Fourth Section: Copyright Information */}
      <div className="w-full text-center text-white p-4">
        <p>Copyright © alsaifgallery.com/ All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
