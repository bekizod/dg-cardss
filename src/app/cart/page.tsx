"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/cartSlice";
import { message } from "antd";
import { useAuth } from "@/context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const CartComponent = () => {
  const { user } = useAuth();
  const [cartEmpty, setCartEmpty] = useState(false); // Assuming cart state
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCouponFields, setShowCouponFields] = useState(false);
  const token = Cookies.get("token");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = useState(false);
  // Ensure component is mounted before rendering cart items (client-side rendering)
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems);
  const { totalItems, totalPrice, totalDiscount } = useSelector(
    (state: RootState) => state.cart
  );
  const router = useRouter();
  // Ensure component is mounted before rendering cart items (client-side rendering)
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

  const handleDelete = (id: string, buyerId: string) => {
    dispatch(removeFromCart({ id, buyerId }));
    message.warning("Item removed from cart.");
  };
  if (!isMounted) {
    return (
      <div
        role="status"
        className="space-y-8 py-4 mt-[124px] animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse flex md:flex-row flex-col px-6 "
      >
        <div className="md:w-2/3">
          <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
          <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
          <div className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
        </div>
        <div className="flex items-center justify-center md:w-1/3 h-64 bg-gray-300 rounded dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const toggleCouponFields = () => {
    setShowCouponFields(!showCouponFields);
  };

  const handleBuyNow = () => {
    if (!token || !user) {
      router.push("/checkout/login");
    } else {
      router.push("/checkout/address");
    }
  };

  //  const createOrderList = () => {
  //    const cart = filteredCartItems?.map((item) => ({
  //      productId: item.id, // Replace with your product ID property
  //      quantity: item.quantity, // Adjust based on your item structure
  //      unitPrice :item.unitPrice,
  //    }));

  //    const orderList = {
  //      orderedBy: user._id,
  //      cart: cart,
  //      totalAmount: totalQuantity, // Implement a function to calculate total amount
  //    };

  //    console.log(JSON.stringify(orderList, null, 4)); // Log the order list in formatted JSON
  //  };
  return (
    <div className="flex justify-center lg:mt-[124px] mt-[68px] sm:h-screen md:h-screen lg:h-full py-3  items-center  md:px-12 lg:px-16 dark:bg-gray-900">
      <AnimatePresence>
        {filteredCartItems.length === 0 && (
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
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Your cart is empty.Please Add your favorite products to it.
                </p>
                <Link href="/ " passHref>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className=" bg-[var(--color-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--color-primary)] dark:hover:bg-green-300"
                  >
                    Start Shopping
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredCartItems.length !== 0 && (
        <div className="flex flex-col md:flex-row gap-6 px-3 w-full">
          {/* Product Section */}
          <div className="md:w-2/3 flex flex-col gap-6">
            <div>total quantity in cart : {filteredCartItems?.length}</div>
            {filteredCartItems.map((item) => (
              <div className="flex flex-col gap-4 " key={item.id}>
                <div className="flex gap-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md shadow-lg">
                  <div className="self-center md:self-start">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150} // Adjusted size for responsiveness
                      height={150} // Adjusted size for responsiveness
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between">
                      <Link
                        href={`/singleProduct/${item.name}/${item.id}`}
                        className="w-[85%] md:w-[90%]"
                      >
                        <p className="text-lg font-medium dark:text-gray-200">
                          {item.name}
                        </p>
                        <p className="dark:text-gray-300">Color:{item.color}</p>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.buyerId)}
                        className="mt-2 p-4 text-red-500 self-start"
                      >
                        <FaTrashAlt className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex flex-col mt-4  gap-3">
                      <div className="text-2xl  font-bold ">
                        {item.price - item.price * (item.discount / 100)} SAR
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              decrementQuantity({
                                id: item.id,
                                buyerId: item.buyerId,
                              })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded"
                        >
                          -
                        </button>
                        <div className="dark:text-gray-200">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            dispatch(
                              incrementQuantity({
                                id: item.id,
                                buyerId: item.buyerId,
                              })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-sm text-red-500">
                        {item.discount !== 0 && (
                          <p>{item.price} SAR Previously</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/3">
            {" "}
            {/* Order Summary */}
            <div className="mt-4 md:mt-0 p-4 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl w-full ">
              {/* Order Summary Title */}
              <h2 className="text-xl font-semibold dark:text-gray-200">
                Order Summary
              </h2>

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
                          <button className="   bg-[var(--color-primary)] dark:bg-green-700 text-white rounded-r-md">
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
                          <button className="  bg-[var(--color-primary)] dark:bg-green-700 text-white rounded-r-md">
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
                  <p>Subtotal</p>
                  <p>{totalPrice} SAR</p>
                </div>
                <div className="flex justify-between text-red-500 dark:text-red-400">
                  <p>Discount</p>
                  <p>-{totalDiscount} SAR</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>0 SAR</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-bold mt-4 dark:text-gray-200">
                <p>Total</p>
                <p>{totalPrice} SAR</p>
              </div>

              {/* Checkout Button */}
              <div onClick={() => handleBuyNow()}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 hover:bg-[var(--color-primary)] bg-[var(--color-secondary)] text-white py-2 rounded-lg"
                >
                  Buy Now
                </motion.button>
              </div>
              <Image
                className="mt-4 w-full"
                src="/payment_methods.png"
                alt="payment methods banner"
                width={500}
                height={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../redux/store';
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/slices/cartSlice';
// import { message } from 'antd';
// import Image from 'next/image';

// const CartPage: React.FC = () => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch<AppDispatch>();
//   const [isMounted, setIsMounted] = useState(false);
//   const { totalQuantity, totalPrice, totalDiscount } = useSelector((state: RootState) => state.cart);
//   // Ensure component is mounted before rendering cart items (client-side rendering)
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleDelete = (id: string, buyerId: string) => {
//     dispatch(removeFromCart({ id, buyerId }));
//     message.warning('Item removed from cart.');
//   };

//   if (!isMounted) {

//     return <p className='mt-[124px] text-2xl font-bold'>Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center mt-[124px]">
//       <p>Total Products: {totalQuantity}</p>
//       <p>Total Price: ${totalPrice}</p>
//       <p>Total Discount: ${totalDiscount}</p>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.id}>
//             <Image
//               src={item.image}
//               alt={item.name}
//               width={100}
//               height={100}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "/fallback-image.png"; // Fallback in case of broken image
//               }}
//             />
//             <h3>{item.name}</h3>
//             <p>Price: {item.price}</p>
//             <p>Discount: {item.discount}%</p>
//             <p>Quantity: {item.quantity}</p>
//             <button onClick={() => dispatch(decrementQuantity({ id: item.id, buyerId: item.buyerId }))}>-</button>
//             <button onClick={() => dispatch(incrementQuantity({ id: item.id, buyerId: item.buyerId }))}>+</button>
//             <button onClick={() => handleDelete(item.id, item.buyerId)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CartPage;
