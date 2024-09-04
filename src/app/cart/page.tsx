"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CartComponent = () => {
  const [cartEmpty, setCartEmpty] = useState(true); // Assuming cart state
  const cartRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={cartRef} id="cart_component_container" className="flex justify-center mt-[124px] items-center p-4">
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
                  <motion.button whileTap={{ scale: 0.95 }} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Start Shopping
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartComponent;
