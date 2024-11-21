// app/checkout/layout.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/slices/cartSlice';
// import { message } from 'antd';
import { useAuth } from "@/context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { steps } from "../steps"; // Extracted step data

const steps = [
  { id: 1, label: "Step 1", svg: "check", name: "Login" },
  { id: 2, label: "Step 2", svg: "user", name: "Address" },
  { id: 3, label: "Step 3", svg: "file", name: "Payment" },
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

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartEmpty, setCartEmpty] = useState(false); // Assuming cart state
  // const cartRef = useRef<HTMLDivElement | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [showCouponFields, setShowCouponFields] = useState(false);
  const { user } = useAuth();
  const token = Cookies.get("token");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = useState(false);
  const { totalQuantity, totalPrice, totalDiscount } = useSelector(
    (state: RootState) => state.cart
  );
  // Ensure component is mounted before rendering cart items (client-side rendering)
  const [filteredCartItems, setFilteredCartItems] = useState<any>(null);
  const router = useRouter();
 
  useEffect(() => {
    setIsMounted(true);

    // Filter cart items based on buyerId (either user._id or 'guest')
    if (token && user) {
      // If user is logged in, filter by user's ID
      const userCartItems = cartItems.filter(
        (item) => item.buyerId === user?._id
      );
      setFilteredCartItems(userCartItems);
    } else {
      // If guest, filter by 'guest' ID
      const guestCartItems = cartItems.filter(
        (item) => item.buyerId === "guest"
      );
      setFilteredCartItems(guestCartItems);
    }
  }, [cartItems, user, token]);

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
          <motion.svg
            className={`w-3.5 h-3.5 ${
              isActive
                ? "text-white dark:text-blue-100"
                : "text-gray-500 dark:text-gray-100"
            } lg:w-4 lg:h-4`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </motion.svg>
        );
      case "user":
        return (
          <motion.svg
            className={`w-4 h-4 ${
              isActive
                ? "text-white dark:text-blue-100"
                : "text-gray-500 dark:text-gray-100"
            } lg:w-5 lg:h-5`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
          </motion.svg>
        );
      case "file":
        return (
          <motion.svg
            className={`w-4 h-4 ${
              isActive
                ? "text-white dark:text-blue-100"
                : "text-gray-500 dark:text-gray-100"
            } lg:w-5 lg:h-5`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
          </motion.svg>
        );
      default:
        return null;
    }
  };
  const pathname = usePathname(); // Initialize useRouter

  useEffect(() => {
    if (
      pathname.includes("/checkout/login") ||
      pathname.includes("/checkout/register")
    ) {
      setActiveStep(1);
    } else if (pathname.includes("/checkout/address")) {
      setActiveStep(2);
    } else if (pathname.includes("/checkout/payment")) {
      setActiveStep(3);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col md:flex-row justify-center 2xl:mt-[124px]       lg:h-full py-3  items-center  md:px-12 lg:px-16 dark:bg-gray-900">
      <AnimatePresence>
        {cartEmpty && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4">
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Cart (0 Products)
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/cart.gif"
                  alt="empty cart icon"
                  width={250}
                  height={250}
                  className="mb-4"
                />
                <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Your cart is empty. Add your favorite products to it.
                </div>
                <Link href="/SA_en" passHref>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className=" bg-[var(--color-primary)] text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500"
                  >
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
          <div className="flex flex-col items-center gap-6 w-full lg:w-2/3 mx-auto">
            <div className="flex justify-center py-6 w-full">
              <div className="flex items-center justify-center w-full max-w-4xl relative">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="relative flex flex-col items-center w-full"
                  >
                    {/* Step Container with Active Background */}
                    <div
                      className={`relative p-3 rounded-full transition-all duration-300 ease-in-out ${
                        activeStep >= step.id
                          ? "bg-[var(--color-secondary)] shadow-lg"
                          : "bg-transparent"
                      }`}
                    >
                      {/* Step Circle */}
                      <div
                        className={`flex items-center justify-center z-10 w-10 h-10 lg:h-12 lg:w-12 rounded-full border-4 ${
                          activeStep >= step.id
                            ? " bg-[var(--color-primary)] text-white border-green-200 shadow-lg"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                        } transition-all duration-300 ease-in-out cursor-pointer`}
                      >
                        {renderSVG(step.svg, activeStep >= step.id)}
                      </div>
                    </div>

                    {/* Bottom Label */}
                    <div
                      className={`text-sm mt-2 font-medium ${
                        activeStep >= step.id
                          ? "text-[var(--color-primary)]"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">{children}</div>
          </div>

          {/* Order Summary */}
          <div className="mt-4 md:mt-0 p-4 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl w-full md:w-2/4 lg:w-1/4">
            {/* Cart Products */}

            {/* Order Summary Title */}
            <div className="text-xl font-semibold dark:text-gray-200">
              Order Summary
            </div>

            <div>
              {filteredCartItems?.map((item: any) => (
                <div className="flex items-center mb-4 " key={item.id}>
                  <Link
                    href={`/singleProduct/${item.name}/${item.id}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150} // Adjusted size for responsiveness
                      height={150} // Adjusted size for responsiveness
                      className="rounded-xl"
                    />
                  </Link>
                  <div className="ml-4 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div>Color: {item.color}</div>
                      <div>Quantity: {item.quantity}</div>
                    </div>

                    {item.discount > 0 ? (
                      <>
                        <div className="flex items-center text-red-600 dark:text-red-400">
                          <div className="flex flex-col gap-4">
                            <div className="line-through text-gray-500 dark:text-gray-400">
                              {item.price}
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {item.unitPrice}
                            </div>
                          </div>
                          <div className="flex w-full justify-end">
                            <div className="text-lg font-bold">
                              -{Math.round(item.discount)}%
                            </div>
                            <svg
                              className="ml-2"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.5299 10.87L20.0099 9.35001C19.7499 9.09 19.5399 8.58001 19.5399 8.22001V6.06C19.5399 5.18 18.8199 4.46 17.9399 4.46H15.7899C15.4299 4.46 14.9199 4.25 14.6599 3.99L13.1399 2.47C12.5199 1.85 11.4999 1.85 10.8799 2.47L9.33988 3.99C9.08988 4.25 8.57988 4.46 8.20988 4.46H6.05988C5.17988 4.46 4.45988 5.18 4.45988 6.06V8.21C4.45988 8.57 4.24988 9.08 3.98988 9.34L2.46988 10.86C1.84988 11.48 1.84988 12.5 2.46988 13.12L3.98988 14.64C4.24988 14.9 4.45988 15.41 4.45988 15.77V17.92C4.45988 18.8 5.17988 19.52 6.05988 19.52H8.20988C8.56988 19.52 9.07988 19.73 9.33988 19.99L10.8599 21.51C11.4799 22.13 12.4999 22.13 13.1199 21.51L14.6399 19.99C14.8999 19.73 15.4099 19.52 15.7699 19.52H17.9199C18.7999 19.52 19.5199 18.8 19.5199 17.92V15.77C19.5199 15.41 19.7299 14.9 19.9899 14.64L21.5099 13.12C22.1599 12.51 22.1599 11.49 21.5299 10.87ZM7.99988 9C7.99988 8.45 8.44988 8 8.99988 8C9.54988 8 9.99988 8.45 9.99988 9C9.99988 9.55 9.55988 10 8.99988 10C8.44988 10 7.99988 9.55 7.99988 9ZM9.52988 15.53C9.37988 15.68 9.18988 15.75 8.99988 15.75C8.80988 15.75 8.61988 15.68 8.46988 15.53C8.17988 15.24 8.17988 14.76 8.46988 14.47L14.4699 8.47001C14.7599 8.18001 15.2399 8.18001 15.5299 8.47001C15.8199 8.76 15.8199 9.24 15.5299 9.53L9.52988 15.53ZM14.9999 16C14.4399 16 13.9899 15.55 13.9899 15C13.9899 14.45 14.4399 14 14.9899 14C15.5399 14 15.9899 14.45 15.9899 15C15.9899 15.55 15.5499 16 14.9999 16Z"
                                fill="#FF233F"
                              />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="text-sm font-bold text-green-600">
                          {item.price}
                        </div>
                      </>
                    )}
                    <div className="text-sm text-gray-500">Tax included</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon/Gift Card Section */}
            <div className="mt-4">
              <div
                className="flex items-center justify-between dark:text-gray-300 cursor-pointer"
                onClick={toggleCouponFields}
              >
                <span>Do you have a coupon or gift card?</span>
                <svg
                  id="coupon_gift_card_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transition-transform ${
                    showCouponFields ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              <AnimatePresence>
                {showCouponFields && (
                  <motion.div
                    id="coupon_gift_card"
                    className="mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Coupon Input */}
                    <div>
                      <label
                        htmlFor="coupon_code"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Enter Coupon
                      </label>
                      <div className="flex w-full mt-1">
                        <input
                          id="coupon_code"
                          type="text"
                          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300"
                        />
                        <button className=" bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] p-2 text-white rounded-r-md">
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Gift Card Input */}
                    <div>
                      <label
                        htmlFor="gift_card_code"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Enter Gift Card
                      </label>
                      <div className="flex mt-1">
                        <input
                          id="gift_card_code"
                          type="text"
                          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-gray-300"
                        />
                        <button className=" bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] p-2 text-white rounded-r-md">
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Money Totals */}
            <div className="mt-6 space-y-2 dark:text-gray-300">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>{totalPrice} SAR</div>
              </div>
              <div className="flex justify-between text-red-500 dark:text-red-400">
                <div>Discount</div>
                <div>-{totalDiscount} SAR</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>0 SAR</div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-bold mt-4 dark:text-gray-200">
              <div>Total</div>
              <div>{totalPrice} SAR</div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" passHref>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6  bg-[var(--color-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-secondary)]"
              >
                Order Now
              </motion.button>
            </Link>

            <Image
              className="mt-4 w-full"
              src="/payment_methods.png"
              alt="payment methods banner"
              width={500}
              height={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}
