// app/checkout/payment-methods/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import CardModal from "@/components/CardModal"; // Update the import path as necessary

const paymentMethods = [
  {
    id: 1,
    label: "Split into 6 payments with Madfu (Max 2000 SAR)",
    imgSrc: "/MadfuLogo-new.png",
    alt: "madfu_gateway icon",
  },
  {
    id: 2,
    label: "Credit/Debit Card Payment",
    imgSrc: "/ic_checkoutcard.png",
    alt: "checkoutcom_card_payment icon",
  },
  {
    id: 3,
    label: "Split in up to 4 payments or Pay in full securely with Tamara",
    imgSrc: "/ic_tamara.png",
    alt: "tamara_pay_by_instalments_4 icon",
  },
  {
    id: 4,
    label: "4 interest-free payments",
    imgSrc: "/ic_tabby.png",
    alt: "tabby_installments icon",
  },
  {
    id: 5,
    label: "Pay With Cash (29 SAR + Shipping Fees)",
    imgSrc: "/ic_cash.png",
    alt: "cashondelivery icon",
  },
  {
    id: 6,
    label: "Split into 3 payments, without fees with Tamara",
    imgSrc: "/ic_tamara.png",
    alt: "tamara_pay_by_instalments icon",
  },
];

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ cardNumber: string; expiryDate: string; cvv: string } | null>(null);
  const [modalConfirmed, setModalConfirmed] = useState(false); // Track if the modal was confirmed

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the modal
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!modalConfirmed) {
          // Uncheck the radio button only if the modal was not confirmed
          setSelectedMethod(null);
        }
        setModalOpen(false);
      }
    },
    [modalConfirmed]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleMethodClick = (id: number) => {
    setSelectedMethod(id);
    if (id === 2) {
      // Open modal if Credit/Debit Card Payment is selected
      setModalOpen(true);
      setModalConfirmed(false); // Reset modal confirmation state when opening modal
    }
  };

  const handleConfirm = (data: { cardNumber: string; expiryDate: string; cvv: string }) => {
    alert(`Selected method ID: ${selectedMethod}\nCard Number: ${data.cardNumber}\nExpiry Date: ${data.expiryDate}\nCVV: ${data.cvv}`);
    // Optionally, send data to a backend or perform other actions here
    setModalData(data);
    setModalConfirmed(true); // Set modal confirmation state
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p className="text-lg text-center font-semibold mb-4 dark:text-white">Choose payment method</p>
      <div className="space-y-1">
        {paymentMethods.map((method) => (
          <motion.div key={method.id} className={`flex items-center gap-1 p-1 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ${selectedMethod === method.id ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-50 dark:bg-gray-600"}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={() => handleMethodClick(method.id)}>
            <input type="radio" name="payment_method" checked={selectedMethod === method.id} onChange={() => handleMethodClick(method.id)} className="mr-4" />
            <div className="flex-1">
              <p className="text-sm dark:text-gray-300">{method.label}</p>
            </div>
            <div className="w-12 h-12 relative">
              <Image src={method.imgSrc} alt={method.alt} layout="fill" objectFit="contain" />
            </div>
          </motion.div>
        ))}
        <motion.div className="flex items-center gap-4 p-1 rounded-lg shadow-md cursor-pointer transition-transform duration-300 bg-gray-50 dark:bg-gray-600" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
          </svg>
          <div className="flex-1">
            <p className="text-sm dark:text-gray-300">Split into 3 payments, without fees with Tamara</p>
          </div>
          <div className="w-12 h-12 relative">
            <Image src="/ic_tamara.png" alt="tamara_pay_by_instalments icon" layout="fill" objectFit="contain" />
          </div>
        </motion.div>
      </div>

      {/* Render the modal */}
      <CardModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} />
    </div>
  );
}
