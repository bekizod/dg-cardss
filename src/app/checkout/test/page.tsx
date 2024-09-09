"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
const steps = [
  { id: 1, label: "Step 1", svg: "check" },
  { id: 2, label: "Step 2", svg: "user" },
  { id: 3, label: "Step 3", svg: "file" },
];

interface Product {
  href: string;
  imageSrc: string;
  alt: string;
  name: string;
  color: string;
  quantity: number;
  price: string;
}

const CartProduct = () => {
  const products: Product[] = [
    {
      href: "/SA_en/karcher-high-pressure-washer-100-bar.html",
      imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/69ac3f4e9a6e4cbfdfdd61c00da77ca5/_/1/_1_2_1200x1200_-_1_3_1.jpg?width=300",
      alt: "cart Product image",
      name: "Karcher high-pressure washer 100 bar",
      color: "Yellow",
      quantity: 1,
      price: "299 SAR",
    },
    {
      href: "/SA_en/karcher-high-pressure-washer-100-bar.html",
      imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/69ac3f4e9a6e4cbfdfdd61c00da77ca5/_/1/_1_2_1200x1200_-_1_3_1.jpg?width=300",
      alt: "cart Product image",
      name: "Karcher high-pressure washer 100 bar",
      color: "Yellow",
      quantity: 1,
      price: "299 SAR",
    },
    // Add more products here
  ];

  return (
    <div>
      {products.map((product, index) => (
        <div key={index} id="cart_product_component_container" className="flex items-center mb-4">
          <Link href={product.href} className="flex-shrink-0">
            <Image
              src={product.imageSrc}
              alt={product.alt}
              width={100}
              height={100}
              className="rounded-xl"
            />
          </Link>
          <div className="ml-4 flex flex-col justify-between">
            <div>
              <Link href={product.href}>
                <p className="text-sm font-semibold">{product.name}</p>
                <p>Color: {product.color}</p>
                <p>Quantity: {product.quantity}</p>
              </Link>
            </div>
            <div className="text-sm font-bold text-green-600">{product.price}</div>
            <p className="text-sm text-gray-500">Tax included</p>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
};

const CheckTest = () => {
  const [cartEmpty, setCartEmpty] = useState(false); // Assuming cart state
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCouponFields, setShowCouponFields] = useState(false);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleCouponFields = () => {
    setShowCouponFields(!showCouponFields);
  };
const [activeStep, setActiveStep] = useState(1);

const handleStepClick = (stepId: number) => {
  setActiveStep(stepId);
};

const renderSVG = (svgType: string, isActive: boolean) => {
  switch (svgType) {
    case "check":
      return (
        <motion.svg className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-4 lg:h-4`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
        </motion.svg>
      );
    case "user":
      return (
        <motion.svg className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-5 lg:h-5`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </motion.svg>
      );
    case "file":
      return (
        <motion.svg className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-5 lg:h-5`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
        </motion.svg>
      );
    default:
      return null;
  }
};
  return (
    <div className="flex flex-col md:flex-row justify-center lg:mt-[124px] mt-[68px] sm:h-screen md:h-screen lg:h-full py-3  items-center  md:px-12 lg:px-16 dark:bg-gray-900">
      <AnimatePresence>
        {cartEmpty && (
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Cart (0 Products)</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/cart.gif" alt="empty cart icon" width={250} height={250} className="mb-4" />
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Your cart is empty. Add your favorite products to it.</p>
                <Link href="/SA_en" passHref>
                  <motion.button whileTap={{ scale: 0.95 }} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500">
                    Start Shopping
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!cartEmpty && (
        <div className="flex flex-col md:flex-row gap-3 px-3 w-full">
          {/* Product Section */}
          <div className="flex flex-col  gap-4 md:w-2/3">
            <div className="flex justify-center py-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-lg">
              <ol className="flex items-center w-full max-w-4xl gap-4">
                {steps.map((step, index) => (
                  <li key={step.id} className="relative flex items-center w-full">
                    {/* Step Circle */}
                    <div className={`flex items-center justify-center z-10 w-10 h-10 ${activeStep >= step.id ? "bg-blue-100 text-blue-600 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-700 text-gray-500"} rounded-full cursor-pointer lg:h-12 lg:w-12 shrink-0`} onClick={() => handleStepClick(step.id)}>
                      {renderSVG(step.svg, activeStep >= step.id)}
                    </div>

                    {/* Progress Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-1/2 w-full h-1 -translate-x-1/2">
                        <div className={`w-full h-full ${activeStep > step.id ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-300 dark:bg-gray-500"}`}></div>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div>Login Address and purchase part</div>
          </div>

          {/* Order Summary */}
          <div className="mt-4 md:mt-0 p-4 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl w-full md:w-1/4">
            {/* Cart Products */}

            {/* Order Summary Title */}
            <h2 className="text-xl font-semibold dark:text-gray-200">Order Summary</h2>

            <CartProduct />

            {/* Coupon/Gift Card Section */}
            <div className="mt-4">
              <div className="flex items-center justify-between dark:text-gray-300 cursor-pointer" onClick={toggleCouponFields}>
                <span>Do you have a coupon or gift card?</span>
                <svg id="coupon_gift_card_arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-transform ${showCouponFields ? "rotate-180" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              <AnimatePresence>
                {showCouponFields && (
                  <motion.div id="coupon_gift_card" className="mt-4" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    {/* Coupon Input */}
                    <div>
                      <label htmlFor="coupon_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Enter Coupon
                      </label>
                      <div className="flex w-full mt-1">
                        <input id="coupon_code" type="text" className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300" />
                        <button className="bg-green-500 dark:bg-green-700 text-white rounded-r-md">Apply</button>
                      </div>
                    </div>

                    {/* Gift Card Input */}
                    <div>
                      <label htmlFor="gift_card_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Enter Gift Card
                      </label>
                      <div className="flex mt-1">
                        <input id="gift_card_code" type="text" className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300" />
                        <button className="bg-green-500 dark:bg-green-700 text-white rounded-r-md">Apply</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Money Totals */}
            <div className="mt-6 space-y-2 dark:text-gray-300">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>300 SAR</p>
              </div>
              <div className="flex justify-between text-red-500 dark:text-red-400">
                <p>Discount</p>
                <p>-299 SAR</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>0 SAR</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-bold mt-4 dark:text-gray-200">
              <p>Total</p>
              <p>1 SAR</p>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" passHref>
              <motion.button whileTap={{ scale: 0.95 }} className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600">
                Buy Now
              </motion.button>
            </Link>

            <Image className="mt-4 w-full" src="/payment_methods.png" alt="payment methods banner" width={500} height={100} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckTest;
