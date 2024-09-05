"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

const CartComponent = () => {
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

  return (
    <div ref={cartRef} id="cart_component_container" className="flex flex-col md:flex-row justify-center mt-[124px] items-center p-4 md:px-12 lg:px-16 dark:bg-gray-900">
      <AnimatePresence>
        {cartEmpty && (
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Cart (0 Products)</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/cart.gif" alt="empty cart icon" width={250} height={250} className="mb-4" />
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Your cart is empty. Add your favourite products to it.</p>
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
        <div className="flex flex-col md:flex-row gap-3 w-full">
          {/* Product Section */}
          <div className="flex flex-col gap-4 md:w-2/3">
            <div className="flex gap-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md shadow-lg">
              <a href="/SA_en/porcelain-soup-set-silver-basstand-white-15-pieces.html" className="self-center md:self-start">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/69ac3f4e9a6e4cbfdfdd61c00da77ca5/_/_/___6__6_9_6900021120012_1.jpg?width=300"
                  alt="cart Product image"
                  width={150} // Adjusted size for responsiveness
                  height={150} // Adjusted size for responsiveness
                  className="rounded-xl"
                />
              </a>

              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <a href="/SA_en/porcelain-soup-set-silver-basstand-white-15-pieces.html" className="w-[85%] md:w-[90%]">
                    <p className="text-lg font-medium dark:text-gray-200">Porcelain Soup Set, Silver Basstand White, 15 Pieces</p>
                    <p className="dark:text-gray-300">Color: White</p>
                  </a>
                  <button className="mt-2 text-red-500 self-start">
                    <FaTrashAlt className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex items-center gap-2">
                    <button onClick={handleIncrease} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                      +
                    </button>
                    <p className="dark:text-gray-200">{quantity}</p>
                    <button onClick={handleDecrease} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                      -
                    </button>
                  </div>
                  <div>
                    <p className="text-red-500 font-semibold dark:text-red-400">115 SAR</p>
                    <div className="text-sm dark:text-gray-300">
                      <p className="line-through">229 SAR</p>
                      <p>SAVE 114 SAR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4 md:mt-0 p-4 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl w-full md:w-1/4">
            {/* Order Summary Title */}
            <h2 className="text-xl font-semibold dark:text-gray-200">Order Summary</h2>

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
                        <input id="coupon_code" type="text" className=" p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300" />
                        <button className="  bg-green-500 dark:bg-green-700 text-white rounded-r-md">Apply</button>
                      </div>
                    </div>

                    {/* Gift Card Input */}
                    <div>
                      <label htmlFor="gift_card_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Enter Gift Card
                      </label>
                      <div className="flex mt-1">
                        <input id="gift_card_code" type="text" className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300" />
                        <button className=" bg-green-500 dark:bg-green-700 text-white rounded-r-md">Apply</button>
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

export default CartComponent;
