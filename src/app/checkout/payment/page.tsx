// app/checkout/payment-methods/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import CardModal from "@/components/CardModal"; // Update the import path as necessary
import Cookies from "js-cookie";
import { notification } from "antd";
import { useAuth } from "@/context/UserContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearCartByBuyerId } from "@/redux/slices/cartSlice";
import { setPaymentSelected } from "@/redux/slices/paymentSlice";
const paymentMethods = [
  {
    id: 1,
    label: "Split into 6 payments with Madfu (Max 2000 SAR)",
    imgSrc: "/madufu.png",
    alt: "madfu_gateway icon",
  },
  {
    id: 2,
    label: "Credit/Debit Card Payment",
    imgSrc: "/credit.png",
    alt: "checkoutcom_card_payment icon",
  },
  {
    id: 3,
    label: "Split in up to 4 payments or Pay in full securely with Tamara",
    imgSrc: "/tamara.png",
    alt: "tamara_pay_by_instalments_4 icon",
  },
  {
    id: 4,
    label: "4 interest-free payments",
    imgSrc: "/tabby.png",
    alt: "tabby_installments icon",
  },
  {
    id: 5,
    label: "Pay With Cash (29 SAR + Shipping Fees)",
    imgSrc: "/cash.png",
    alt: "cashondelivery icon",
  },
  {
    id: 6,
    label: "Split into 3 payments, without fees with Tamara",
    imgSrc: "/tamara.png",
    alt: "tamara_pay_by_instalments icon",
  },
];

export default function PaymentMethods() {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const [modalConfirmed, setModalConfirmed] = useState(false); // Track if the modal was confirmed
  const [modalData, setModalData] = useState<{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  } | null>(null);
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { totalQuantity, totalPrice, totalDiscount } = useSelector(
    (state: RootState) => state.cart
  );
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems);
  const token = Cookies.get("token");
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  );
  const searchParams = useSearchParams();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the address query parameter and decode it
    const queryAddress = searchParams.get("address");
    if (queryAddress) {
      const decodedAddress = decodeURIComponent(queryAddress);
      setAddress(decodedAddress); // Set the decoded address in the state
    }
  }, [searchParams]);

  const createOrderList = () => {
    const cart = filteredCartItems?.map((item) => ({
      productId: item.id, // Replace with your product ID property
      quantity: item.quantity, // Adjust based on your item structure
      unitPrice: item.unitPrice,
    }));

    const orderList = {
      orderedBy: user._id,
      cart: cart,
      totalAmount: totalQuantity, // Implement a function to calculate total amount
    };

    console.log(JSON.stringify(orderList, null, 4)); // Log the order list in formatted JSON
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/checkout/login"); // Redirect to login if no token
    } else if (user && !user?.savedAddress) {
      router.push("/checkout/address"); // Redirect to address if no address
      const userCartItems = cartItems.filter(
        (item) => item.buyerId === user?._id
      );
      setFilteredCartItems(userCartItems);
    }
  }, [user, router, cartItems]);

  useEffect(() => {
    // Filter cart items based on buyerId (either user._id or 'guest')
    if (token && user) {
      // If user is logged in, filter by user's ID
      const userCartItems = cartItems.filter(
        (item) => item.buyerId === user?._id
      );
      setFilteredCartItems(userCartItems);
    }
  }, [cartItems, user, token]);
  // Handle clicks outside the modal
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (!modalConfirmed && selectedMethod === 2) {
          // Uncheck the radio button only if the modal was not confirmed for Credit/Debit Card Payment
          setSelectedMethod(null);
        }
        setModalOpen(false);
      }
    },
    [modalConfirmed, selectedMethod]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleMethodClick = (id: number) => {
    if (pathname === "/checkout/payment" && (selectedAddress || address)) {
      dispatch(setPaymentSelected(true));
    } else {
      dispatch(setPaymentSelected(false));
    }

    if (id === 2) {
      setModalOpen(true); // Open modal for Credit/Debit Card Payment
      setModalConfirmed(false); // Reset confirmation state when modal opens
    } else {
      setSelectedMethod(id); // Select method for non-modal payment methods
    }
  };

  const handleConfirm = (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => {
    // Handle form confirmation for Credit/Debit Card Payment
    alert(
      `Selected method ID: ${selectedMethod}\nCard Number: ${data.cardNumber}\nExpiry Date: ${data.expiryDate}\nCVV: ${data.cvv}`
    );
    setModalData(data);
    setModalConfirmed(true); // Mark modal as confirmed
    setSelectedMethod(2); // Keep the radio button checked for Credit/Debit Card Payment
    setModalOpen(false); // Close modal after confirmation
  };
  const handleCreateOrder = async () => {
    setLoading(true);
    const token = Cookies.get("token"); // Retrieve Bearer token from cookies
    // Example orderedBy ID
    const cart = filteredCartItems?.map((item) => ({
      productId: item.id, // Replace with your product ID property
      quantity: item.quantity, // Adjust based on your item structure
      unitPrice: Math.floor(item.unitPrice), // Convert unitPrice to an integer
    }));
    try {
      const response = await axios.post(
        "https://alsaifgallery.onrender.com/api/v1/order/createOrder",
        {
          orderedBy: user._id,
          cart,
          address: address,
          totalAmount: totalQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to header
            "Content-Type": "application/json", // Set content type
          },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Order Created",
          description: response.data.message || "Order created successfully",
        });
        dispatch(clearCartByBuyerId(user?._id));
        router.push("/account/orders");
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Order Creation Failed",
        description: "Failed to create order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p className="text-lg text-center font-semibold mb-4 dark:text-white">
        Choose payment method
      </p>
       
      <div className="space-y-1">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`flex items-center gap-1 p-1 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ${
              selectedMethod === method.id
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-gray-50 dark:bg-gray-600"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => handleMethodClick(method.id)}
          >
            <input
              type="radio"
              name="payment_method"
              checked={selectedMethod === method.id}
              onChange={() => handleMethodClick(method.id)}
              className="mr-4"
            />
            <div className="flex-1">
              <p className="text-sm dark:text-gray-300">{method.label}</p>
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src={method.imgSrc}
                alt={method.alt}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Render the modal */}
      <CardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
